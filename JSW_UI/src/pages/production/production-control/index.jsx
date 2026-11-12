import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSubTab } from "../../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import ProductionOverview from "./components/ProductionOverview.jsx";
import HourlyProductionReport from "./components/HourlyProductionReport.jsx";
import StationCycleTime from "./components/StationCycleTime.jsx";
import ShiftSummaryReport from "./components/ShiftSummaryReport.jsx";
import BufferTrend from "./components/BufferTrend.jsx";
import AnnualGraph from "./components/AnnualGraph.jsx";
import LineCycleTime from "./components/LineCycleTime.jsx";
import MTBFMTTR from "./components/MTBFMTTR.jsx";
import Bottleneck from "./components/Bottleneck.jsx";
import DetailedProductionCountReport from "./components/DetailedProductionCountReport.jsx";

const productionControlTabs = [
  {
    id: "production-overview",
    label: "Production Overview",
    icon: "BarChart3",
  },
  {
    id: "hourly-production-report",
    label: "Hourly Production Report",
    icon: "Clock",
  },
  { id: "buffer-trend", label: "Buffer Trend", icon: "TrendingUp" },
  {
    id: "shift-summary-report",
    label: "Shift Summary Report",
    icon: "FileText",
  },
  {
    id: "production-count",
    label: "Detailed Production Count Report ",
    icon: "TrendingUp",
  },
  { id: "cycle-time-losses", label: "Station Cycle Time", icon: "Zap" },
  { id: "annual-graph", label: "Annual Graph", icon: "TrendingUp" },
  { id: "line-cycle-time", label: "Line Cycle Time", icon: "Zap" },
  { id: "mtbf-mttr", label: "MTBF/MTTR", icon: "AlertTriangle" },
  { id: "bottleneck", label: "Bottleneck", icon: "AlertTriangle" },
];

const coreTabs = [
  "production-overview",
  "hourly-production-report",
  "buffer-trend",
  "cycle-time-losses",
];

const componentMap = {
  "production-overview": ProductionOverview,
  "hourly-production-report": HourlyProductionReport,
  "production-count": DetailedProductionCountReport,
  "cycle-time-losses": StationCycleTime,
  "shift-summary-report": ShiftSummaryReport,
  "buffer-trend": BufferTrend,
  "annual-graph": AnnualGraph,
  "line-cycle-time": LineCycleTime,
  "mtbf-mttr": MTBFMTTR,
  "bottleneck": Bottleneck,
};

export default function ProductionControl() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "production-overview",
  );
  const { setCurrentSubTab } = useSubTab();

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
  }, [location.state]);

  const activeLabel =
    productionControlTabs.find((tab) => tab.id === activeTab)?.label ??
    "Production Control";

  useEffect(() => {
    setCurrentSubTab(activeLabel);
    return () => setCurrentSubTab(null);
  }, [activeLabel, setCurrentSubTab]);

  const ActiveComponent = componentMap[activeTab];

  return (
    <div>
      <TabNavigation
        tabs={productionControlTabs}
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
