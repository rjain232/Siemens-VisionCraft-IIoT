import { useState, useEffect } from "react";
import { useSubTab } from "../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import Compliance from "./components/Compliance.jsx";
import TDMTools from "./components/TDMTools.jsx";
import AlarmReport from "./components/AlarmReport.jsx";
import TopXAlarms from "./components/TopXAlarms.jsx";
import TipChangeCount from "./components/TipChangeCount.jsx";
import LineStationLossesAnalysis from "./components/LineStationLossesAnalysis.jsx";
import WalkingReport from "./components/WalkingReport.jsx";
import { useLocation } from "react-router-dom";

const maintenanceTabs = [
  { id: "compliance", label: "Compliance", icon: "FileText" },
  { id: "tdm-tools", label: "TDM Tools", icon: "Zap" },
  { id: "alarm-report", label: "Alarm Report", icon: "AlertTriangle" },
  { id: "top-x-alarms", label: "Top X Alarms", icon: "AlertTriangle" },
  { id: "tip-change-count", label: "Average Tip Change Count", icon: "Clock" },
  { id: "line-station-losses", label: "Line & Station Losses Analysis", icon: "TrendingUp" },
  { id: "walking-report", label: "Walking Report", icon: "Users" },
];

const componentMap = {
  "compliance": Compliance,
  "tdm-tools": TDMTools,
  "alarm-report": AlarmReport,
  "top-x-alarms": TopXAlarms,
  "tip-change-count": TipChangeCount,
  "line-station-losses": LineStationLossesAnalysis,
  "walking-report": WalkingReport,
};

export default function Maintenance() {
  const [activeTab, setActiveTab] = useState("compliance");
  const { setCurrentSubTab } = useSubTab();
  const [topCount, setTopCount] = useState("X");
  const location = useLocation();

   useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const coreTabs = ["compliance", "tdm-tools", "alarm-report", "top-x-alarms"];

  useEffect(() => {
    if (activeTab !== "top-x-alarms") {
      const label = maintenanceTabs.find((t) => t.id === activeTab)?.label;
      setCurrentSubTab(label);
    }
    return () => setCurrentSubTab(null);
  }, [activeTab, setCurrentSubTab]);

  const ActiveComponent = componentMap[activeTab];

  const getDynamicTabs = (count) =>
    maintenanceTabs.map((t) =>
      t.id === "top-x-alarms" ? { ...t, label: `Top ${count} Alarms` } : t
    );

  return (
    <div>
      <TabNavigation
        tabs={getDynamicTabs(topCount)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        coreTabs={coreTabs}
        setActiveTab={setCurrentSubTab}
      />
      <div className="animate-fadeIn">
        {ActiveComponent && (
          activeTab === "top-x-alarms" ? (
            <TopXAlarms
              topCount={topCount}
              setTopCount={setTopCount}
              setActiveTab={setCurrentSubTab}
            />
          ) : (
            <ActiveComponent />
          )
        )}
      </div>
    </div>
  );
}
