import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSubTab } from "../../../context/SubTabContext";
import TabNavigation, { oeeTabs } from "./components/TabNavigation.jsx";
import OverallOEE from "./components/OverallOEE.jsx";
import ProductionSummary from "./components/ProductionSummary.jsx";

export default function OEE() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab === "summary" ? "summary" : "overall",
  );
  const { setCurrentSubTab } = useSubTab();

  useEffect(() => {
    const label = oeeTabs.find((t) => t.id === activeTab)?.label;
    setCurrentSubTab(label);
    return () => setCurrentSubTab(null);
  }, [activeTab, setCurrentSubTab]);

  return (
    <div>
      <TabNavigation
        tabs={oeeTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="animate-fadeIn">
        {activeTab === "overall" && <OverallOEE />}
        {activeTab === "summary" && <ProductionSummary />}
      </div>
    </div>
  );
}
