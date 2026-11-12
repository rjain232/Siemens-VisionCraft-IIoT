import { memo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBackgroundExport } from "../context/BackgroundExportContext";
import {
  getCapturedFiles,
  setBackgroundExportActive,
} from "../utils/backgroundExportInterceptor";
import { reportsApi } from "../services/api";
import {
  blobToBase64,
  getCachedReportFile,
  listCachedReportFiles,
} from "../utils/reportExportCache";
import {
  Calendar,
  X,
  Search,
  Download,
  Clock,
  ChevronUp,
  ChevronDown,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDay(y, m) {
  return new Date(y, m, 1).getDay();
}

function toDateStr(d) {
  if (!d) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function Spinner({ val, min, max, onChange }) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="flex flex-col items-center w-10">
      <button
        onClick={() => onChange(pad(val >= max ? min : val + 1))}
        className="w-full flex justify-center py-0.5 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-700 transition-colors"
      >
        <ChevronUp size={14} />
      </button>
      <input
        type="text"
        value={pad(val)}
        maxLength={2}
        onChange={(e) => {
          const n = parseInt(e.target.value);
          if (!isNaN(n) && n >= min && n <= max) onChange(pad(n));
        }}
        className="w-10 text-center text-sm font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded py-1 outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={() => onChange(pad(val <= min ? max : val - 1))}
        className="w-full flex justify-center py-0.5 hover:bg-blue-50 rounded text-gray-400 hover:text-blue-700 transition-colors"
      >
        <ChevronDown size={14} />
      </button>
    </div>
  );
}

function CompactTimePicker({ value, onChange }) {
  const [h, m] = (value || "00:00").split(":").map(Number);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div className="border-t border-gray-100 pt-2 mt-2">
      <div className="flex items-center gap-1 mb-2">
        <Clock size={11} className="text-blue-700" />
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Time
        </span>
      </div>
      <div className="flex items-center gap-1 justify-center mb-2">
        <Spinner
          val={h}
          min={0}
          max={23}
          onChange={(v) => onChange(`${v}:${pad(m)}`)}
        />
        <span className="text-base font-bold text-gray-400 pb-0.5">:</span>
        <Spinner
          val={m}
          min={0}
          max={59}
          onChange={(v) => onChange(`${pad(h)}:${v}`)}
        />
      </div>
    </div>
  );
}

