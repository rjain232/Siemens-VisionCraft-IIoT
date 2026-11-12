const express = require("express");
const compress = require("./middleware/compress");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const accessRoutes = require("./routes/access");
const setupRoutes = require("./routes/setup");
const userRoutes = require("./routes/users");
const productionRoutes = require("./routes/production");
const hourlyProductionRoutes = require("./routes/hourlyProduction");
const productionOverviewRoutes = require("./routes/productionOverview");
const masterDataRoutes = require("./routes/masterData");
const appConfig = require("./config/appConfig");
const lineVariantRoutes = require("./routes/lineVariant");
const annualGraphProductionRoutes = require("./routes/annualGraphProduction");
const detailedProductionRoutes = require("./routes/detailedProduction");
const alarmRoutes = require("./routes/alarm");
const cycleTimeRoutes = require("./routes/cycleTime");
const shiftSummaryRoutes = require("./routes/shiftSummary");
const oeeRoutes = require("./routes/oee");
const lineCycleTimeRoutes = require("./routes/lineCycleTime");
const lossesAnalysisRoutes = require("./routes/lossesAnalysis");
const mtbfMttrRoutes = require("./routes/mtbfMttr");
const robotHealthRoutes = require("./routes/robotHealth");
const robotSpotHitRateRoutes = require("./routes/robotSpotHitRate");
const robotStatusRoutes = require("./routes/robotStatus");
const partMarriageRoutes = require("./routes/partMarriage");
const tipChangeCountRoutes = require("./routes/tipChangeCount");
const dashboardRoutes = require("./routes/dashboard");
const lineBufferRoutes = require("./routes/lineBuffer");
const ctOeeConfigRoutes = require("./routes/ctOeeConfig");
const shiftBacklogPlanningRoutes = require("./routes/shiftBacklogPlanning");
const reportShareRoutes = require("./routes/reportShare");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const plcRoutes = require("./routes/plcRoutes");
const opcuaRoutes = require("./routes/opcuaRoutes");
const industrialRoutes = require("./routes/industrialRoutes");
const cloudIotRoutes = require("./routes/cloudIotRoutes");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || appConfig.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(compress); // Brotli (br) + gzip via Node.js built-in zlib
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.send("API is running");
});

app.use("/api/setup", setupRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/access", accessRoutes);
app.use("/api/users", userRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/production", hourlyProductionRoutes);
app.use("/api/production", productionOverviewRoutes);
app.use("/api/production", annualGraphProductionRoutes);
app.use("/api/production", detailedProductionRoutes);
app.use("/api/maintenance", tipChangeCountRoutes);
app.use("/api/alarm", alarmRoutes);
app.use("/api/cycle-time", cycleTimeRoutes);
app.use("/api/production", shiftSummaryRoutes);
app.use("/api/master", masterDataRoutes);
app.use("/api/master", lineVariantRoutes);
app.use("/api/oee", oeeRoutes);
app.use("/api/line-cycle-time", lineCycleTimeRoutes);
app.use("/api/losses-analysis", lossesAnalysisRoutes);
app.use("/api/mtbf-mttr", mtbfMttrRoutes);
app.use("/api/robot-health", robotHealthRoutes);
app.use("/api/robot-spot-hit-rate", robotSpotHitRateRoutes);
app.use("/api/robot-status", robotStatusRoutes);
app.use("/api/part-marriage", partMarriageRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/line-buffer", lineBufferRoutes);
app.use("/api/ct-oee-config", ctOeeConfigRoutes);
app.use("/api/shift-backlog-planning", shiftBacklogPlanningRoutes);
app.use("/api/reports", reportShareRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/plc", plcRoutes);
app.use("/api/opcua", opcuaRoutes);
app.use("/api/industrial", industrialRoutes);
app.use("/api/cloud-iot", cloudIotRoutes);

app.use((err, req, res, next) => {
  console.error("API Error:", err.message);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({ message });
});

module.exports = app;
