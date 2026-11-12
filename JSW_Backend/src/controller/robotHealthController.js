const { getRobotHealth } = require("../services/robotHealthService");

const getRobotHealthStatus = async (req, res, next) => {
  try {
    const { stationId, robotId } = req.query;

    if (
      stationId !== undefined &&
      stationId !== "" &&
      stationId !== "All" &&
      isNaN(parseInt(stationId, 10))
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Invalid stationId "${stationId}". Must be numeric.`,
        });
    }

    const cleanStationId = stationId && stationId !== "All" ? stationId : null;
    const cleanRobotId = robotId && robotId !== "All" ? robotId : null;

    const data = await getRobotHealth({
      stationId: cleanStationId,
      robotId: cleanRobotId,
    });

    return res.json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getRobotHealthStatus };