function SingleCalendar({
  viewYear,
  viewMonth,
  onPrev,
  onNext,
  onSelect,
  rangeStart,
  rangeEnd,
}) {
  const today = new Date();
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);
  const start = parseDate(rangeStart);
  const end = parseDate(rangeEnd);

  const getState = (day) => {
    const dStr = toDateStr(new Date(viewYear, viewMonth, day));
    if (rangeStart === dStr) return "start";
    if (rangeEnd === dStr) return "end";
    if (start && end) {
      const d = new Date(viewYear, viewMonth, day);
      if (d > start && d < end) return "in-range";
    }
    return "none";
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onPrev}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="#374151"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={onNext}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="#374151"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-0.5">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-semibold text-gray-400 py-0.5"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) return <div key={"e" + idx} />;
          const state = getState(day);
          const isToday =
            toDateStr(new Date(viewYear, viewMonth, day)) === toDateStr(today);
          let cellCls =
            "relative flex items-center justify-center h-7 cursor-pointer ";
          let numCls =
            "w-7 h-7 flex items-center justify-center rounded-full text-xs transition-all ";
          if (state === "start" || state === "end")
            numCls += "bg-blue-700 text-white font-bold";
          else if (state === "in-range") {
            cellCls += "bg-blue-50";
            numCls += "text-blue-800 hover:bg-blue-100";
          } else numCls += "text-gray-700 hover:bg-blue-100";
          return (
            <div
              key={day}
              className={cellCls}
              onClick={() =>
                onSelect(toDateStr(new Date(viewYear, viewMonth, day)))
              }
            >
              <div className={numCls}>
                {day}
                {isToday && state === "none" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-700" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DateInput({
  label,
  value,
  timeValue,
  onChange,
  onTimeChange,
  rangeStart,
  rangeEnd,
  showTime,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const popupRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

  const init = value ? parseDate(value) : new Date();
  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth());

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const popupWidth = 268;
    const popupHeight = showTime ? 390 : 280;
    const BUFFER = 30;

    let top = rect.bottom + 6;
    let left = rect.left;

    if (window.innerHeight - rect.bottom < popupHeight + BUFFER) {
      const topSpace = rect.top;
      if (topSpace > window.innerHeight - rect.bottom) {
        top = rect.top - popupHeight - 6;
      }
    }

    if (left + popupWidth > window.innerWidth) {
      left = window.innerWidth - popupWidth - 10;
    }
    if (left < 10) left = 10;
    if (top < 6) top = 6;

    setPopupStyle({ position: "fixed", top, left, zIndex: 99999 });

    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);

    const handleResize = () => {
      if (!triggerRef.current) return;
      const r = triggerRef.current.getBoundingClientRect();
      let t = r.bottom + 6;
      let l = r.left;
      if (window.innerHeight - r.bottom < popupHeight + BUFFER) {
        if (r.top > window.innerHeight - r.bottom) t = r.top - popupHeight - 6;
      }
      if (l + popupWidth > window.innerWidth)
        l = window.innerWidth - popupWidth - 10;
      if (l < 10) l = 10;
      if (t < 6) t = 6;
      setPopupStyle({ position: "fixed", top: t, left: l, zIndex: 99999 });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, showTime]);

  useEffect(() => {
    const handler = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        popupRef.current &&
        !popupRef.current.contains(e.target)
      )
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const prevMonth = () =>
    viewMonth === 0
      ? (setViewMonth(11), setViewYear((y) => y - 1))
      : setViewMonth((m) => m - 1);
  const nextMonth = () =>
    viewMonth === 11
      ? (setViewMonth(0), setViewYear((y) => y + 1))
      : setViewMonth((m) => m + 1);

  return (
    <div className="flex flex-col gap-1 relative" ref={triggerRef}>
      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1.5 bg-white border rounded-md px-2.5 py-[7px] cursor-pointer transition-all min-w-[148px] ${
          open
            ? "border-blue-700 ring-2 ring-blue-100"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <Calendar size={13} className="text-gray-400 shrink-0" />
        <span
          className={`text-sm flex-1 ${value ? "text-gray-800 font-medium" : "text-gray-400"}`}
        >
          {value || "Select date"}
        </span>
        {showTime && value && (
          <span className="flex items-center gap-0.5 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-md">
            <Clock size={9} />
            {timeValue || "00:00"}
          </span>
        )}
        {value && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              if (showTime) onTimeChange("00:00");
            }}
            className="text-gray-300 hover:text-gray-500 ml-0.5 transition-colors"
          >
            <X size={11} />
          </button>
        )}
      </div>

      {open &&
        createPortal(
          <div style={popupStyle} ref={popupRef}>
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-3">
              <SingleCalendar
                viewYear={viewYear}
                viewMonth={viewMonth}
                onPrev={prevMonth}
                onNext={nextMonth}
                onSelect={(v) => {
                  onChange(v);
                  if (!showTime) setOpen(false);
                }}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
              />
              {showTime && (
                <>
                  <CompactTimePicker
                    value={timeValue || "00:00"}
                    onChange={onTimeChange}
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2.5 w-full text-white text-xs font-semibold py-1.5 rounded-lg transition-colors"
                    style={{ backgroundColor: "rgb(22, 70, 161)" }}
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function CustomDurationSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = [...options, { value: "", label: "Select Duration" }].find(
    (o) => o.value === value,
  ) || { value: "", label: "Select Duration" };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const allOptions = [{ value: "", label: "Select Duration" }, ...options];

  return (
    <div className="flex flex-col gap-1 min-w-[180px]" ref={ref}>
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>

      <div className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className={`w-full flex items-center justify-between gap-2 bg-white border rounded-md px-3 py-[7px] text-sm font-medium transition-all
            ${
              open
                ? "border-blue-700 ring-2 ring-blue-100 text-blue-800"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
        >
          <span className="truncate">{selected.label}</span>
          <ChevronDown
            size={13}
            className={`text-gray-400 transition-transform ${open ? "rotate-180 text-blue-700" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute z-50 top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
            {allOptions.map((opt) => {
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value || "select-duration"}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-800 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


// added new building block for search using DateRangeBar.
function CustomSearchInput({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 min-w-[180px]">
      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div
        className={`flex items-center gap-1.5 bg-white border rounded-md px-2.5 py-[7px] transition-all ${
          value
            ? "border-blue-700 ring-2 ring-blue-100"
            : "border-gray-200 hover:border-gray-300 focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-100"
        }`}
      >
        <Search size={13} className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm flex-1 outline-none placeholder:text-gray-400 text-gray-800 font-medium bg-transparent min-w-0"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="text-gray-300 hover:text-gray-500 ml-0.5 transition-colors shrink-0"
          >
            <X size={11} />
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(function DateRangeBar({
  onSearch = () => {},
  onDownload = () => {},
  showTime = false,
  showDownload = false,
  showEmail = true,
  reportName = "",
  showDateInputs = true,
  withContainer = true,
  selectedStartDate = "",
  selectedEndDate = "",
  isDownloading = false,
  durationOptions = [],
  selectedDuration = "",
  onDurationChange = () => {},
  // --- new, opt-in search field ---
  showSearch = false,
  searchLabel = "Search",
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchValueChange = () => {},
  singleDate = false,
  showSearchButton = true,
  onDateChange = null,
}) {
  const getToday = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const [startDate, setStartDate] = useState(selectedStartDate || getToday());
  const [endDate, setEndDate] = useState(selectedEndDate || getToday());
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  // ── Email Share Modal States ──────────────────────────────────────────────
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState(() => {
    try {
      return localStorage.getItem("jsw_last_report_recipient_email") || "";
    } catch {
      return "";
    }
  });
  const [cadence, setCadence] = useState("Immediate Share");
  const [includePdf, setIncludePdf] = useState(true);
  const [includeXlsx, setIncludeXlsx] = useState(true);
  const [alsoDownloadCopy, setAlsoDownloadCopy] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // null | "success" | "error"
  const [emailError, setEmailError] = useState("");
  const [emailStep, setEmailStep] = useState("");

  useEffect(() => {
    if (showEmailModal) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showEmailModal]);

  const handleSendReportEmail = async () => {
    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setEmailStatus("error");
      setEmailError("Please enter a valid recipient email address.");
      return;
    }

    if (!includePdf && !includeXlsx) {
      setEmailStatus("error");
      setEmailError("Please select at least one format (PDF or Excel).");
      return;
    }

    setIsEmailing(true);
    setEmailStatus(null);
    setEmailError("");
    setEmailStep("Capturing live report from screen...");

    try {
      const capturedMap = new Map();
      let finished = false;

      const finishCapture = () => {
        if (finished) return;
        finished = true;
        setBackgroundExportActive(false);
      };

      const onCapture = (name, blob) => {
        const lower = name.toLowerCase();
        const ext = lower.endsWith(".xlsx") ? "xlsx" : "pdf";
        capturedMap.set(ext, { name, blob, fileType: ext });

        const wantsPdf = includePdf;
        const wantsXlsx = includeXlsx;
        const hasPdf = capturedMap.has("pdf");
        const hasXlsx = capturedMap.has("xlsx");

        // If all desired formats have arrived, finish immediately
        if ((!wantsPdf || hasPdf) && (!wantsXlsx || hasXlsx)) {
          setTimeout(finishCapture, 100);
        }
      };

      // Set interceptor active so the download isn't forced to local disk automatically
      setBackgroundExportActive(true, reportName || "report", onCapture);

      // Trigger the report's native download function and await execution
      try {
        const downloadPromise = onDownload();
        if (downloadPromise && typeof downloadPromise.then === "function") {
          await downloadPromise;
        }
      } catch (dlErr) {
        console.warn("[DateRangeBar] onDownload error:", dlErr);
      }

      // Wait for formats to arrive (up to 5 seconds max for heavy rendering)
      const maxWait = Date.now() + 5000;
      while (!finished && Date.now() < maxWait) {
        const wantsPdf = includePdf;
        const wantsXlsx = includeXlsx;
        const hasPdf = capturedMap.has("pdf");
        const hasXlsx = capturedMap.has("xlsx");

        if ((!wantsPdf || hasPdf) && (!wantsXlsx || hasXlsx)) {
          finishCapture();
          break;
        }
        await new Promise((r) => setTimeout(r, 100));
      }

      finishCapture();
      setBackgroundExportActive(false);

      // Only dispatch files that were freshly and authentically captured from this download
      const capturedFiles = Array.from(capturedMap.values());
      const filesToSend = capturedFiles.filter((f) => {
        if (f.fileType === "pdf" && !includePdf) return false;
        if (f.fileType === "xlsx" && !includeXlsx) return false;
        return true;
      });

      if (filesToSend.length === 0) {
        throw new Error(
          "Could not capture report file. Please verify that the report has finished loading data."
        );
      }

      // If user also requested a local download copy
      if (alsoDownloadCopy) {
        filesToSend.forEach((f) => {
          const url = URL.createObjectURL(f.blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = f.name;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
            URL.revokeObjectURL(url);
          }, 1000);
        });
      }

      setEmailStep("Packaging attachment & dispatching email...");

      const filesWithBase64 = await Promise.all(
        filesToSend.map(async (file) => ({
          name: file.name,
          fileType: file.fileType,
          contentBase64: await blobToBase64(file.blob),
        }))
      );

      try {
        localStorage.setItem("jsw_last_report_recipient_email", trimmedEmail);
      } catch {
        // ignore storage error
      }

      await reportsApi.shareByEmail({
        email: trimmedEmail,
        cadence: [cadence],
        dateRange: { start: startDate, end: endDate },
        files: filesWithBase64,
      });

      setEmailStatus("success");
      setEmailStep("");
      setTimeout(() => {
        setShowEmailModal(false);
        setEmailStatus(null);
      }, 2000);
    } catch (err) {
      console.error("[DateRangeBar] Email dispatch error:", err);
      setEmailStatus("error");
      setEmailError(err.message || "Failed to send email. Please verify SMTP connection.");
    } finally {
      setIsEmailing(false);
      setBackgroundExportActive(false);
    }
  };

  const bgContext = useBackgroundExport();
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  const onDownloadRef = useRef(onDownload);
  onDownloadRef.current = onDownload;

  useEffect(() => {
    if (selectedStartDate) setStartDate(selectedStartDate);
  }, [selectedStartDate]);

  useEffect(() => {
    if (selectedEndDate) setEndDate(selectedEndDate);
  }, [selectedEndDate]);

  // Headless background export auto-orchestrator
  useEffect(() => {
    if (!bgContext?.isBackground || !bgContext?.dateRange) return;
    const start = bgContext.dateRange.start || getToday();
    const end = bgContext.dateRange.end || getToday();
    setStartDate(start);
    setEndDate(end);

    let isDisposed = false;
    let attempts = 0;
    const maxDownloadAttempts = 8;

    // Progressive search attempts (to handle async master data and cascading filter options)
    const runSearch = () => {
      if (isDisposed) return;
      try {
        if (typeof onSearchRef.current === "function") {
          onSearchRef.current(start, end, "00:00", "23:59");
        }
      } catch (e) {
        console.warn("[DateRangeBar bg search error]", e);
      }
    };

    const searchTimer1 = setTimeout(runSearch, 350);
    const searchTimer2 = setTimeout(runSearch, 1200);

    // Progressive download attempts: retry onDownload until file is captured
    let downloadTimer = null;
    const attemptDownload = () => {
      if (isDisposed) return;
      attempts++;
      const captured = getCapturedFiles();
      const hasPdf = Object.keys(captured).some((k) => k.toLowerCase().endsWith(".pdf"));
      const hasXlsx = Object.keys(captured).some((k) => k.toLowerCase().endsWith(".xlsx"));

      if (hasPdf && hasXlsx) {
        return; // both formats successfully captured
      }
      if ((hasPdf || hasXlsx) && attempts >= 3) {
        return; // component only supports one format and it has been captured
      }
      if (attempts >= maxDownloadAttempts) {
        return;
      }

      try {
        if (typeof onDownloadRef.current === "function") {
          onDownloadRef.current();
        }
      } catch (e) {
        console.warn("[DateRangeBar bg download error]", e);
      }

      if (!isDisposed && attempts < maxDownloadAttempts) {
        downloadTimer = setTimeout(attemptDownload, 1500);
      }
    };

    downloadTimer = setTimeout(attemptDownload, 2200);

    return () => {
      isDisposed = true;
      clearTimeout(searchTimer1);
      clearTimeout(searchTimer2);
      if (downloadTimer) clearTimeout(downloadTimer);
    };
  }, [bgContext?.isBackground, bgContext?.dateRange]);

  const handleStartDateChange = (val) => {
    setStartDate(val);
    const endVal = singleDate ? val : endDate;
    if (singleDate) setEndDate(val);
    if (typeof onDateChange === "function") {
      onDateChange(val, endVal, startTime, endTime);
    }
  };

  const handleEndDateChange = (val) => {
    setEndDate(val);
    if (typeof onDateChange === "function") {
      onDateChange(startDate, val, startTime, endTime);
    }
  };

  const handleDurationChange = (value) => {
    if (!value) {
      const td = getToday();
      setStartDate(td);
      setEndDate(td);
      if (typeof onDateChange === "function") {
        onDateChange(td, td, startTime, endTime);
      }
    }
    onDurationChange(value);
  };

  const handleSearch = () => {
    onSearch(startDate, singleDate ? startDate : endDate, startTime, endTime);
  };

  const content = (
    <div className="flex flex-wrap items-end gap-3">
      {showDateInputs && (
        <>
          <DateInput
            label={singleDate ? "Select Date" : "Start Date"}
            value={startDate}
            timeValue={startTime}
            onChange={handleStartDateChange}
            onTimeChange={(val) => {
              setStartTime(val);
              if (typeof onDateChange === "function") {
                onDateChange(startDate, endDate, val, endTime);
              }
            }}
            rangeStart={startDate}
            rangeEnd={endDate}
            showTime={showTime}
          />
          {!singleDate && (
            <DateInput
              label="End Date"
              value={endDate}
              timeValue={endTime}
              onChange={handleEndDateChange}
              onTimeChange={(val) => {
                setEndTime(val);
                if (typeof onDateChange === "function") {
                  onDateChange(startDate, endDate, startTime, val);
                }
              }}
              rangeStart={startDate}
              rangeEnd={endDate}
              showTime={showTime}
            />
          )}
           {durationOptions.length > 0 && (
            <div className="flex flex-col gap-1 min-w-[180px]">
              <CustomDurationSelect
                label="Duration"
                value={selectedDuration}
                options={durationOptions}
                onChange={handleDurationChange}
              />
            </div>
          )}
          {showSearch && (
            <CustomSearchInput
              label={searchLabel}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={onSearchValueChange}
            />
          )}
         
        </>
      )}
      {showDateInputs ? <div className="flex-1" /> : <div className="w-0" />}
      <div className="flex items-end gap-2">
        {showSearchButton && (
          <button
            onClick={handleSearch}
            className="flex items-center gap-1.5 text-white text-sm font-semibold px-4 py-[7px] rounded-md transition-colors shadow-sm hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: "rgb(22, 70, 161)" }}
          >
            <Search size={13} /> Search
          </button>
        )}
        {showDownload && (
          <>
            <button
              type="button"
              onClick={onDownload}
              disabled={isDownloading || isEmailing}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-[7px] rounded-md transition-colors disabled:opacity-50 bg-transparent border hover:bg-blue-50/50 active:scale-[0.99]"
              style={{
                color: "rgb(22, 70, 161)",
                borderColor: "rgb(22, 70, 161)",
              }}
            >
              <Download size={13} />
              {isDownloading ? "Downloading..." : "Download"}
            </button>
            {showEmail && (
              <button
                type="button"
                onClick={() => {
                  setShowEmailModal(true);
                  setEmailStatus(null);
                  setEmailError("");
                  setEmailStep("");
                }}
                disabled={isDownloading || isEmailing}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-[7px] rounded-md transition-colors disabled:opacity-50 bg-transparent border hover:bg-blue-50/50 active:scale-[0.99]"
                style={{
                  color: "rgb(22, 70, 161)",
                  borderColor: "rgb(22, 70, 161)",
                }}
                title="Send email for this report directly with current filters and date range"
              >
                <Mail size={13} />
                <span>Send Email</span>
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Email Report Modal Portal ── */}
      {showEmailModal &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#2744A0] flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Email Report</h3>
                    <p className="text-xs text-gray-500">
                      {reportName ? `${reportName} • ` : ""}Share exact report from screen
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => !isEmailing && setShowEmailModal(false)}
                  disabled={isEmailing}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-4">
                {/* Active Date Range Info Banner */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
                  <span className="font-semibold text-slate-600">Active Date Range:</span>
                  <span className="font-bold text-[#2744A0]">
                    {startDate || "—"} to {endDate || "—"}
                  </span>
                </div>

                {/* Recipient Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Recipient Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter recipient email (e.g. manager@jsw.in)"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={isEmailing}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Cadence */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Cadence / Frequency
                  </label>
                  <select
                    value={cadence}
                    onChange={(e) => setCadence(e.target.value)}
                    disabled={isEmailing}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#2744A0] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-gray-700 font-medium cursor-pointer"
                  >
                    <option value="Immediate Share">Immediate Share (Now)</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Shift wise">Shift wise</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Annual / Yearly">Annual / Yearly</option>
                  </select>
                </div>

                {/* File Formats to Include */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Attachments to Include
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <label
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        includePdf
                          ? "border-[#2744A0] bg-blue-50/50 text-[#2744A0] font-semibold"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={includePdf}
                        onChange={(e) => setIncludePdf(e.target.checked)}
                        disabled={isEmailing}
                        className="rounded text-[#2744A0] focus:ring-0"
                      />
                      <FileText size={15} />
                      <span className="text-xs">PDF Document</span>
                    </label>

                    <label
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        includeXlsx
                          ? "border-[#2744A0] bg-blue-50/50 text-[#2744A0] font-semibold"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={includeXlsx}
                        onChange={(e) => setIncludeXlsx(e.target.checked)}
                        disabled={isEmailing}
                        className="rounded text-[#2744A0] focus:ring-0"
                      />
                      <FileText size={15} />
                      <span className="text-xs">Excel (.xlsx)</span>
                    </label>
                  </div>
                </div>

                {/* Also download locally */}
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={alsoDownloadCopy}
                    onChange={(e) => setAlsoDownloadCopy(e.target.checked)}
                    disabled={isEmailing}
                    className="rounded text-[#2744A0] focus:ring-0"
                  />
                  <span>Also download a copy to this computer</span>
                </label>

                {/* Status messages */}
                {isEmailing && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-800 animate-in fade-in">
                    <Loader2 size={16} className="animate-spin text-[#2744A0]" />
                    <span className="font-semibold">{emailStep || "Processing report..."}</span>
                  </div>
                )}

                {emailStatus === "success" && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 animate-in fade-in">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="font-semibold">
                      Report successfully emailed to {emailInput}!
                    </span>
                  </div>
                )}

                {emailStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-800 animate-in fade-in">
                    <AlertCircle size={16} className="text-red-600 shrink-0" />
                    <span className="font-semibold">{emailError || "Failed to send email."}</span>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => !isEmailing && setShowEmailModal(false)}
                  disabled={isEmailing}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-200/60 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendReportEmail}
                  disabled={
                    !emailInput.trim() ||
                    (!includePdf && !includeXlsx) ||
                    isEmailing ||
                    emailStatus === "success"
                  }
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl shadow-md transition-all disabled:opacity-50 hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: "rgb(22, 70, 161)" }}
                >
                  {isEmailing ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );

  if (!withContainer) {
    return content;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4">
      {content}
    </div>
  );
});