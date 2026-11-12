const fetch = require("node-fetch"); // Or built-in fetch if Node 18+
const { isSubscriptionDue } = require("./src/components/layout/GlobalCadenceRunner.jsx");

// Wait, GlobalCadenceRunner.jsx is a React component and can't be easily required in pure Node because of JSX.
// I will just copy the isSubscriptionDue function here.

const check = async () => {
  const isSubscriptionDue = (sub) => {
    if (sub.status?.toLowerCase() !== "active" && !sub.isActive) return false;
    if (!sub.cadence) return false;
    if (!sub.lastSentAt) return true;

    const now = new Date();
    const lastSent = new Date(sub.lastSentAt);
    const cadence = sub.cadence.toLowerCase().replace(/\s+/g, "");

    if (cadence === "hourly") {
      return (now.getHours() !== lastSent.getHours()) || (now.getDate() !== lastSent.getDate()) || (now.getMonth() !== lastSent.getMonth());
    }
    return false;
  };

  const resp = await fetch("http://localhost:5000/api/subscriptions");
  const data = await resp.json();
  console.log("Subscriptions:");
  data.data.forEach(sub => {
    console.log(`- ID: ${sub.id}, Cadence: ${sub.cadence}, LastSentAt: ${sub.lastSentAt}, IsDue: ${isSubscriptionDue(sub)}`);
    console.log(`  Parsed LastSentAt: ${new Date(sub.lastSentAt).toString()}`);
  });
};

check();
