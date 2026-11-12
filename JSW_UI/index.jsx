import { useState, useEffect } from "react";
import { useSubTab } from "../../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import RobotHealth from "./components/RobotHealth.jsx";
import RobotStatus from "./components/RobotStatus.jsx";
import RobotSpotNOK from "./components/RobotSpotHitRateReport.jsx";

const robotMonitoringTabs = [
  { id: "health", label: "Robot Health", icon: "Heart" },
  { id: "status", label: "Robot Status", icon: "Activity" },
  { id: "spot-nok", label: "Robot Spot Hit Rate Report", icon: "AlertCircle" },
];

export default function RobotMonitoring() {
  const [activeTab, setActiveTab] = useState("health");
  const { setCurrentSubTab } = useSubTab();

  useEffect(() => {
    const label = robotMonitoringTabs.find((t) => t.id === activeTab)?.label;
    setCurrentSubTab(label);
    return () => setCurrentSubTab(null);
  }, [activeTab, setCurrentSubTab]);

  return (
    <div>
      <TabNavigation
        tabs={robotMonitoringTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="animate-fadeIn">
        {activeTab === "health" && <RobotHealth />}
        {activeTab === "status" && <RobotStatus />}
        {activeTab === "spot-nok" && <RobotSpotNOK />}
      </div>
    </div>
  );
}
