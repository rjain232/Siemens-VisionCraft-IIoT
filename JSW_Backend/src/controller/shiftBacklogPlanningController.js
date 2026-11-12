const shiftBacklogPlanningService = require("../services/shiftBacklogPlanningService");

// HH:MM format check (matches TIME column in tbl_Mast_Hour)
const isValidTime = (val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val);

const getShiftBacklogPlanning = async (req, res, next) => {
  try {
    const data = await shiftBacklogPlanningService.getShiftBacklogPlanning();
    return res.json({ success: true, data });
  } catch (error) {
    return next(error);
  }
};

const updateShiftHour = async (req, res, next) => {
  try {
    const { hourId } = req.params;
    const { startHour, endHour } = req.body;

    if (!hourId || isNaN(parseInt(hourId, 10))) {
      return res
        .status(400)
        .json({ success: false, message: "A valid hourId is required." });
    }
    if (!startHour || !isValidTime(startHour)) {
      return res.status(400).json({
        success: false,
        message: `Invalid startHour "${startHour}". Use HH:MM format.`,
      });
    }
    if (!endHour || !isValidTime(endHour)) {
      return res.status(400).json({
        success: false,
        message: `Invalid endHour "${endHour}". Use HH:MM format.`,
      });
    }

    const data = await shiftBacklogPlanningService.updateShiftHour({
      hourId: parseInt(hourId, 10),
      startHour,
      endHour,
    });

    return res.json({
      success: true,
      message: "Shift hour updated.",
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getShiftBacklogPlanning, updateShiftHour };