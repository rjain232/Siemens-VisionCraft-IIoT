require("dotenv").config();

const http = require("http");
const { WebSocketServer } = require("ws");
const app = require("./app");
const appConfig = require("./config/appConfig");
const { connectDB } = require("./config/db");
const { initializeAuth } = require("./services/authService");
const { initializeAccessConfiguration } = require("./services/accessService");
const dashboardService = require("./services/dashboardService");
const productionOeeTransformer = require("./utils/productionOeeTransformer");
const { getRobotHealth } = require("./services/robotHealthService");
const { ensureSubscriptionTable } = require("./services/subscriptionService");
const tiaPlcService = require("./services/tiaPortalPlcService");

const DASHBOARD_PUSH_INTERVAL = 15_000;
const ROBOT_HEALTH_PUSH_INTERVAL = 15_000;
const WS_PING_INTERVAL = 25_000;

async function fetchDashboardPayload(range = "today") {
  const [productionOeeData, jphDetails] = await Promise.all([
    dashboardService.getProductionOeeData({ range }),
    dashboardService.getJPHDetails({ range }),
  ]);
  const transformed = productionOeeTransformer.transformOeeResponse({
    productionOeeData,
    jphDetails,
  });
  if (!transformed) return null;
  return { range, ...transformed };
}

const start = async () => {
  await connectDB();
  await initializeAuth();
  await initializeAccessConfiguration();
  await ensureSubscriptionTable();

  const server = http.createServer(app);
  server.timeout = 300000; // 5 minutes
  server.keepAliveTimeout = 65000;

  // ── WebSocket servers (noServer to avoid upgrade conflicts) ──────────────────
  const wss = new WebSocketServer({ noServer: true });
  const wssRobotHealth = new WebSocketServer({ noServer: true });
  const wssPlc = new WebSocketServer({ noServer: true });

  server.on("upgrade", (req, socket, head) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    if (pathname === "/ws/dashboard") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    } else if (pathname === "/ws/plc") {
      wssPlc.handleUpgrade(req, socket, head, (ws) => {
        wssPlc.emit("connection", ws, req);
      });
    } else if (pathname === "/ws/robot-health") {
      wssRobotHealth.handleUpgrade(req, socket, head, (ws) => {
        wssRobotHealth.emit("connection", ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("error", (err) => {
    console.error("[WS dashboard] server error:", err.message);
  });

  wss.on("connection", (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const range = url.searchParams.get("range") || "today";

    let timer = null;
    let isAlive = true;
    ws.on("pong", () => {
      isAlive = true;
    });

    const heartbeat = setInterval(() => {
      if (!isAlive) {
        console.warn("[WS dashboard] client unresponsive, terminating");
        ws.terminate();
        return;
      }
      isAlive = false;
      ws.ping();
    }, WS_PING_INTERVAL);

    async function push() {
      if (ws.readyState !== ws.OPEN) return;
      try {
        const payload = await fetchDashboardPayload(range);
        if (payload && ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify(payload));
        }
      } catch (err) {
        console.error("[WS dashboard] push error:", err.message);
        if (ws.readyState === ws.OPEN) {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Failed to fetch dashboard data",
            }),
          );
        }
      }
    }

    push();

    if (range === "today") {
      timer = setInterval(push, DASHBOARD_PUSH_INTERVAL);
    }

    function clearTimers() {
      if (timer) clearInterval(timer);
      clearInterval(heartbeat);
    }

    ws.on("close", () => {
      clearTimers();
    });

    ws.on("error", (err) => {
      console.error("[WS dashboard] client error:", err.message);
      clearTimers();
    });
  });

  // ── Robot Health WebSocket ───────────────────────────────────────────────────
  wssRobotHealth.on("error", (err) => {
    console.error("[WS robot-health] server error:", err.message);
  });

  // ── WebSocket: Live TIA Portal PLC Tag Stream ──
  wssPlc.on("connection", (ws) => {
    // Send immediate snapshot
    tiaPlcService.readAllTags().then((tags) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "initial", tags, status: tiaPlcService.getPlcStatus() }));
      }
    });

    const onUpdate = (tags) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "update", tags, status: tiaPlcService.getPlcStatus() }));
      }
    };

    tiaPlcService.on("tagsUpdated", onUpdate);

    ws.on("close", () => {
      tiaPlcService.off("tagsUpdated", onUpdate);
    });

    ws.on("message", async (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        if (data.action === "write" && data.tagName) {
          const res = await tiaPlcService.writeTag(data.tagName, data.value);
          ws.send(JSON.stringify({ type: "writeAck", result: res }));
        }
      } catch (e) {
        ws.send(JSON.stringify({ type: "error", message: e.message }));
      }
    });
  });

  // Start background PLC connection
  tiaPlcService.connect().catch((e) => console.warn("[PLC Background Connect]:", e.message));

  wssRobotHealth.on("connection", (ws) => {
    let timer = null;
    let isAlive = true;
    ws.on("pong", () => {
      isAlive = true;
    });

    const heartbeat = setInterval(() => {
      if (!isAlive) {
        console.warn("[WS robot-health] client unresponsive, terminating");
        ws.terminate();
        return;
      }
      isAlive = false;
      ws.ping();
    }, WS_PING_INTERVAL);

    async function push() {
      if (ws.readyState !== ws.OPEN) return;
      try {
        const data = await getRobotHealth({ stationId: null, robotId: null });
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ data }));
        }
      } catch (err) {
        console.error("[WS robot-health] push error:", err.message);
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ type: "error", message: "Failed to fetch robot health data" }));
        }
      }
    }

    push();
    timer = setInterval(push, ROBOT_HEALTH_PUSH_INTERVAL);

    function clearTimers() {
      if (timer) clearInterval(timer);
      clearInterval(heartbeat);
    }

    ws.on("close", () => {
      clearTimers();
    });

    ws.on("error", (err) => {
      console.error("[WS robot-health] client error:", err.message);
      clearTimers();
    });
  });

  server.listen(appConfig.port, () => {
    console.log(`Server running on port ${appConfig.port}`);
    console.log(
      `WebSocket dashboard endpoint: ws://localhost:${appConfig.port}/ws/dashboard`,
    );
    console.log(
      `WebSocket robot-health endpoint: ws://localhost:${appConfig.port}/ws/robot-health`,
    );
  });
};

start();
