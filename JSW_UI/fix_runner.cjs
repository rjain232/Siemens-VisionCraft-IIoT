const fs = require('fs');
const path = 'c:\\Users\\SDS\\OneDrive - dacpl.in\\Desktop\\JSW\\JSW_UI\\src\\components\\layout\\GlobalCadenceRunner.jsx';

let content = fs.readFileSync(path, 'utf8');

const regex = /\/\/ A helper to determine if a report is due based on LastSentAt and Cadence[\s\S]*?(?=export default function GlobalCadenceRunner)/;

const newBlock = `// A helper to determine if a report is due based on LastSentAt and Cadence
export const isSubscriptionDue = (sub) => {
  if (sub.status?.toLowerCase() !== "active" && !sub.isActive) return false;
  if (!sub.cadence) return false;
  if (!sub.lastSentAt) return true;

  const now = new Date();
  const lastSent = new Date(sub.lastSentAt);
  const cadence = sub.cadence.toLowerCase().replace(/\\s+/g, "");

  if (cadence === "hourly") {
    // Top of the hour check. Did the hour or date change?
    return (now.getHours() !== lastSent.getHours()) || (now.getDate() !== lastSent.getDate()) || (now.getMonth() !== lastSent.getMonth());
  }

  if (cadence === "shiftwise") {
    // Shifts: 06:00, 14:00, 22:00
    const getShiftStart = (d) => {
      const hours = d.getHours();
      const start = new Date(d);
      start.setMinutes(0, 0, 0);
      if (hours >= 6 && hours < 14) start.setHours(6);
      else if (hours >= 14 && hours < 22) start.setHours(14);
      else {
        if (hours < 6) start.setDate(start.getDate() - 1);
        start.setHours(22);
      }
      return start.getTime();
    };
    return getShiftStart(now) > getShiftStart(lastSent);
  }

  if (cadence === "daily") {
    // Daily at 07:00 AM
    const getDailyStart = (d) => {
      const start = new Date(d);
      if (start.getHours() < 7) start.setDate(start.getDate() - 1);
      start.setHours(7, 0, 0, 0);
      return start.getTime();
    };
    return getDailyStart(now) > getDailyStart(lastSent);
  }

  if (cadence === "weekly") {
    // Weekly on Monday at 07:00 AM
    const getWeeklyStart = (d) => {
      const start = new Date(d);
      const day = start.getDay() || 7; // 1-7 (Mon-Sun)
      if (day === 1 && start.getHours() < 7) {
        start.setDate(start.getDate() - 7); 
      } else {
        start.setDate(start.getDate() - (day - 1));
      }
      start.setHours(7, 0, 0, 0);
      return start.getTime();
    };
    return getWeeklyStart(now) > getWeeklyStart(lastSent);
  }

  if (cadence === "monthly") {
    // Monthly on the 1st at 07:00 AM
    const getMonthlyStart = (d) => {
      const start = new Date(d);
      if (start.getDate() === 1 && start.getHours() < 7) {
        start.setMonth(start.getMonth() - 1);
      }
      start.setDate(1);
      start.setHours(7, 0, 0, 0);
      return start.getTime();
    };
    return getMonthlyStart(now) > getMonthlyStart(lastSent);
  }

  return false;
};

`;

content = content.replace(regex, newBlock);
fs.writeFileSync(path, content, 'utf8');
console.log("Fixed GlobalCadenceRunner.jsx successfully.");
