const express = require("express");
const { Server } = require("ws");
const http = require("http");
const { client, INFLUX_ORG, INFLUX_BUCKET } = require("../../telemetryUtils");

const app = express();
const server = http.createServer(app);
const wss = new Server({ server, path: "/ws/telemetry" });

console.log("Starting Live Telemetry WebSocket Server...");

const queryLatestTelemetry = () => {
    return new Promise((resolve) => {
        const queryApi = client.getQueryApi(INFLUX_ORG);
        const fluxQuery = `
          from(bucket: "${INFLUX_BUCKET}")
          |> range(start: -15s)
          |> filter(fn: (r) => r._measurement == "robot_telemetry")
          |> last()
        `;
        
        const results = { robotId: "R-01", motorTemp: 0, currentAmps: 0, timestamp: Date.now() };
        
        queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                if (o._field === "motor_temp") results.motorTemp = o._value;
                if (o._field === "current_amps") results.currentAmps = o._value;
                results.robotId = o.robot_id || "R-01";
                results.timestamp = o._time;
            },
            error(err) { console.error("Influx Query Error:", err); resolve(results); },
            complete() { resolve(results); }
        });
    });
};

wss.on("connection", (ws) => {
    console.log("React UI Connected to Telemetry Stream!");
    
    const interval = setInterval(async () => {
        const data = await queryLatestTelemetry();
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(data));
        }
    }, 2000); // Send updates every 2 seconds

    ws.on("close", () => clearInterval(interval));
});

server.listen(5051, () => {
    console.log("Telemetry WebSocket running on ws://localhost:5051/ws/telemetry");
});
