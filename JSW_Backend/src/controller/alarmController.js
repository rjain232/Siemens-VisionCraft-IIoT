const alarmService = require("../services/alarmService");

const VALID_VIEW_TYPES = ["Equipment", "Duration", "Frequency"];
const VALID_TOP_COUNTS = [5, 10, 15, 20];

const getAlarmCategories = async (req, res, next) => {
  try {
    const categories = await alarmService.getAlarmCategories();
    return res.json({ success: true, data: categories });
  } catch (error) {
    return next(error);
  }
};

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 50000;

const normalizeOptionalText = (value) => {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  return trimmed === "" ? null : trimmed;
};

const getAlarmReportData = async (req, res, next) => {
  try {
    const {
      line,
      station,
      equipment,
      shift,
      alarmCategory,
      startDate,
      endDate,
      pageNo,
      pageSize,
    } = req.query;

    const normalizedLine = normalizeOptionalText(line);
    const normalizedStation = normalizeOptionalText(station);
    const normalizedEquipment = normalizeOptionalText(equipment);
    const normalizedAlarmCategory = normalizeOptionalText(alarmCategory);

    if (!normalizedLine) {
      return res
        .status(400)
        .json({ success: false, message: "line is required." });
    }

    if (
      shift !== undefined &&
      shift !== "" &&
      !["A", "B", "C"].includes(shift)
    ) {
      return res.status(400).json({
        success: false,
        message: `Invalid shift "${shift}". Must be A, B, or C.`,
      });
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "startDate must not be after endDate.",
      });
    }

    const pageNumber = Math.max(1, parseInt(pageNo, 10) || 1);
    const parsedPageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE),
    );

    const data = await alarmService.getAlarmReportData({
      line: normalizedLine,
      station: normalizedStation,
      equipment: normalizedEquipment,
      shift: shift || null,
      alarmCategory:
        normalizedAlarmCategory &&
        normalizedAlarmCategory.toLowerCase() === "all"
          ? null
          : normalizedAlarmCategory,
      startDate: startDate || null,
      endDate: endDate || null,
      pageNumber,
      pageSize: parsedPageSize,
    });

    const totalRecords = data.kpiCards?.TotalAlarms ?? 0;
    const totalPages = Math.ceil(totalRecords / parsedPageSize);

    return res.json({
      success: true,
      filters: {
        line: normalizedLine,
        station: normalizedStation,
        equipment: normalizedEquipment,
        shift: shift || "All",
        alarmCategory: normalizedAlarmCategory || "All",
        startDate: startDate || null,
        endDate: endDate || null,
      },
      pagination: {
        page: data.pagination?.pageNumber ?? pageNumber,
        pageSize: data.pagination?.pageSize ?? parsedPageSize,
        totalRecords: data.pagination?.TotalRecords ?? totalRecords,
        totalPages: data.pagination?.TotalPages ?? totalPages,
      },
      kpiCards: data.kpiCards,
      graph: data.graph,
      tableData: data.tableData,
    });
  } catch (error) {
    return next(error);
  }
};

const getTopXAlarmsData = async (req, res, next) => {
  try {
    const {
      areaName,
      lineName,
      stationName,
      equipmentName,
      startDate,
      endDate,
      viewType,
      topCount,
    } = req.query;

    const resolvedViewType = viewType || "Frequency";
    if (!VALID_VIEW_TYPES.includes(resolvedViewType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid viewType "${resolvedViewType}". Must be one of: ${VALID_VIEW_TYPES.join(", ")}.`,
      });
    }

    const parsedTopCount = parseInt(topCount, 10) || 10;
    if (!VALID_TOP_COUNTS.includes(parsedTopCount)) {
      return res.status(400).json({
        success: false,
        message: `Invalid topCount "${topCount}". Must be one of: ${VALID_TOP_COUNTS.join(", ")}.`,
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required.",
      });
    }

    // Validate date range
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "startDate must not be after endDate.",
      });
    }

    const data = await alarmService.getTopXAlarmsData({
      areaName: areaName || null,
      lineName: lineName || null,
      stationName: stationName || null,
      equipmentName: equipmentName || null,
      startDate: startDate || null,
      endDate: endDate || null,
      viewType: resolvedViewType,
      topCount: parsedTopCount,
    });

    return res.json({
      success: true,
      filters: {
        areaName,
        lineName,
        stationName,
        equipmentName,
        startDate,
        endDate,
        viewType,
        topCount,
      },
      summary: data.summary,
      data: data.data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAlarmReportData, getAlarmCategories, getTopXAlarmsData };
