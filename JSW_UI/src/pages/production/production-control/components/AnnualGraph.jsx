import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DataTable from "../../../../sharedComponents/DataTable";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import FilterBar from "../../../../sharedComponents/FilterBar";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import appConfig from "../../../../config/appConfig";
import { lineVariantApi, productionApi } from "../../../../services/api";
import {
  loadBrandingLogos,
  drawPdfPageChrome,
  loadKarlaFont,
  buildAutoTableConfig,
} from "../../../../utils/PdfUtils";
import { SearchPromptState } from "../../../../sharedComponents/EmptyState";
import {
  ChartShimmer,
  TableShimmer,
} from "../../../../sharedComponents/Shimmer";

const { shifts: SHIFT_OPTIONS, months: MONTH_OPTIONS } = appConfig.production;

const INDIVIDUAL_SHIFTS = SHIFT_OPTIONS.filter((s) => s.value !== "All").map(
  (s) => s.value,
);

const MONTH_TO_NUMBER = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const getYearOptions = () => {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();

  return Array.from(
    { length: Math.max(currentYear - startYear + 1, 0) },
    (_, index) => {
      const year = currentYear - index;
      return { label: String(year), value: String(year) };
    },
  );
};

const normalizeValue = (val) =>
  !val || val === "N/A" || val === "null" || val === "NULL" ? "Null" : val;

const tableColumns = [
  { key: "sr", label: "Sr. No.", sortable: false },
  { key: "shift", label: "Shift", sortable: true, type: "shift" },
  { key: "line", label: "Line", sortable: true, type: "primary" },
  { key: "period", label: "Period", sortable: true },
  { key: "target", label: "Target", sortable: true },
  {
    key: "production",
    label: "Actual Production",
    sortable: true,
    type: "actual",
    targetKey: "target",
  },
  { key: "losses", label: "Losses", sortable: true },
  { key: "lineCapacity", label: "Line Capacity", sortable: true },
];

const DEFAULT_FILTERS = {
  year: "",
  month: "All",
  shifts: ["A"],
  line: "",
  variant: "All",
};

const makeBarLabel =
  (color) =>
    ({ x, y, width, value }) => {
      if (value === null || value === undefined) return null;
      const labelText = String(value);
      const approxWidth = labelText.length * 8 + 14;
      const cx = x + width / 2;
      const rectX = cx - approxWidth / 2;
      const rectY = y - 32;
      return (
        <g>
          <rect
            x={rectX}
            y={rectY}
            width={approxWidth}
            height={16}
            rx={4}
            ry={4}
            fill="#ffffff"
            stroke={color}
            strokeWidth={1}
          />
          <text
            x={cx}
            y={rectY + 11}
            fill={color}
            fontSize={10}
            fontWeight={700}
            textAnchor="middle"
          >
            {labelText}
          </text>
        </g>
      );
    };

const renderTargetLabel = makeBarLabel("#7c3aed");
const renderProductionLabel = makeBarLabel("#10b981");
const renderLossesLabel = makeBarLabel("#dc2626");

const renderLineCapacityLabel = ({ x, y, value }) => {
  const labelText = `${value}`;
  const approxWidth = labelText.length * 7 + 14;
  const rectX = x - approxWidth / 2;
  const rectY = y - 24;
  return (
    <g>
      <rect
        x={rectX}
        y={rectY}
        width={approxWidth}
        height={18}
        rx={6}
        ry={6}
        fill="#fff7ed"
        stroke="#fdba74"
        strokeWidth={1}
      />
      <text
        x={x}
        y={rectY + 12.5}
        fill="#ff8c00"
        fontSize={11}
        fontWeight={700}
        textAnchor="middle"
      >
        {labelText}
      </text>
    </g>
  );
};

