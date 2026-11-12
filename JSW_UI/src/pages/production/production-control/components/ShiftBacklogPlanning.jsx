import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Edit2, Download, X, CheckCircle2, AlertCircle } from "lucide-react";
import FilterBar from "../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import { masterApi, shiftBacklogPlanningApi } from "../../../../services/api";
import { formatClusterName } from "../../../../utils/Formatters";
import { generateExcel } from "../../../../utils/ExcelUtils";
import { NoDataState } from "../../../../sharedComponents/EmptyState";
import { TableShimmer } from "../../../../sharedComponents/Shimmer";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import {
  loadKarlaFont,
  loadBrandingLogos,
  drawPdfPageChrome,
  buildAutoTableConfig,
} from "../../../../utils/PdfUtils";

// Formats a time value coming from SQL TIME columns.
function formatSqlTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}


const SHIFT_BADGE_STYLE = {
  A: { backgroundColor: "#e8ecfa", color: "#2744A0", border: "1px solid #c3cbf0" },
  B: { backgroundColor: "#dbeafe", color: "#3b82f6", border: "1px solid #bfdbfe" },
  C: { backgroundColor: "#d1fae5", color: "#10b981", border: "1px solid #a7f3d0" },
};

// HH:MM validation — matches the TIME columns in tbl_Mast_Hour
function validateTime(val) {
  if (val === "" || val === null || val === undefined) return "Required";
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(val)) return "Use HH:MM format (e.g. 06:30)";
  return null;
}

