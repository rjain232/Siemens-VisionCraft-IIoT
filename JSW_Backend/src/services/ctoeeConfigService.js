const { executeStoredProcedure, sql } = require("../utils/dbUtils");

//Get CT & OEE Config 
const getCTOEEConfig = async ({ clusterId, lineId }) => {
  const result = await executeStoredProcedure("dbo.app_Get_CTOEEConfig", {
    ClusterId: {
      type: sql.Int,
      value:
        clusterId != null && clusterId !== "" ? parseInt(clusterId, 10) : null,
    },
    LineId: {
      type: sql.Int,
      value: lineId != null && lineId !== "" ? parseInt(lineId, 10) : null,
    },
  });

  return result.recordset || [];
};

//  Insert CT & OEE Config 
const insertCTOEEConfig = async ({
  clusterId,
  lineId,
  nominalCycleTime,
  jph,
  oeeTarget,
  techEfficiency,
  createdBy,
}) => {
  const result = await executeStoredProcedure("dbo.app_Insert_CTOEEConfig", {
    ClusterId: { type: sql.Int, value: clusterId },
    LineId: {
      type: sql.Int,
      value: lineId != null && lineId !== "" ? parseInt(lineId, 10) : null,
    },
    NominalCycleTime: {
      type: sql.Decimal(10, 2),
      value: nominalCycleTime != null && nominalCycleTime !== "" ? nominalCycleTime : null,
    },
    JPH: { type: sql.Int, value: jph != null && jph !== "" ? jph : null },
    OEETarget: {
      type: sql.Decimal(5, 2),
      value: oeeTarget != null && oeeTarget !== "" ? oeeTarget : null,
    },
    TechEfficiency: {
      type: sql.Decimal(5, 2),
      value: techEfficiency != null && techEfficiency !== "" ? techEfficiency : null,
    },
    CreatedBy: { type: sql.NVarChar(100), value: createdBy },
  });

  
  return result.recordset?.[0] || null;
};

// Update CT & OEE Config 
const updateCTOEEConfig = async ({
  id,
  nominalCycleTime,
  jph,
  oeeTarget,
  techEfficiency,
  updatedBy,
}) => {
  const result = await executeStoredProcedure("dbo.app_Update_CTOEEConfig", {
    Id: { type: sql.Int, value: id },
    NominalCycleTime: {
      type: sql.Decimal(10, 2),
      value: nominalCycleTime != null && nominalCycleTime !== "" ? nominalCycleTime : null,
    },
    JPH: { type: sql.Int, value: jph != null && jph !== "" ? jph : null },
    OEETarget: {
      type: sql.Decimal(5, 2),
      value: oeeTarget != null && oeeTarget !== "" ? oeeTarget : null,
    },
    TechEfficiency: {
      type: sql.Decimal(5, 2),
      value: techEfficiency != null && techEfficiency !== "" ? techEfficiency : null,
    },
    UpdatedBy: { type: sql.NVarChar(100), value: updatedBy },
  });

  return result.recordset?.[0] || null;
};

module.exports = { getCTOEEConfig, insertCTOEEConfig, updateCTOEEConfig };