export default function AnnualGraph({
  backgroundMode = false,
  backgroundDateRange = null,
  backgroundCadence = null,
  backgroundFilters = null,
} = {}) {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);
  const targetDateRange = backgroundDateRange || bgContext?.dateRange;
  const targetCadence = backgroundCadence || bgContext?.cadence;
  const targetFilters = backgroundFilters || bgContext?.filters;

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  const [hasSearched, setHasSearched] = useState(false);

  const [filterConfig, setFilterConfig] = useState([
    { type: "select", key: "year", label: "Year", options: [] },
    { type: "select", key: "month", label: "Month", options: MONTH_OPTIONS },
    {
      type: "select",
      key: "shifts",
      label: "Shift",
      multiple: true,
      searchable: false,
      options: SHIFT_OPTIONS,
    },
    { type: "select", key: "line", label: "Line", options: [] },
    { type: "select", key: "variant", label: "Variant", options: [] },
  ]);

  const [monthlyData, setMonthlyData] = useState([]);
  const [progressiveData, setProgressiveData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  const [isLoadingMeta, setIsLoadingMeta] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [metaError, setMetaError] = useState("");
  const [dataError, setDataError] = useState("");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [isDownloading, setIsDownloading] = useState(false);
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);

  useEffect(() => {
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsMobile(window.innerWidth < 640), 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchMeta = async () => {
      setIsLoadingMeta(true);
      setMetaError("");
      try {
        const lineVariantRes = await lineVariantApi.getLineAndVariantData();

        const lineOptions = (lineVariantRes?.data?.lines ?? []).map((l) => ({
          label: l.LineName || "Null",
          value: String(l.LineId ?? ""),
        }));

        const variantOptions = [
          { label: "All", value: "All" },
          ...(lineVariantRes?.data?.variants ?? []).map((v) => ({
            label: v || "Null",
            value: v || "Null",
          })),
        ];

        const yearOptions = getYearOptions();

        setFilterConfig([
          { type: "select", key: "year", label: "Year", options: yearOptions },
          {
            type: "select",
            key: "month",
            label: "Month",
            options: MONTH_OPTIONS,
          },
          {
            type: "select",
            key: "shifts",
            label: "Shift",
            multiple: true,
            searchable: false,
            options: SHIFT_OPTIONS,
          },
          { type: "select", key: "line", label: "Line", options: lineOptions },
          {
            type: "select",
            key: "variant",
            label: "Variant",
            options: variantOptions,
          },
        ]);

        let bgYear = yearOptions[0]?.value ?? "";
        if (targetDateRange?.start) {
          bgYear = targetDateRange.start.slice(0, 4);
        }
        let bgLine = lineOptions[0]?.value ?? "";
        if (targetFilters?.lineId || targetFilters?.line) {
          const matched = lineOptions.find(
            (l) =>
              String(l.value) === String(targetFilters.lineId || targetFilters.line) ||
              String(l.label).toLowerCase() === String(targetFilters.line).toLowerCase(),
          );
          if (matched) bgLine = matched.value;
        }
        let bgShifts = ["A"];
        if (targetFilters?.shifts) {
          bgShifts = Array.isArray(targetFilters.shifts) ? targetFilters.shifts : [targetFilters.shifts];
        } else if (targetFilters?.shift) {
          bgShifts = [targetFilters.shift];
        }

        const effectiveFilters = isBg
          ? {
              year: bgYear,
              month: "All",
              shifts: bgShifts,
              line: bgLine,
              variant: targetFilters?.model || "All",
            }
          : {
              year: yearOptions[0]?.value ?? "",
              month: "All",
              shifts: ["A"],
              line: lineOptions[0]?.value ?? "",
              variant: "All",
            };

        setFilters(effectiveFilters);
        setAppliedFilters(effectiveFilters);
        if (isBg) {
          setHasSearched(true);
        }
      } catch (err) {
        setMetaError(err.message || "Failed to load filter options.");
      } finally {
        setIsLoadingMeta(false);
      }
    };

    fetchMeta();
  }, [isBg, targetDateRange, targetFilters]);

  // Auto trigger download in background mode
  const bgTriggeredRef = useRef(false);
  useEffect(() => {
    if (isBg && hasSearched && !isLoadingData && !bgTriggeredRef.current) {
      bgTriggeredRef.current = true;
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
    // Removed clearTimeout to prevent race condition canceling export
    }
  }, [isBg, hasSearched, isLoadingData, handleDownload]);

  useEffect(() => {
    if (isLoadingMeta) return;
    if (!hasSearched) return;

    const fetchChartData = async () => {
      setIsLoadingData(true);
      setDataError("");
      try {
        const appliedShifts = appliedFilters.shifts ?? ["All"];
        const shiftParam =
          appliedShifts.length === 0 || appliedShifts.includes("All")
            ? undefined
            : appliedShifts.join(",");

        const monthScopedParams = {
          year: appliedFilters.year || undefined,
          shift: shiftParam,
          lineId: appliedFilters.line || undefined,
          variantCode:
            appliedFilters.variant !== "All"
              ? appliedFilters.variant.toUpperCase()
              : undefined,
          month:
            appliedFilters.month !== "All"
              ? MONTH_TO_NUMBER[appliedFilters.month]
              : undefined,
        };

        const progressiveParams = {
          year: appliedFilters.year || undefined,
          shift: shiftParam,
          lineId: appliedFilters.line || undefined,
          variantCode:
            appliedFilters.variant !== "All"
              ? appliedFilters.variant.toUpperCase()
              : undefined,
        };
        const [monthScopedRes, yearlyRes] = await Promise.all([
          productionApi.annualGraph(monthScopedParams),
          productionApi.annualGraph(progressiveParams),
        ]);

        setMonthlyData(
          (monthScopedRes?.monthlyData ?? []).map((item) => ({
            period: item.Period,
            target: item.Target,
            production: item.ActualProduction,
            losses: item.Losses,
            lineCapacity: item.LineCapacity,
          })),
        );

        setProgressiveData(
          (yearlyRes?.progressiveData ?? []).map((item) => ({
            period: "Total",
            target: item.Target,
            production: item.ActualProduction,
            losses: item.Losses,
            lineCapacity: item.LineCapacity,
          })),
        );

        setDetailData(
          (monthScopedRes?.detailData ?? []).map((item, index) => ({
            sr: index + 1,
            period: item.Period,
            shift: item.Shift,
            line: normalizeValue(item.Line),
            target: item.Target,
            production: item.ActualProduction,
            losses: item.Losses,
            lineCapacity: item.LineCapacity,
          })),
        );
      } catch (err) {
        setDataError(err.message || "Failed to load annual graph data.");
        setMonthlyData([]);
        setProgressiveData([]);
        setDetailData([]);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchChartData();
  }, [appliedFilters, isLoadingMeta, hasSearched]);

  const normalizeShifts = (prevShifts, incomingShifts) => {
    if (!incomingShifts) return prevShifts;
    let next = incomingShifts;
    if (next.includes("All") && !prevShifts.includes("All")) {
      next = ["All"];
    } else if (!next.includes("All") && prevShifts.includes("All")) {
      next = next.filter((s) => s !== "All");
      if (next.length === 0) next = ["All"];
    } else if (
      !next.includes("All") &&
      INDIVIDUAL_SHIFTS.every((s) => next.includes(s))
    ) {
      next = ["All"];
    } else if (next.includes("All") && next.length > 1) {
      next = next.filter((s) => s !== "All");
    }
    return next;
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => {
      const merged = { ...prev, ...newFilters };
      merged.shifts = normalizeShifts(
        prev.shifts ?? ["All"],
        newFilters.shifts,
      );
      return merged;
    });

    setAppliedFilters((prev) => {
      const merged = { ...prev, ...newFilters };
      merged.shifts = normalizeShifts(
        prev.shifts ?? ["All"],
        newFilters.shifts,
      );
      return merged;
    });
  }, []);

  const handleSearch = useCallback(() => {
    setAppliedFilters({ ...filters });
    setHasSearched(true);
  }, [filters]);

  const lineOptions = useMemo(
    () => filterConfig.find((f) => f.key === "line")?.options ?? [],
    [filterConfig],
  );

  const selectedLineLabel = useMemo(
    () =>
      lineOptions.find((o) => String(o.value) === String(appliedFilters.line))
        ?.label ?? "All",
    [lineOptions, appliedFilters.line],
  );

  const appliedShiftLabel = useMemo(() => {
    const shifts = appliedFilters.shifts ?? ["All"];
    return shifts.length === 0 || shifts.includes("All")
      ? "All"
      : shifts.join(", ");
  }, [appliedFilters.shifts]);

  const chartTitle = useMemo(
    () =>
      `Annual Production [${appliedFilters.year || "All"}] - Line [${selectedLineLabel}] Month [${appliedFilters.month}] Shift [${appliedShiftLabel}]`,
    [
      appliedFilters.year,
      appliedFilters.month,
      appliedShiftLabel,
      selectedLineLabel,
    ],
  );

  const progressiveTitle = useMemo(
    () =>
      `Progressive Year [${appliedFilters.year || "All"}] - Line [${selectedLineLabel}]`,
    [appliedFilters.year, selectedLineLabel],
  );

  const handleDownload = useCallback(async () => {
    if (!hasSearched || (detailData.length === 0 && !isBg)) return;

    setIsDownloading(true);
    try {
      const XLSX = await import("xlsx");
      const headers = [
        "Sr.No.",
        "Shift",
        "Line",
        "Period",
        "Target",
        "Actual Production",
        "Losses",
        "Line Capacity",
      ];
      const rows = detailData.map((item, i) => [
        i + 1,
        item.shift,
        item.line,
        item.period,
        item.target,
        item.production,
        item.losses,
        item.lineCapacity,
      ]);
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      ws["!cols"] = [
        { wch: 8 },
        { wch: 10 },
        { wch: 12 },
        { wch: 14 },
        { wch: 12 },
        { wch: 18 },
        { wch: 12 },
        { wch: 14 },
      ];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Annual Production");
      const { saveExcel } = await import("../../../../utils/ExcelUtils");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveExcel(
        excelBuffer,
        `Annual_Production_${appliedFilters.year || "report"}.xlsx`,
      );

      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const FONT = await loadKarlaFont(doc);
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const MARGIN = 14;
      const HEADER_H = 40;

      const [jswImg, schaefflerImg] = await loadBrandingLogos();

      const subLines = [
        `Year: ${appliedFilters.year || "All"}   |   Month: ${appliedFilters.month}   |   Shift: ${appliedShiftLabel}   |   Line: ${selectedLineLabel}   |   Variant: ${appliedFilters.variant}`,
      ];

      const drawPageChrome = (pageNum, totalPages) =>
        drawPdfPageChrome(doc, {
          pageNum,
          totalPages,
          fontFamily: FONT,
          title: "Annual Production Report",
          subLines,
          jswImg,
          schaefflerImg,
        });

      const cssPropName = (c) => c.replace(/([A-Z])/g, "-$1").toLowerCase();
      const oklchToRgb = (v) => {
        if (!v || v.includes("transparent")) return null;
        if (v.toLowerCase().includes("oklch")) {
          const m = v.match(
            /oklch\s*\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)\s*\)/,
          );
          if (m) {
            const [L, , H] = [
              parseFloat(m[1]),
              parseFloat(m[2]),
              parseFloat(m[3]),
            ];
            if (H >= 95 && H <= 105 && L >= 60) return "rgb(16, 185, 129)";
            if (H >= 0 && H <= 10 && L >= 50) return "rgb(244, 63, 94)";
            if (H >= 250 && H <= 260 && L >= 55) return "rgb(37, 99, 235)";
            if (L >= 90) return "rgb(255, 255, 255)";
            if (L <= 20) return "rgb(30, 30, 30)";
            return "rgb(200, 200, 200)";
          }
        }
        return null;
      };

      const captureChart = async (ref) => {
        if (!ref.current) return null;
        const overrides = [];
        let origBg = "",
          origParentBg = "";
        try {
          const el = ref.current;
          origBg = el.style.backgroundColor;
          origParentBg = el.parentElement?.style.backgroundColor ?? "";
          el.style.backgroundColor = "#ffffff";
          if (el.parentElement)
            el.parentElement.style.backgroundColor = "#ffffff";

          // ── Convert oklch / rgba colours html2canvas cannot handle ──
          const allEls = [el, ...el.querySelectorAll("*")];
          const colorProps = [
            "color",
            "backgroundColor",
            "borderTopColor",
            "borderRightColor",
            "borderBottomColor",
            "borderLeftColor",
            "fill",
            "stroke",
          ];
          allEls.forEach((e) => {
            const isSvgEl = e instanceof SVGElement;
            const cs = window.getComputedStyle(e);
            colorProps.forEach((p) => {
              if (
                isSvgEl &&
                (p === "fill" || p === "stroke") &&
                e.hasAttribute(p)
              )
                return;
              const val = cs[p];
              if (val && val.includes("oklch")) {
                const rgb = oklchToRgb(val);
                if (rgb) {
                  const cp = cssPropName(p);
                  overrides.push({
                    el: e,
                    prop: cp,
                    original: e.style.getPropertyValue(cp),
                  });
                  e.style.setProperty(cp, rgb, "important");
                }
              }
            });
          });
          allEls.forEach((e) => {
            const bg = window.getComputedStyle(e).backgroundColor;
            if (bg && bg.includes("rgba")) {
              const m2 = bg.match(/rgba?\((.*?)\)/);
              if (m2) {
                const parts = m2[1].split(",").map((p) => p.trim());
                if (parts.length >= 3) {
                  const alpha = parts[3] ? parseFloat(parts[3]) : 1;
                  const solid =
                    alpha < 0.3
                      ? "rgb(255,255,255)"
                      : `rgb(${parts[0]},${parts[1]},${parts[2]})`;
                  overrides.push({
                    el: e,
                    prop: "background-color",
                    original: e.style.getPropertyValue("background-color"),
                  });
                  e.style.setProperty("background-color", solid, "important");
                }
              }
            }
          });

          // ── Remove SVG clip-paths so floating labels are captured ──
          const svgs = el.querySelectorAll("svg");
          svgs.forEach((svg) => {
            overrides.push({
              el: svg,
              prop: "overflow",
              original: svg.style.overflow,
            });
            svg.style.overflow = "visible";
            svg.querySelectorAll("[clip-path]").forEach((node) => {
              overrides.push({
                el: node,
                prop: "clip-path",
                original: node.getAttribute("clip-path"),
                isAttr: true,
              });
              node.removeAttribute("clip-path");
            });
          });

          await new Promise((r) => setTimeout(r, 200));

          const { default: html2canvas } = await import("html2canvas");
          const canvas = await html2canvas(el, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
            logging: false,
            allowTaint: true,
          });

          const imgData = canvas.toDataURL("image/png");
          const rect = el.getBoundingClientRect();
          const aspect = rect.width > 0 ? rect.height / rect.width : 0.5;
          return { imgData, aspect };
        } catch (e) {
          console.warn("Chart capture failed:", e.message);
          return null;
        } finally {
          // ── Restore live DOM ──
          if (ref.current) {
            ref.current.style.backgroundColor = origBg;
            if (ref.current.parentElement)
              ref.current.parentElement.style.backgroundColor = origParentBg;
          }
          overrides.forEach(({ el, prop, original, isAttr }) => {
            if (isAttr) {
              original
                ? el.setAttribute(prop, original)
                : el.removeAttribute(prop);
            } else {
              original
                ? el.style.setProperty(prop, original)
                : el.style.removeProperty(prop);
            }
          });
        }
      };

      const [chart1, chart2] = await Promise.all([
        captureChart(chart1Ref),
        captureChart(chart2Ref),
      ]);

      const contentW = pageW - 2 * MARGIN;
      const subH = subLines.length * 5.5 + 10;
      const chartMaxH = pageH - HEADER_H - subH - 22 - 10;

      let y1 = HEADER_H + subH;
      doc.setFont(FONT, "bold");
      doc.setFontSize(10);
      doc.setTextColor(22, 70, 161);
      doc.text(chartTitle, MARGIN, y1 + 4);
      y1 += 7;

      if (chart1) {
        const chartH = Math.min(contentW * chart1.aspect, chartMaxH);
        doc.addImage(chart1.imgData, "PNG", MARGIN, y1, contentW, chartH, undefined, "FAST");
      }

      doc.addPage();
      const p2Top = HEADER_H + 6;
      const p2MaxH = pageH - p2Top - 22 - 10;
      doc.setFont(FONT, "bold");
      doc.setFontSize(10);
      doc.setTextColor(22, 70, 161);
      doc.text(progressiveTitle, MARGIN, p2Top + 4);

      if (chart2) {
        const chartH = Math.min(contentW * chart2.aspect, p2MaxH);
        doc.addImage(
          chart2.imgData,
          "PNG",
          MARGIN,
          p2Top + 7,
          contentW,
          chartH,
          undefined,
          "FAST",
        );
      }

      doc.addPage();
      autoTable(doc, {
        startY: HEADER_H + 8,
        ...buildAutoTableConfig(tableColumns, detailData, doc, FONT),
        tableWidth: "auto",
      });

      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        drawPageChrome(p, totalPages);
      }

      const excelCols = [
        { label: "Sr. No.", accessor: "sr" },
        { label: "Shift", accessor: "shift" },
        { label: "Line", accessor: "line" },
        { label: "Period", accessor: "period" },
        { label: "Target", accessor: "target" },
        { label: "Actual Production", accessor: "production" },
        { label: "Losses", accessor: "losses" },
        { label: "Line Capacity", accessor: "lineCapacity" },
      ];
      const { generateExcel } = await import("../../../../utils/ExcelUtils");

      await Promise.all([
        Promise.resolve().then(() => doc.save(`Annual_Production_${appliedFilters.year || "report"}.pdf`)),
        generateExcel(excelCols, detailData, `Annual_Production_${appliedFilters.year || "report"}`),
      ]);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [
    hasSearched,
    detailData,
    appliedFilters,
    selectedLineLabel,
    chartTitle,
    progressiveTitle,
  ]);

  return (
    <div className="space-y-4 p-4">
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
        {metaError && <p className="mb-2 text-sm text-red-500">{metaError}</p>}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <FilterBar
              config={filterConfig}
              filters={filters}
              onChange={handleFilterChange}
              withContainer={false}
            />
          </div>
          <div className="shrink-0 self-start lg:self-auto">
            <DateRangeBar
              onSearch={handleSearch}
              onDownload={handleDownload}
              showDownload
              showDateInputs={false}
              withContainer={false}
              isDownloading={isDownloading}
              reportName="Annual_Production"
            />
          </div>
        </div>
      </div>

      {!hasSearched ? (
        <SearchPromptState pageName="Annual Graph" />
      ) : (
        <>
          {dataError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {dataError}
            </div>
          )}

          <div
            ref={chart1Ref}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h2 className="mb-4 text-center text-lg font-semibold text-gray-900">
              {chartTitle}
            </h2>
            {isLoadingData ? (
              <ChartShimmer />
            ) : monthlyData.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center text-sm text-gray-400 sm:h-[320px] lg:h-[360px]">
                No data found for the selected filters.
              </div>
            ) : (
              <div className="h-[280px] w-full sm:h-[320px] lg:h-[360px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={monthlyData}
                    margin={{ top: 40, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="period"
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      interval={isMobile ? "preserveStartEnd" : 0}
                      angle={isMobile ? -20 : 0}
                      textAnchor={isMobile ? "end" : "middle"}
                      height={isMobile ? 48 : 30}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      wrapperStyle={{ fontSize: isMobile ? 11 : 12 }}
                    />
                    <Bar
                      dataKey="target"
                      fill="#7c3aed"
                      name="Target"
                      radius={[4, 4, 0, 0]}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="target"
                          content={renderTargetLabel}
                        />
                      )}
                    </Bar>
                    <Bar
                      dataKey="production"
                      fill="#10b981"
                      name="Production"
                      radius={[4, 4, 0, 0]}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="production"
                          content={renderProductionLabel}
                        />
                      )}
                    </Bar>
                    <Bar
                      dataKey="losses"
                      fill="#dc2626"
                      name="Losses"
                      radius={[4, 4, 0, 0]}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="losses"
                          content={renderLossesLabel}
                        />
                      )}
                    </Bar>
                    <Line
                      dataKey="lineCapacity"
                      stroke="#ff8c00"
                      strokeWidth={3}
                      name="Line Capacity"
                      dot={{ r: 4, fill: "#ff8c00", stroke: "#ff8c00" }}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="lineCapacity"
                          content={renderLineCapacityLabel}
                        />
                      )}
                    </Line>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div
            ref={chart2Ref}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h2 className="mb-4 text-center text-lg font-semibold text-gray-900">
              {progressiveTitle}
            </h2>
            {isLoadingData ? (
              <ChartShimmer />
            ) : progressiveData.length === 0 ? (
              <div className="flex h-[240px] items-center justify-center text-sm text-gray-400 sm:h-[270px] lg:h-[300px]">
                No data found for the selected filters.
              </div>
            ) : (
              <div className="h-[240px] w-full sm:h-[270px] lg:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressiveData}
                    margin={{ top: 40, right: 80, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis
                      width={
                        Math.max(
                          ...progressiveData.flatMap((d) => [
                            d.target,
                            d.production,
                            d.losses,
                          ]),
                        ) > 99999
                          ? 80
                          : 60
                      }
                    />
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      wrapperStyle={{ fontSize: isMobile ? 11 : 12 }}
                    />
                    <ReferenceLine
                      y={progressiveData[0]?.target || 0}
                      stroke="#000000"
                      strokeWidth={2}
                      strokeDasharray="6 3"
                      label={{
                        value: `Target: ${progressiveData[0]?.target || 0}`,
                        position: "insideTopRight",
                        fill: "#000000",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    />
                    <Bar
                      dataKey="target"
                      fill="#7c3aed"
                      name="Target"
                      radius={[4, 4, 0, 0]}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="target"
                          content={renderTargetLabel}
                        />
                      )}
                    </Bar>
                    <Bar
                      dataKey="production"
                      fill="#10b981"
                      name="Production"
                      radius={[4, 4, 0, 0]}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="production"
                          content={renderProductionLabel}
                        />
                      )}
                    </Bar>
                    <Bar
                      dataKey="losses"
                      fill="#dc2626"
                      name="Losses"
                      radius={[4, 4, 0, 0]}
                    >
                      {!isMobile && (
                        <LabelList
                          dataKey="losses"
                          content={renderLossesLabel}
                        />
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {isLoadingData ? (
            <TableShimmer rows={10} />
          ) : (
            <DataTable
              title="Annual Production Data"
              columns={tableColumns}
              data={detailData}
              defaultRows={10}
            />
          )}
        </>
      )}
    </div>
  );
}
