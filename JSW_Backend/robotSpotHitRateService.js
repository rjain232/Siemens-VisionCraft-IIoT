const { executeStoredProcedure, sql } = require("../utils/dbUtils");

const getSpotHitRate = async ({
  lineId,
  stationId,
  robotId,
  startDate,
  endDate,
  shift,
}) => {
  try {
    const result = await executeStoredProcedure("dbo.app_Robot_SpotHitRate", {
      LineId: { type: sql.Int, value: lineId ? parseInt(lineId, 10) : null },
      StationId: {
        type: sql.Int,
        value: stationId ? parseInt(stationId, 10) : null,
      },
      RobotId: { type: sql.Int, value: robotId ? parseInt(robotId, 10) : null },
      StartDate: { type: sql.Date, value: startDate || null },
      EndDate: { type: sql.Date, value: endDate || null },
    });

    let records = result.recordset || [];

    if (shift && shift !== "All") {
      const selectedShifts = shift
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);
      if (selectedShifts.length > 0 && selectedShifts.length < 3) {
        records = records.filter((r) => {
          const itemShift = r.Shift || r.shift;
          if (itemShift) {
            return selectedShifts.includes(String(itemShift).trim().toUpperCase());
          }
          if (r.Timestamp) {
            const d = new Date(r.Timestamp);
            if (!isNaN(d.getTime())) {
              const h = d.getUTCHours() + d.getUTCMinutes() / 60;
              const computed = h >= 6.5 && h < 15 ? "A" : h >= 15 && h < 23.5 ? "B" : "C";
              return selectedShifts.includes(computed);
            }
          }
          return selectedShifts.includes("A");
        });
      }
    }

    return records;
  } catch (error) {
    console.error("Robot SpotHitRate Service Error:", error);
    throw error;
  }
};

module.exports = { getSpotHitRate };
