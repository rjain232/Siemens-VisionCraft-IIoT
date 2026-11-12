import { useState, useEffect } from "react";
import { useSubTab } from "../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import CTOEEConfiguration from "./components/CTOEEConfiguration.jsx";
import ShiftBacklogPlanning from "../production/production-control/components/ShiftBacklogPlanning.jsx";
import WorkingCalendar from "../production/production-control/components/WorkingCalendar.jsx";
import BufferConfig from "../production/production-control/components/BufferConfig.jsx";

const processConfiguratorTabs = [
  { id: "ct-oee", label: "CT & OEE Configuration", icon: "BarChart3" },
  { id: "shift-backlog-planning", label: "Shift Backlog/Planning", icon: "AlertTriangle" },
  { id: "working-calendar", label: "Working Calendar", icon: "Clock" },
  // { id: "buffer-config", label: "Buffer Config", icon: "FileText" },
];

const componentMap = {
  "ct-oee": CTOEEConfiguration,
  "shift-backlog-planning": ShiftBacklogPlanning,
  "working-calendar": WorkingCalendar,
  // "buffer-config": BufferConfig,
};

export default function ProcessConfigurator() {
  const [activeTab, setActiveTab] = useState("ct-oee");
  const { setCurrentSubTab } = useSubTab();

  // const coreTabs = ["ct-oee", "shift-backlog-planning", "working-calendar", "buffer-config"];
   const coreTabs = ["ct-oee", "shift-backlog-planning", "working-calendar"];

  useEffect(() => {
    const label = processConfiguratorTabs.find((t) => t.id === activeTab)?.label;
    setCurrentSubTab(label);
    return () => setCurrentSubTab(null);
  }, [activeTab, setCurrentSubTab]);

  const ActiveComponent = componentMap[activeTab];

  return (
    <div>
      <TabNavigation
        tabs={processConfiguratorTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        coreTabs={coreTabs}
      />
      <div className="animate-fadeIn">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}
