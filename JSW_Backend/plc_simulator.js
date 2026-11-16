const { writeTelemetry } = require('./telemetryUtils');

console.log("Commencing Factory Operations. Streaming live telemetry...");

let motorTemp = 80.0;
let count = 0;

const interval = setInterval(() => {
    motorTemp += (Math.random() * 3.3) - 1.5;
    const currentAmps = 12.0 + (Math.random() * 1.3) - 0.5;

    console.log(`[PLC Simulator] Transmitted: R-01 | Temp: ${motorTemp.toFixed(2)} | Amps: ${currentAmps.toFixed(2)}`);
    writeTelemetry("R-01", "BIW-Line", motorTemp, currentAmps);

    count++;
    if (count >= 10) {
        clearInterval(interval);
        console.log("\nAutomated Factory Shutdown Sequence Initiated.");
    }
}, 1000);
