const { writeTelemetry } = require('./telemetryUtils');
console.log("Testing direct write...");
writeTelemetry("R-01", "BIW-Line", 55.5, 10.1);
