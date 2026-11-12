import LineMB200HMI from "../LineMB200HMI.jsx";
import SiemensPlantHMI from "../../SiemensPlantHMI.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSubTab } from "../../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import RobotHealth from "./components/RobotHealth.jsx";
import RobotStatus from "./components/RobotStatus.jsx";
import RobotSpotNOK from "./components/RobotSpotHitRateReport.jsx";

const robotMonitoringTabs = [
  { id: "health", label: "Robot Health", icon: "Heart" },
  { id: "status", label: "Robot Status", icon: "Activity" },
  { id: "spot-nok", label: "Robot Spot Hit Rate Report", icon: "AlertCircle" },
  { id: "linemb200", label: "Line MB150/MB200 HMI", icon: "Layers" },
  { id: "siemens-hmi", label: "Siemens Plant HMI (TIA V20)", icon: "Layers" },
];

export default function RobotMonitoring() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "health");
  const { setCurrentSubTab } = useSubTab();

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
  }, [location.state]);

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
        {activeTab === "linemb200" && <LineMB200HMI />}
        {activeTab === "siemens-hmi" && <SiemensPlantHMI />}
      </div>
    </div>
  );
}
