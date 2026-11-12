import { useState, useEffect } from "react";
import { useSubTab } from "../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import PartMarriage from "./components/PartMarriage.jsx";

const partMarriageTabs = [
  { id: "part-marriage", label: "Part Marriage", icon: "BarChart3" },
];

const componentMap = {
  "part-marriage": PartMarriage,
};

export default function PartMarriagePage() {
  const [activeTab, setActiveTab] = useState("part-marriage");
  const { setCurrentSubTab } = useSubTab();

  const coreTabs = ["part-marriage", "live-part-marriage"];

  useEffect(() => {
    const label = partMarriageTabs.find((t) => t.id === activeTab)?.label;
    setCurrentSubTab(label);
    return () => setCurrentSubTab(null);
  }, [activeTab, setCurrentSubTab]);

  const ActiveComponent = componentMap[activeTab];

  return (
    <div>
      <TabNavigation
        tabs={partMarriageTabs}
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
