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

  const resp = await fetch("http://localhost:5050/api/subscriptions");
  const data = await resp.json();
  console.log("Subscriptions:");
  data.data.forEach(sub => {
    console.log(`- ID: ${sub.id}, Cadence: ${sub.cadence}, LastSentAt: ${sub.lastSentAt}, IsDue: ${isSubscriptionDue(sub)}`);
    console.log(`  Parsed LastSentAt: ${new Date(sub.lastSentAt).toString()}`);
    console.log(`  Current Hour: ${new Date().getHours()}, LastSent Hour: ${new Date(sub.lastSentAt).getHours()}`);
  });
};

check();
