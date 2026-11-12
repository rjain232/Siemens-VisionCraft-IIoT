const subscriptionService = require("../services/subscriptionService");

exports.getSubscriptions = async (req, res) => {
  try {
    const list = await subscriptionService.getAllSubscriptions();
    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { recipientName, email, reports, reportFilters, cadence, formats, isActive } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }
    if (!reports || (Array.isArray(reports) && reports.length === 0)) {
      return res.status(400).json({ success: false, message: "At least one report must be selected." });
    }

    const created = await subscriptionService.createSubscription({
      recipientName,
      email,
      reports,
      reportFilters: reportFilters || {},
      cadence: cadence || "Daily",
      formats: formats || "Both",
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully.",
      data: created,
    });
  } catch (err) {
    console.error("Error creating subscription:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await subscriptionService.updateSubscription(parseInt(id, 10), req.body);
    return res.status(200).json({
      success: true,
      message: "Subscription updated successfully.",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating subscription:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    await subscriptionService.deleteSubscription(parseInt(id, 10));
    return res.status(200).json({ success: true, message: "Subscription removed successfully." });
  } catch (err) {
    console.error("Error deleting subscription:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.dispatchSubscriptionNow = async (req, res) => {
  return res.status(400).json({
    success: false,
    message:
      "Server-side synthetic dispatch is disabled. Please trigger subscription dispatches via the UI Report Subscription Manager to ensure 100% authentic formatted reports.",
  });
};

exports.dispatchCadenceNow = async (req, res) => {
  return res.status(400).json({
    success: false,
    message:
      "Server-side synthetic cadence dispatch is disabled. Please use the UI Share Report interface.",
  });
};

exports.recordDispatchSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    await subscriptionService.recordDispatchSuccess(parseInt(id, 10));
    return res.status(200).json({ success: true, message: "Recorded dispatch success." });
  } catch (err) {
    console.error("Error recording dispatch success:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
