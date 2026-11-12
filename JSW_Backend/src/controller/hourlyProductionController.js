const hourlyProductionService = require("../services/hourlyProductionService");

const getHourlyProductionReport = async (req, res, next) => {
  try {
    const { lineId, clusterId, shift, from, to, pageNumber, pageSize } =
      req.query;

    const data = await hourlyProductionService.getHourlyProductionReport({
      lineId,
      clusterId,
      shift,
      from,
      to,
      pageNumber,
      pageSize,
    });

    return res.json({ data });
  } catch (error) {
    return next(error);
  }
};

const updateHourlyProductionRemark = async (req, res, next) => {
  try {
    const { Id, VariantCode, Remark } = req.body;

    if (!Id) {
      return res.status(400).json({
        success: false,
        message: "Id is required.",
      });
    }

    const result = await hourlyProductionService.updateHourlyProductionRemark(
      Id,
      VariantCode,
      Remark,
    );

    return res.status(200).json({
      success: true,
      ...result[0],
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getHourlyProductionReport, updateHourlyProductionRemark };
