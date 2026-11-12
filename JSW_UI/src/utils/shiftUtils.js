/**
 * shiftUtils.js - JSW Plant Shift Intelligence
 *
 * Official JSW Plant Shift Schedule:
 * - Shift A: 06:00 - 14:00 (Morning)
 * - Shift B: 14:00 - 22:00 (Evening)
 * - Shift C: 22:00 - 06:00 (Night)
 */

export const SHIFT_SCHEDULE = {
  A: { label: "Shift A", window: "06:00 – 14:00", startMinutes: 360, endMinutes: 840 },
  B: { label: "Shift B", window: "14:00 – 22:00", startMinutes: 840, endMinutes: 1320 },
  C: { label: "Shift C", window: "22:00 – 06:00", startMinutes: 1320, endMinutes: 360 },
};

/**
 * Returns the currently active plant shift ("A", "B", or "C") based on system time.
 * @param {Date} [date]
 * @returns {"A" | "B" | "C"}
 */
export const getCurrentShift = (date = new Date()) => {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();
  if (totalMinutes >= 360 && totalMinutes < 840) {
    return "A"; // 06:00 - 14:00
  } else if (totalMinutes >= 840 && totalMinutes < 1320) {
    return "B"; // 14:00 - 22:00
  } else {
    return "C"; // 22:00 - 06:00
  }
};

/**
 * Returns the shift that recently concluded (useful at shift changeovers 06:00, 14:00, 22:00).
 * @param {Date} [date]
 * @returns {"A" | "B" | "C"}
 */
export const getConcludedShift = (date = new Date()) => {
  const hour = date.getHours();
  if (hour >= 14 && hour < 22) return "A";
  if (hour >= 22 || hour < 6) return "B";
  return "C";
};

/**
 * Returns formatted time window string for a given shift.
 * @param {string} shift - "A" | "B" | "C" | "All"
 * @returns {string}
 */
export const getShiftTimeWindow = (shift) => {
  const s = String(shift || "").toUpperCase().trim();
  if (SHIFT_SCHEDULE[s]) {
    return SHIFT_SCHEDULE[s].window;
  }
  return "Full Day (All Shifts)";
};

/**
 * Returns enhanced shift options for dropdowns with live active shift markers.
 * @param {Date} [date]
 * @returns {Array<{value: string, label: string, isCurrent: boolean}>}
 */
export const getShiftOptionsWithActive = (date = new Date()) => {
  const active = getCurrentShift(date);
  return [
    { value: "All", label: "All Shifts", isCurrent: false },
    { value: "A", label: `Shift A (06:00 – 14:00)${active === "A" ? " • Active" : ""}`, isCurrent: active === "A" },
    { value: "B", label: `Shift B (14:00 – 22:00)${active === "B" ? " • Active" : ""}`, isCurrent: active === "B" },
    { value: "C", label: `Shift C (22:00 – 06:00)${active === "C" ? " • Active" : ""}`, isCurrent: active === "C" },
  ];
};
