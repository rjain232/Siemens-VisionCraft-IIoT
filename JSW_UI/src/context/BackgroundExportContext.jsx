import { createContext, useContext } from "react";

export const BackgroundExportContext = createContext({
  isBackground: false,
  reportKey: "",
  dateRange: null, // { start: "YYYY-MM-DD", end: "YYYY-MM-DD" }
  cadence: null,   // array of cadence strings, e.g. ["shiftwise"]
  filters: null,   // { area, areaId, line, lineId, station, stationId, shifts }
});

export const useBackgroundExport = () => useContext(BackgroundExportContext);
