const { executeStoredProcedure, sql } = require("../utils/dbUtils");

const toInt = (value, fallback = null) => {
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getHourlyProductionReport = async ({
  lineId,
  clusterId,
  shift,
  from,
  to,
  pageNumber,
  pageSize,
}) => {
  const shiftValue = Array.isArray(shift) ? shift.join(",") : (shift ?? null);

  const result = await executeStoredProcedure(
    "dbo.app_GetHourlyProductionReport",
    {
      ClusterId: { type: sql.Int, value: toInt(clusterId) },
      LineId: { type: sql.Int, value: toInt(lineId) },
      From: { type: sql.Date, value: from ?? null },
      To: { type: sql.Date, value: to ?? null },
      Shifts: { type: sql.VarChar(20), value: shiftValue },
      PageNumber: { type: sql.Int, value: toInt(pageNumber, 1) },
      PageSize: { type: sql.Int, value: toInt(pageSize, 24) },
    },
  );

  const [rows, paginationResult] = result.recordsets;
  const pagination = paginationResult?.[0] ?? {};

  return {
    rows: rows ?? [],
    totalRows: pagination.TotalRows ?? 0,
    totalPages: pagination.TotalPages ?? 0,
    currentPage: pagination.CurrentPage ?? 1,
    pageSize: pagination.PageSize ?? 24,
  };
};

const updateHourlyProductionRemark = async (Id, VariantCode, Remark) => {
  const result = await executeStoredProcedure(
    "dbo.app_UpdateHourlyProductionRemark",
    {
      Id: { type: sql.Int, value: Id },
      VariantCode: { type: sql.VarChar(10), value: VariantCode },
      Remark: { type: sql.NVarChar(sql.MAX), value: Remark },
    },
  );

  return result.recordset;
};

module.exports = { getHourlyProductionReport, updateHourlyProductionRemark };
