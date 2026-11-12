import { useState } from "react";
import { ArrowRight, Search, Check, X, Wrench, ClipboardList } from "lucide-react";
import FilterBar from "../../../sharedComponents/FilterBar";
import { SearchPromptState } from "../../../sharedComponents/EmptyState";

const BRAND = "rgb(22, 70, 161)";

// ── Mock data ──
const INITIAL_STATIONS = [
  { id: "st-01", label: "Station 01", biwNo: "BiwNo-1001", variant: "Variant-101", bsnNo: "BSNNo-1237687" },
  { id: "st-02", label: "Station 02", biwNo: "BiwNo-1002", variant: "Variant-101", bsnNo: "BSNNo-1237688" },
  { id: "st-03", label: "Station 03", biwNo: "BiwNo-1003", variant: "Variant-101", bsnNo: "BSNNo-1237689" },
];

const CLUSTER_OPTIONS = ["Cluster 01", "Cluster 02", "Cluster 03"];
const LINE_OPTIONS = ["FE", "MB2"];

const filterConfig = [
  {
    key: "cluster",
    type: "select",
    label: "Cluster",
    options: CLUSTER_OPTIONS.map((c) => ({ label: c, value: c })),
  },
  {
    key: "line",
    type: "select",
    label: "Line",
    options: LINE_OPTIONS.map((l) => ({ label: l, value: l })),
  },
];

function StatusToggle({ result, onResult, rework, onRework }) {
  const baseBtn =
    "flex items-center justify-center gap-1.5 h-[32px] rounded-md text-xs font-semibold border transition-all";

  return (
    <div className="px-4 pb-4 flex flex-col gap-2">
      <button
        onClick={() => onRework(!rework)}
        className={`${baseBtn} w-full ${
          rework
            ? "bg-blue-50 border-blue-300 text-blue-700"
            : "bg-white border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-600"
        }`}
      >
        <Wrench size={13} />
        Rework
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onResult(result === "OK" ? null : "OK")}
          className={`${baseBtn} flex-1 ${
            result === "OK"
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "bg-white border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600"
          }`}
        >
          <Check size={13} strokeWidth={2.5} />
          OK
        </button>
        <button
          onClick={() => onResult(result === "NOK" ? null : "NOK")}
          className={`${baseBtn} flex-1 ${
            result === "NOK"
              ? "bg-red-50 border-red-300 text-red-700"
              : "bg-white border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-600"
          }`}
        >
          <X size={13} strokeWidth={2.5} />
          NOK
        </button>
      </div>
    </div>
  );
}

function StationCard({ station, result, onResult, rework, onRework }) {
  const statusColor =
    result === "OK" ? "border-t-emerald-400" : result === "NOK" ? "border-t-red-400" : "border-t-gray-200";

  return (
    <div className="flex flex-col items-center shrink-0">
      <div
        className={`bg-white border border-gray-200 border-t-2 ${statusColor} rounded-xl shadow-sm hover:shadow-md transition-shadow w-60 overflow-hidden`}
      >
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {station.label}
            </span>
            {result && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  result === "OK" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}
              >
                {result}
              </span>
            )}
          </div>
          <p className="text-[15px] font-bold leading-snug" style={{ color: BRAND }}>
            {station.biwNo}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{station.variant}</p>
          <p className="text-xs text-gray-400">{station.bsnNo}</p>
        </div>

        <StatusToggle
          result={result}
          onResult={onResult}
          rework={rework}
          onRework={onRework}
        />
      </div>
    </div>
  );
}

export default function StudOkNokOperationChecking() {
  const [filters, setFilters] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [stations] = useState(INITIAL_STATIONS);
  const [results, setResults] = useState({});
  const [rework, setRework] = useState({});

  const handleSearch = () => setHasSearched(true);

  const okCount = Object.values(results).filter((r) => r === "OK").length;
  const nokCount = Object.values(results).filter((r) => r === "NOK").length;
  const reworkCount = Object.values(rework).filter(Boolean).length;

  return (
    <div className="max-w-full overflow-hidden px-2 sm:px-4 py-6 bg-gray-50 min-h-full">
      {/* Filter bar */}
      <div
        className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4 flex flex-wrap items-center justify-between gap-4"
        style={{ overflow: "visible", position: "relative" }}
      >
        <FilterBar
          config={filterConfig}
          filters={filters}
          onChange={setFilters}
          withContainer={false}
        />

        <button
          onClick={handleSearch}
          className="flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-[7px] rounded-md transition-colors shadow-sm shrink-0"
          style={{ backgroundColor: BRAND }}
        >
          <Search size={13} /> Search
        </button>
      </div>

      {/* States */}
    {!hasSearched ? (
        <SearchPromptState pageName="Stud OK/NOK Operation Checking" />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-wrap items-center gap-6 px-6 py-3 border-b border-gray-100 bg-gray-50/60">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Summary
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              OK <span className="text-emerald-600">{okCount}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              NOK <span className="text-red-600">{nokCount}</span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND }} />
              Rework <span style={{ color: BRAND }}>{reworkCount}</span>
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {stations.length} station{stations.length !== 1 ? "s" : ""} total
            </span>
          </div>

          <div className="p-6 overflow-x-auto">
            <div className="flex items-center gap-0 min-w-max">
              {stations.map((station, idx) => (
                <div key={station.id} className="flex items-center">
                  <StationCard
                    station={station}
                    result={results[station.id] || null}
                    onResult={(val) =>
                      setResults((prev) => ({ ...prev, [station.id]: val }))
                    }
                    rework={!!rework[station.id]}
                    onRework={(val) =>
                      setRework((prev) => ({ ...prev, [station.id]: val }))
                    }
                  />
                  {idx < stations.length - 1 && (
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-200 mx-3 shrink-0">
                      <ArrowRight size={15} className="text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}