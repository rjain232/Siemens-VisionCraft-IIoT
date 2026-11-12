import { useEffect } from "react";
import { useSubTab } from "./../../context/SubTabContext";
import ShareReport from "./../reports/components/ShareReport";

export default function ShareReports() {
  const { setCurrentSubTab } = useSubTab();

  useEffect(() => {
    setCurrentSubTab("Share Report");
    return () => setCurrentSubTab(null);
  }, [setCurrentSubTab]);

  return (
    <div className="animate-fadeIn">
      <ShareReport />
    </div>
  );
}