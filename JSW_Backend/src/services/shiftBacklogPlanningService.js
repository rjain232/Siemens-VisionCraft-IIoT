const { executeStoredProcedure, sql } = require("../utils/dbUtils");
const { getPool } = require("../config/db");

// Get Shift Backlog Planning (Hour Master list)
const getShiftBacklogPlanning = async () => {
  const result = await executeStoredProcedure("dbo.sp_GetShiftData", {});
  return result.recordset || [];
};

// Update Shift Hour (Start Hour / End Hour)
const updateShiftHour = async ({ hourId, shift, startHour, endHour }) => {
  let shiftVal = shift;
  if (!shiftVal) {
    const pool = getPool();
    const row = await pool
      .request()
      .input("hid", sql.Int, hourId)
      .query("SELECT Shift FROM [dbo].[tbl_Mast_Hour] WHERE HourId = @hid");
    shiftVal = row.recordset?.[0]?.Shift || "A";
  }

  const result = await executeStoredProcedure("dbo.sp_UpdateShiftHour", {
    Shift: { type: sql.VarChar(5), value: shiftVal },
    HourId: { type: sql.Int, value: hourId },
    StartHour: { type: sql.VarChar(8), value: startHour },
    EndHour: { type: sql.VarChar(8), value: endHour },
  });

  return result.recordset?.[0] || null;
};

module.exports = { getShiftBacklogPlanning, updateShiftHour };