const emailService = require("../services/emailService");

exports.shareReportsViaEmail = async (req, res) => {
  try {
    const { email, cadence, dateRange, files, filters } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Recipient email address is required.",
      });
    }

    // RFC 5322-compliant email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const rawEmails = Array.isArray(email) ? email : String(email).split(/[,;\s]+/);
    const emailList = rawEmails.map((e) => String(e).trim()).filter(Boolean);

    if (emailList.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid recipient email address provided.",
      });
    }

    const invalidEmails = emailList.filter((e) => !emailRegex.test(e));
    if (invalidEmails.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid email address format: ${invalidEmails.join(", ")}`,
      });
    }

    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one report file must be selected.",
      });
    }

    const normCadence = Array.isArray(cadence) ? cadence : [cadence].filter(Boolean);
    const primaryCadence = normCadence[0] || "Immediate Share";
    const isShiftCadence = normCadence.some((c) => String(c).toLowerCase().includes("shift"));

    const getCurrentShift = () => {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      if (mins >= 360 && mins < 840) return "A";
      if (mins >= 840 && mins < 1320) return "B";
      return "C";
    };

    const getShiftTimeWindow = (s) => {
      switch (String(s || "").toUpperCase()) {
        case "A": return "06:00 – 14:00";
        case "B": return "14:00 – 22:00";
        case "C": return "22:00 – 06:00";
        default: return "Full Day";
      }
    };

    const activeShift = getCurrentShift();
    const effectiveFilters = { ...(filters || {}) };
    if (isShiftCadence && (!effectiveFilters.shift || effectiveFilters.shift === "All")) {
      effectiveFilters.shift = activeShift;
      effectiveFilters.shifts = [activeShift];
    }

    const processedFiles = [];
    const missingReports = [];

    for (const f of files) {
      const repKey = f?.name || f?.key || "Report";
      try {
        // Accept only authentic live UI generated report files with valid base64 payload
        if (f && f.contentBase64 && typeof f.contentBase64 === "string" && f.contentBase64.length >= 100) {
          processedFiles.push(f);
        } else {
          console.warn(`[reportShareController] File ${repKey} missing base64 content from live UI. Synthetic fallback is disabled.`);
          missingReports.push(repKey);
        }
      } catch (err) {
        console.error(`[reportShareController] Error processing file for ${repKey}:`, err.message);
        missingReports.push(repKey);
      }
    }

    if (processedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not generate any of the selected report attachments for dispatch.",
        missingReports,
      });
    }

    const displayCadence = isShiftCadence
      ? normCadence.map((c) =>
          String(c).toLowerCase().includes("shift")
            ? `Shift wise (Shift ${effectiveFilters.shift || activeShift} • ${getShiftTimeWindow(effectiveFilters.shift || activeShift)})`
            : c
        )
      : normCadence;

    const result = await emailService.sendReportEmail({
      to: emailList,
      cadence: displayCadence,
      dateRange,
      files: processedFiles,
      missingReports,
    });

    return res.status(200).json({
      success: true,
      message:
        missingReports.length > 0
          ? `Report email dispatched with ${processedFiles.length} file(s). Notice: ${missingReports.length} report(s) could not be generated.`
          : "Report email dispatched successfully via local SMTP.",
      details: result,
      missingReports,
    });
  } catch (error) {
    console.error("Error sharing report via email:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send email via SMTP.",
    });
  }
};

exports.verifySmtpStatus = async (req, res) => {
  try {
    const status = await emailService.verifyConnection();
    return res.status(status.success ? 200 : 503).json(status);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
