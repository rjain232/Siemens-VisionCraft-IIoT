const ctOeeConfigService = require("../services/ctOeeConfigService");

const getCTOEEConfig = async (req, res, next) => {
  try {
    const { clusterId, lineId } = req.query;

    if (
      clusterId !== undefined &&
      clusterId !== "" &&
      isNaN(parseInt(clusterId, 10))
    ) {
      return res.status(400).json({
        success: false,
        message: `Invalid clusterId "${clusterId}". Must be numeric.`,
      });
    }

    if (lineId !== undefined && lineId !== "" && isNaN(parseInt(lineId, 10))) {
      return res.status(400).json({
        success: false,
        message: `Invalid lineId "${lineId}". Must be numeric.`,
      });
    }

    const data = await ctOeeConfigService.getCTOEEConfig({
      clusterId: clusterId || null,
      lineId: lineId || null,
    });

    return res.json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};


const insertCTOEEConfig = async (req, res, next) => {
  try {
    const {
      clusterId,
      lineId,
      nominalCycleTime,
      jph,
      oeeTarget,
      techEfficiency,
    } = req.body;

  
    if (clusterId === undefined || clusterId === null || clusterId === "") {
      return res
        .status(400)
        .json({ success: false, message: "clusterId is required." });
    }
    if (isNaN(parseInt(clusterId, 10))) {
      return res.status(400).json({
        success: false,
        message: `Invalid clusterId "${clusterId}". Must be numeric.`,
      });
    }
    if (lineId !== undefined && lineId !== "" && isNaN(parseInt(lineId, 10))) {
      return res.status(400).json({
        success: false,
        message: `Invalid lineId "${lineId}". Must be numeric.`,
      });
    }
    if (
      nominalCycleTime !== undefined &&
      nominalCycleTime !== "" &&
      isNaN(parseFloat(nominalCycleTime))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "nominalCycleTime must be numeric." });
    }
    if (jph !== undefined && jph !== "" && isNaN(parseInt(jph, 10))) {
      return res
        .status(400)
        .json({ success: false, message: "jph must be numeric." });
    }
    if (
      oeeTarget !== undefined &&
      oeeTarget !== "" &&
      isNaN(parseFloat(oeeTarget))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "oeeTarget must be numeric." });
    }
    if (
      techEfficiency !== undefined &&
      techEfficiency !== "" &&
      isNaN(parseFloat(techEfficiency))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "techEfficiency must be numeric." });
    }

    const createdBy = req.user?.username || req.user?.name || "System";

    const data = await ctOeeConfigService.insertCTOEEConfig({
      clusterId: parseInt(clusterId, 10),
      lineId: lineId || null,
      nominalCycleTime: nominalCycleTime ?? null,
      jph: jph ?? null,
      oeeTarget: oeeTarget ?? null,
      techEfficiency: techEfficiency ?? null,
      createdBy,
    });

    return res
      .status(201)
      .json({ success: true, message: "CT & OEE configuration created.", data });
  } catch (error) {
    return next(error);
  }
};


const updateCTOEEConfig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nominalCycleTime, jph, oeeTarget, techEfficiency } = req.body;

    // Id is mandatory — app_Update_CTOEEConfig raises "Id is required." when NULL
    if (!id || isNaN(parseInt(id, 10))) {
      return res
        .status(400)
        .json({ success: false, message: "A valid id is required." });
    }
    if (
      nominalCycleTime !== undefined &&
      nominalCycleTime !== "" &&
      isNaN(parseFloat(nominalCycleTime))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "nominalCycleTime must be numeric." });
    }
    if (jph !== undefined && jph !== "" && isNaN(parseInt(jph, 10))) {
      return res
        .status(400)
        .json({ success: false, message: "jph must be numeric." });
    }
    if (
      oeeTarget !== undefined &&
      oeeTarget !== "" &&
      isNaN(parseFloat(oeeTarget))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "oeeTarget must be numeric." });
    }
    if (
      techEfficiency !== undefined &&
      techEfficiency !== "" &&
      isNaN(parseFloat(techEfficiency))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "techEfficiency must be numeric." });
    }

    const existingRows = await ctOeeConfigService.getCTOEEConfig({});
    const existing = existingRows.find(
      (row) => parseInt(row.Id, 10) === parseInt(id, 10),
    );

    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "No config found for the given Id." });
    }

    const updatedBy = req.user?.username || req.user?.name || "System";

    const data = await ctOeeConfigService.updateCTOEEConfig({
      id: parseInt(id, 10),
      nominalCycleTime:
        nominalCycleTime !== undefined && nominalCycleTime !== ""
          ? nominalCycleTime
          : existing.NominalCycleTime,
      jph: jph !== undefined && jph !== "" ? jph : existing.JPH,
      oeeTarget:
        oeeTarget !== undefined && oeeTarget !== ""
          ? oeeTarget
          : existing.OEETarget,
      techEfficiency:
        techEfficiency !== undefined && techEfficiency !== ""
          ? techEfficiency
          : existing.TechEfficiency,
      updatedBy,
    });

    return res.json({
      success: true,
      message: "CT & OEE configuration updated.",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getCTOEEConfig, insertCTOEEConfig, updateCTOEEConfig };