function Toast({ message, type = "success", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all
        ${type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}
    >
      {type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      {message}
    </div>
  );
}

// EDIT MODAL 
function EditHourModal({ row, onClose, onSave }) {
  const [startHour, setStartHour] = useState(row.startHour);
  const [endHour, setEndHour] = useState(row.endHour);
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const startErr = validateTime(startHour);
    const endErr = validateTime(endHour);
    if (startErr || endErr) {
      setErrors({ startHour: startErr, endHour: endErr });
      return;
    }
    onSave({ ...row, startHour, endHour });
  };

  const inputCls = (key) =>
    `w-full px-3 py-2 border rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 transition-all
    ${errors[key]
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-sky-500 focus:ring-sky-100"}`;

  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
  const readonlyCls = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-400 bg-slate-50 cursor-not-allowed";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-4 sm:p-6 mx-2">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 bg-sky-600 rounded-full" />
            <h3 className="text-base font-bold text-slate-800">
              Edit Hour <span className="text-sky-600">#{row.hourId}</span>
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Read-only reference fields */}
          <div>
            <label className={labelCls}>Hour ID</label>
            <input value={row.hourId} disabled className={readonlyCls} />
          </div>
          <div>
            <label className={labelCls}>Shift</label>
            <input value={row.shift} disabled className={readonlyCls} />
          </div>

          {/* Editable fields */}
          <div>
            <label className={labelCls}>Start Hour</label>
            <input
              type="text"
              placeholder="HH:MM"
              value={startHour}
              onChange={(e) => { setStartHour(e.target.value); setErrors((p) => ({ ...p, startHour: null })); }}
              className={inputCls("startHour")}
            />
            {errors.startHour && <p className="mt-1 text-xs text-red-500">{errors.startHour}</p>}
          </div>
          <div>
            <label className={labelCls}>End Hour</label>
            <input
              type="text"
              placeholder="HH:MM"
              value={endHour}
              onChange={(e) => { setEndHour(e.target.value); setErrors((p) => ({ ...p, endHour: null })); }}
              className={inputCls("endHour")}
            />
            {errors.endHour && <p className="mt-1 text-xs text-red-500">{errors.endHour}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-colors"
            style={{ backgroundColor: "rgb(22,70,161)" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShiftBacklogPlanning({ backgroundMode = false }) {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);

  const [masterData, setMasterData] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);

  useEffect(() => {
    masterApi
      .getMasterData()
      .then((res) => setMasterData(res?.data || []))
      .catch(console.error)
      .finally(() => setMasterLoading(false));
  }, []);

  const [filters, setFilters] = useState({ areaId: "" });

  useEffect(() => {
    if (!masterData.length) return;
    const firstCluster = masterData[0];
    setFilters({ areaId: firstCluster?.ClusterId ?? "" });
  }, [masterData]);

  const areaOptions = useMemo(
    () => masterData.map((c) => ({ value: c.ClusterId, label: formatClusterName(c.ClusterName) })),
    [masterData],
  );

  const filterConfig = useMemo(
    () => [{ type: "select", key: "areaId", label: "Area", options: areaOptions }],
    [areaOptions],
  );

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters({ areaId: newFilters.areaId });
  }, []);

  // Hour Master data
  const [hourData, setHourData] = useState([]);
  const [hourLoading, setHourLoading] = useState(true);

  const loadHourData = useCallback(() => {
    setHourLoading(true);
    shiftBacklogPlanningApi
      .list()
      .then((res) => {
        const rows = (res?.data || []).map((r) => ({
          hourId: r.HourId,
          shift: r.Shift,
          startHour: formatSqlTime(r.StartHour),
          endHour: formatSqlTime(r.EndHour),
        }));
        setHourData(rows);
      })
      .catch(console.error)
      .finally(() => setHourLoading(false));
  }, []);

  useEffect(() => {
    loadHourData();
  }, [loadHourData]);

  const areaLabel = useMemo(() => {
    const c = masterData.find((c) => c.ClusterId === Number(filters.areaId));
    return c ? formatClusterName(c.ClusterName) : "—";
  }, [masterData, filters.areaId]);

  const [downloading, setDownloading] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [toast, setToast] = useState(null);

  const [savingEdit, setSavingEdit] = useState(false);

  const handleSaveEdit = useCallback(async (updatedRow) => {
    setSavingEdit(true);
    try {
      await shiftBacklogPlanningApi.update(updatedRow.hourId, {
        startHour: updatedRow.startHour,
        endHour: updatedRow.endHour,
      });
      setHourData((prev) =>
        prev.map((r) => (r.hourId === updatedRow.hourId ? updatedRow : r)),
      );
      setEditingRow(null);
      setToast({ message: `Hour #${updatedRow.hourId} updated successfully`, type: "success" });
    } catch (err) {
      console.error(err);
      setToast({ message: err.message || "Update failed. Please try again.", type: "error" });
    } finally {
      setSavingEdit(false);
    }
  }, []);

  const getFlatRows = useCallback(
    () => hourData.map((r) => ({
      hourId: r.hourId,
      shift: r.shift,
      startHour: r.startHour,
      endHour: r.endHour,
    })),
    [hourData],
  );

  const PDF_COLUMNS = [
    { key: "hourId", label: "Hour ID" },
    { key: "shift", label: "Shift", type: "shift" },
    { key: "startHour", label: "Start Hour" },
    { key: "endHour", label: "End Hour" },
  ];

  const EXCEL_COLUMNS = [
    { label: "Hour ID", accessor: "hourId" },
    { label: "Shift", accessor: "shift" },
    { label: "Start Hour", accessor: "startHour" },
    { label: "End Hour", accessor: "endHour" },
  ];

  const downloadPDF = useCallback(async (rows) => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
    const HEADER_H = 40;
    const fontFamily = await loadKarlaFont(doc);
    const [jswImg, schaefflerImg] = await loadBrandingLogos();
    const title = "Shift Backlog / Planning";
    const subLines = [`Area: ${areaLabel !== "—" ? areaLabel : "All Areas"}`, `Total Hours: ${rows.length}`];
    function drawChrome(pageNum, totalPages) {
      drawPdfPageChrome(doc, { pageNum, totalPages, fontFamily, title, subLines, jswImg, schaefflerImg });
    }
    autoTable(doc, {
      startY: HEADER_H + 22,
      ...buildAutoTableConfig(PDF_COLUMNS, rows, doc, fontFamily),
      tableWidth: "auto",
      didDrawPage: (hook) => drawChrome(hook.pageNumber, 1),
    });
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) { doc.setPage(p); drawChrome(p, totalPages); }
    doc.save(`Shift_Backlog_Planning_${new Date().toISOString().slice(0, 10)}.pdf`);
  }, [areaLabel]);

  const downloadExcel = useCallback((rows) => {
    generateExcel(EXCEL_COLUMNS, rows, `Shift_Backlog_Planning_${new Date().toISOString().slice(0, 10)}`);
  }, []);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const rows = getFlatRows();
      await Promise.all([downloadPDF(rows), Promise.resolve(downloadExcel(rows))]);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading, getFlatRows, downloadPDF, downloadExcel]);

  const bgDownloadDoneRef = useRef(false);
  useEffect(() => {
    if (!isBg || bgDownloadDoneRef.current || downloading || hourLoading || masterLoading) return;
    bgDownloadDoneRef.current = true;
    const t = setTimeout(() => {
      handleDownload();
    }, 1200);
    return () => clearTimeout(t);
  }, [isBg, downloading, hourLoading, masterLoading, handleDownload]);

  const COLS = [
    { label: "Hour ID", align: "center" },
    { label: "Shift", align: "center" },
    { label: "Start Hour", align: "center" },
    { label: "End Hour", align: "center" },
    { label: "Edit", align: "center" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 px-2 sm:px-4">
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-3 mb-4" style={{ overflow: "visible", position: "relative" }}>
        <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-4">
          <FilterBar
            config={filterConfig}
            filters={filters}
            onChange={handleFiltersChange}
            withContainer={false}
          />
          <DateRangeBar
            showDateInputs={false}
            showSearchButton={false}
            showDownload={true}
            showEmail={true}
            onDownload={handleDownload}
            isDownloading={downloading}
            reportName="Shift_Backlog_Planning"
            withContainer={false}
          />
        </div>
      </div>

      {masterLoading || hourLoading ? (
        <TableShimmer />
      ) : hourData.length === 0 ? (
        <NoDataState />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 sm:px-6 py-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-1 h-5 bg-sky-600 rounded-full" />
              <span className="text-sm font-bold text-slate-700 tracking-wide">
                Shift Backlog / Planning
                {areaLabel !== "—" && <span className="ml-2 text-sky-600 font-semibold">— {areaLabel}</span>}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-slate-500">
              <span>Total Hours: <span className="font-bold text-sky-600">{hourData.length}</span></span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-sky-200/80 border-b border-sky-300">
                  {COLS.map((col) => (
                    <th
                      key={col.label}
                      className={`px-2 sm:px-4 py-2 text-${col.align} text-[10px] sm:text-xs font-bold text-sky-800 tracking-widest uppercase whitespace-nowrap border-r border-sky-300 last:border-r-0`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hourData.map((row, idx) => (
                  <tr
                    key={row.hourId}
                    className={`transition-colors hover:bg-sky-50 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}`}
                  >
                    <td className="px-2 sm:px-4 py-2 text-center border-r border-slate-200">
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 tabular-nums">
                        {row.hourId}
                      </span>
                    </td>
                    <td className="px-1 sm:px-4 py-2 text-center border-r border-slate-200">
                      <span
                        style={SHIFT_BADGE_STYLE[row.shift] ?? SHIFT_BADGE_STYLE.A}
                        className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold"
                      >
                        {row.shift}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center border-r border-slate-200">
                      <span className="text-sm font-medium text-slate-600 tabular-nums">{row.startHour}</span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center border-r border-slate-200">
                      <span className="text-sm font-medium text-slate-600 tabular-nums">{row.endHour}</span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center">
                      <button
                        onClick={() => setEditingRow(row)}
                        title="Edit"
                        className="text-sky-500 hover:text-sky-800 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingRow && (
        <EditHourModal
          row={editingRow}
          onClose={() => setEditingRow(null)}
          onSave={handleSaveEdit}
        />
      )}
     {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}