import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSubTab } from "../../context/SubTabContext";
import TabNavigation from "./components/TabNavigation.jsx";
import WeldData from "./components/WeldData.jsx";
import EnergyConsumption from "./components/EnergyConsumption.jsx";
import SealantCamera from "./components/SealantCameraResult.jsx";
import IndividualStudResult from "./components/IndividualStudResult.jsx";
import NutBoltFasteningReport from "./components/NutBoltFasteningReport.jsx";
import InlineMeasurementSystem from "./components/InlineMeasurementSystem.jsx";
import VINGenerationReport from "./components/VINGenerationReport.jsx";
import MIGWeldingReport from "./components/MIGWeldingReport.jsx";
import StudOkNokOperationChecking from "./components/StudOkNokOperationChecking.jsx";

const thirdPartyDataTabs = [
  { id: "weld-data", label: "Weld Data", icon: "BarChart3" },
  { id: "energy-consumption", label: "Energy Consumption", icon: "Zap" },
  { id: "sealant-camera", label: "Sealant Camera Result", icon: "FileText" },
  {
    id: "stud-result",
    label: "Individual Stud OK and NOK Result",
    icon: "TrendingUp",
  },
  {
    id: "stud-oknok-checking",
    label: "Stud OK/NOK Operation Checking",
    icon: "CheckCircle2",
  },
  {
    id: "fastening-report",
    label: "Nut/Bolt OK/NOK Result",
    icon: "AlertTriangle",
  },
  {
    id: "measurement-system",
    label: "Inline Measurement System",
    icon: "Clock",
  },
  {
    id: "vin-generation",
    label: "VIN No. Generation Report",
    icon: "FileText",
  },
  { id: "mig-welding", label: "MIG Welding Report", icon: "Zap" },
];

const componentMap = {
  "weld-data": WeldData,
  "energy-consumption": EnergyConsumption,
  "sealant-camera": SealantCamera,
  "stud-result": IndividualStudResult,
  "stud-oknok-checking": StudOkNokOperationChecking,
  "fastening-report": NutBoltFasteningReport,
  "measurement-system": InlineMeasurementSystem,
  "vin-generation": VINGenerationReport,
  "mig-welding": MIGWeldingReport,
};

export default function ThirdPartyData() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "weld-data");
  const { setCurrentSubTab } = useSubTab();

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
  }, [location.state]);

  const coreTabs = [
    "weld-data",
    "energy-consumption",
    "sealant-camera",
  ];

  useEffect(() => {
    const label = thirdPartyDataTabs.find((t) => t.id === activeTab)?.label;
    setCurrentSubTab(label);
    return () => setCurrentSubTab(null);
  }, [activeTab, setCurrentSubTab]);

  const ActiveComponent = componentMap[activeTab];

  return (
    <div>
      <TabNavigation
        tabs={thirdPartyDataTabs}
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
