const detailedProductionService = require("../services/detailedProductionService");
const { getLineAndVariantData } = require("../services/lineVariantService");

const getDetailedProductionData = async (req, res, next) => {
  try {
    const { areaId, lineId, startDate, endDate, shifts, pageNumber, pageSize } =
      req.query;

    if (areaId !== undefined && areaId !== "" && areaId !== "All" && isNaN(parseInt(areaId, 10))) {
      return res.status(400).json({
        success: false,
        message: `Invalid areaId "${areaId}". Must be numeric.`,
      });
    }

    if (lineId !== undefined && lineId !== "" && lineId !== "All" && isNaN(parseInt(lineId, 10))) {
      return res.status(400).json({
        success: false,
        message: `Invalid lineId "${lineId}". Must be numeric.`,
      });
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "startDate must not be after endDate.",
      });
    }

    const { lines } = await getLineAndVariantData();
    let effectiveAreaId = areaId && areaId !== "All" ? areaId : null;
    let effectiveLineId = lineId && lineId !== "All" ? lineId : null;

    if (!effectiveLineId && lines && lines.length > 0) {
      const fallbackLine = effectiveAreaId
        ? lines.find((l) => String(l.ClusterId) === String(effectiveAreaId)) || lines[0]
        : lines[0];
      if (fallbackLine) {
        effectiveLineId = String(fallbackLine.LineId);
        if (!effectiveAreaId) effectiveAreaId = String(fallbackLine.ClusterId);
      }
    }

    const parsedLineId = effectiveLineId ? parseInt(effectiveLineId, 10) : null;
    const lineName = parsedLineId
      ? lines.find((l) => l.LineId === parsedLineId)?.LineName || null
      : null;

    const data = await detailedProductionService.getDetailedProductionData({
      areaId: effectiveAreaId,
      lineId: effectiveLineId,
      startDate: startDate || null,
      endDate: endDate || null,
      shifts: shifts || null,
      pageNumber: pageNumber || 1,
      pageSize: pageSize || 3,
    });

    return res.json({
      success: true,
      areaId: areaId ? parseInt(areaId, 10) : null,
      lineId: parsedLineId,
      lineName: lineName,
      startDate: startDate || null,
      endDate: endDate || null,
      shifts: shifts || "All",
      productionChart: data.productionChart,
      oee: data.oee,
      tableData: data.tableData,
      pagination: data.pagination,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDetailedProductionData };
