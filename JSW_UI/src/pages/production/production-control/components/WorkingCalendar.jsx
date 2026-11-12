import { useState, useMemo, useEffect, useRef } from "react";
import { Search, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { drawPdfPageChrome, loadBrandingLogos, loadKarlaFont, PDF_DARK_HEAD_STYLES, PDF_TABLE_STYLES, PDF_ALT_ROW_STYLES } from "../../../../utils/PdfUtils";
import { generateExcel } from "../../../../utils/ExcelUtils";
import { masterApi } from "../../../../services/api.js";
import { formatClusterName } from "../../../../utils/Formatters.js";
import { useBackgroundExport } from "../../../../context/BackgroundExportContext";
import FilterBar from "../../../../sharedComponents/FilterBar";
import DateRangeBar from "../../../../sharedComponents/DateRangeBar";
import { TableShimmer } from "../../../../sharedComponents/Shimmer";
import DataTable from "../../../../sharedComponents/DataTable";

const DAYS = [
  { name: "Monday", number: "1" },
  { name: "Tuesday", number: "2" },
  { name: "Wednesday", number: "3" },
  { name: "Thursday", number: "4" },
  { name: "Friday", number: "5" },
  { name: "Saturday", number: "6" },
  { name: "Sunday", number: "0" },
];
const SHIFTS = ["S.1", "S.2", "S.3"];


const DEFAULT_PATTERN = ["W", "W", "W", "W", "W", "X", "X", "W", "W", "W", "W", "W", "W", "X", "W", "W", "W", "W", "W", "X", "-", "-"];

function applyWeekOffset(pattern, weekNum) {
  const offset = ((parseInt(weekNum, 10) - 1) * 2) % pattern.length;
  return [...pattern.slice(offset), ...pattern.slice(0, offset)];
}


function generateTableData(clusters, week) {
  const rows = [];
  let id = 0;
  clusters.forEach((cluster) => {
    const clusterLabel = formatClusterName(cluster.ClusterName);
    (cluster.Lines ?? []).forEach((line) => {
      const pattern = applyWeekOffset(DEFAULT_PATTERN, week);
      const row = {
        id: String(id++),
        cluster: clusterLabel,
        actualLineName: line.LineName,
        _clusterId: cluster.ClusterId,
        _lineId: line.LineId,
      };
      let pi = 0;
      DAYS.forEach((day) => {
        SHIFTS.forEach((shift) => {
          row[`${day.name}${day.number}_${shift}`] = pattern[pi] ?? "W";
          pi++;
        });
      });
      rows.push(row);
    });
  });
  return rows;
}

const toOptions = (arr) => arr.map((v) => ({ label: v, value: v }));
const START_YEAR = 2022;
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = toOptions(
  Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => String(START_YEAR + i))
);

const MONTH_OPTIONS = toOptions([
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]);

const WEEK_OPTIONS = [1, 2, 3, 4, 5].map((w) => ({ label: `Week ${w}`, value: String(w) }));


function ShiftBadge({ val }) {
  if (val === "W")
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold bg-green-50 border border-green-200 text-green-700">
        W
      </span>
    );
  if (val === "X")
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold bg-red-50 border border-red-200 text-red-700">
        X
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] bg-slate-100 border border-slate-200 text-slate-400">
      —
    </span>
  );
}


function buildColumns() {
  const cols = [
    {
      key: "cluster",
      label: "Cluster",
      accessor: "cluster",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-sky-700">{row.cluster}</span>
      ),
    },
    {
      key: "actualLineName",
      label: "Lines",
      accessor: "actualLineName",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-slate-700">{row.actualLineName}</span>
      ),
    },
  ];
  DAYS.forEach((day) => {
    SHIFTS.forEach((shift) => {
      const key = `${day.name}${day.number}_${shift}`;
      cols.push({
        key,
        label: shift,
        accessor: key,
        group: day.name,
        sortable: false,
        render: (row) => <ShiftBadge val={row[key]} />,
      });
    });
  });
  return cols;
}

const COLUMN_GROUPS = DAYS.map((day) => ({ label: day.name, span: SHIFTS.length }));
const COLUMNS = buildColumns();

function buildExcelColumns() {
  const cols = [
    { label: "Cluster", accessor: "cluster" },
    { label: "Actual Line Name", accessor: "actualLineName" },
  ];
  DAYS.forEach((day) => {
    SHIFTS.forEach((shift) => {
      cols.push({
        label: `${day.name} ${shift}`,
        accessor: `${day.name}${day.number}_${shift}`,
      });
    });
  });
  return cols;
}


async function exportPdf(calTitle, filters, filteredData) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const [fontFamily, [jswImg, schaefflerImg]] = await Promise.all([
    loadKarlaFont(doc),
    loadBrandingLogos(),
  ]);
  const { default: autoTable } = await import("jspdf-autotable");

  const MARGIN = 14;
  const HEADER_H = 40;
  const FOOTER_H = 18;
  const START_Y = HEADER_H + 26;

  const subLines = [
    `Area: ${filters.plant}`,
    `Period: ${filters.month} ${filters.year} — Week ${filters.week}`,
  ];

  // Column widths 
  const CLUSTER_W = 26;
  const LINE_W = 20;
  const usableW = pageW - MARGIN * 2 - CLUSTER_W - LINE_W;
  const shiftColW = usableW / (DAYS.length * SHIFTS.length);

  const columnStyles = {
    0: { cellWidth: CLUSTER_W },
    1: { cellWidth: LINE_W },
  };
  DAYS.forEach((_, di) => {
    SHIFTS.forEach((__, si) => {
      columnStyles[2 + di * SHIFTS.length + si] = { cellWidth: shiftColW };
    });
  });

 
  const DAY_HEAD = { halign: "center", valign: "middle", fillColor: [26, 58, 110], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 7 };
  const SHIFT_HEAD = { ...PDF_DARK_HEAD_STYLES, fontSize: 6.5 };
  const FIXED_HEAD = { ...PDF_DARK_HEAD_STYLES, valign: "middle", halign: "center" };

  const headRow1 = [
    { content: "Cluster", rowSpan: 2, styles: FIXED_HEAD },
    { content: "Line", rowSpan: 2, styles: FIXED_HEAD },
    ...DAYS.map((d) => ({ content: d.name, colSpan: SHIFTS.length, styles: DAY_HEAD })),
  ];

  const headRow2 = DAYS.flatMap(() =>
    SHIFTS.map((s) => ({ content: s, styles: SHIFT_HEAD }))
  );

  const head = [headRow1, headRow2];


  const body = filteredData.map((row) => [
    row.cluster,
    row.actualLineName,
    ...DAYS.flatMap((d) => SHIFTS.map((s) => row[`${d.name}${d.number}_${s}`] ?? "")),
  ]);

  autoTable(doc, {
    head,
    body,
    startY: START_Y,
    margin: { left: MARGIN, right: MARGIN, bottom: FOOTER_H + 4 },
    styles: { ...PDF_TABLE_STYLES, font: fontFamily },
    headStyles: { ...PDF_DARK_HEAD_STYLES, font: fontFamily },
    columnStyles,
    alternateRowStyles: PDF_ALT_ROW_STYLES,
    didParseCell(data) {
      
      if (data.section === "body" && data.column.index === 0) {
        data.cell.styles.textColor = [2, 132, 199];
        data.cell.styles.fontStyle = "bold";
        return;
      }
      if (data.section === "body" && data.column.index === 1) {
        data.cell.styles.textColor = [51, 65, 85];
        data.cell.styles.fontStyle = "bold";
        return;
      }
     
      if (data.section === "body" && data.column.index >= 2) {
        const v = data.cell.raw;
        if (v === "W") {
          data.cell.styles.fillColor = [240, 253, 244];
          data.cell.styles.textColor = [21, 128, 61];
          data.cell.styles.fontStyle = "bold";
        } else if (v === "X") {
          data.cell.styles.fillColor = [254, 242, 242];
          data.cell.styles.textColor = [185, 28, 28];
          data.cell.styles.fontStyle = "bold";
        } else {
          data.cell.styles.textColor = [156, 163, 175];
        }
      }
    },
    didDrawPage(data) {
      drawPdfPageChrome(doc, {
        pageNum: data.pageNumber,
        totalPages: doc.internal.getNumberOfPages(),
        fontFamily,
        title: calTitle,
        subLines: data.pageNumber === 1 ? subLines : [],
        jswImg,
        schaefflerImg,
      });
    },
  });

 
  const total = doc.internal.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    drawPdfPageChrome(doc, {
      pageNum: p,
      totalPages: total,
      fontFamily,
      title: calTitle,
      subLines: p === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }

  doc.save(`${calTitle.replace(/[\s—]+/g, "_")}.pdf`);
}


function LoadingState() {
  return <TableShimmer />;
}


const WorkingCalendar = ({ backgroundMode = false, backgroundDateRange = null }) => {
  const bgContext = useBackgroundExport();
  const isBg = Boolean(backgroundMode || bgContext?.isBackground);

  const [masterClusters, setMasterClusters] = useState([]);
  const [masterLoading, setMasterLoading] = useState(true);

  const [filters, setFilters] = useState({
    area: "",          
    year: String(CURRENT_YEAR),
    month: "January",
    week: "1",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [downloading, setDownloading] = useState(false);


  useEffect(() => {
    const load = async () => {
      try {
        const res = await masterApi.getMasterData();
        const clusters = res.data ?? [];
        setMasterClusters(clusters);
        if (clusters.length > 0) {
          setFilters((prev) => ({
            ...prev,
            area: String(clusters[0].ClusterId),
          }));
        }
      } catch (err) {
        console.error("Master data fetch failed:", err);
      } finally {
        setMasterLoading(false);
      }
    };
    load();
  }, []);

  
  const plantOptions = useMemo(
    () =>
      masterClusters.map((c) => ({
        label: formatClusterName(c.ClusterName),
        value: String(c.ClusterId),
      })),
    [masterClusters]
  );

 
  const FILTER_BAR_CONFIG = useMemo(
    () => [
      { key: "area", label: "Area", type: "select", options: plantOptions },
      { key: "year", label: "Year", type: "select", options: YEAR_OPTIONS },
      { key: "month", label: "Month", type: "select", options: MONTH_OPTIONS },
      { key: "week", label: "Week", type: "select", options: WEEK_OPTIONS },
    ],
    [plantOptions]
  );

 
  const selectedCluster = useMemo(
    () => masterClusters.find((c) => String(c.ClusterId) === filters.area) ?? null,
    [masterClusters, filters.area]
  );


  const tableData = useMemo(() => {
    if (!selectedCluster) return [];
    return generateTableData([selectedCluster], filters.week);
  }, [selectedCluster, filters.week]);

  
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return tableData;
    const q = searchTerm.toLowerCase();
    return tableData.filter(
      (r) =>
        r.cluster.toLowerCase().includes(q) ||
        r.actualLineName.toLowerCase().includes(q)
    );
  }, [tableData, searchTerm]);

  const areaLabel =
    plantOptions.find((o) => o.value === filters.area)?.label ?? filters.area;

  const calTitle = `Working Calendar — ${areaLabel} — ${filters.month} ${filters.year} (Week ${filters.week})`;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await exportPdf(calTitle, { ...filters, plant: areaLabel }, filteredData);
      generateExcel(buildExcelColumns(), filteredData, "Working_Calendar");
    } catch (err) {
      console.error("Download error:", err);
      if (!isBg) {
        alert("Error generating report.");
      }
    } finally {
      setDownloading(false);
    }
  };

  const bgDownloadDoneRef = useRef(false);
  useEffect(() => {
    if (!isBg || bgDownloadDoneRef.current || downloading || masterLoading) return;
    bgDownloadDoneRef.current = true;
    const t = setTimeout(() => {
      handleDownload();
    }, 1200);
    return () => clearTimeout(t);
  }, [isBg, downloading, masterLoading]);

  if (masterLoading) return <LoadingState />;

  return (
    <div className="w-full min-h-screen space-y-3 sm:space-y-4 bg-gray-50 p-2 sm:p-4">

     
      <FilterBar
        config={FILTER_BAR_CONFIG}
        filters={filters}
        onChange={(f) => {
          if (f.area !== filters.area) setSearchTerm("");
          setFilters(f);
        }}
        withContainer={true}
      />

   
      <DateRangeBar
        showDateInputs={false}
        showSearchButton={false}
        showSearch={true}
        searchLabel="Search"
        searchPlaceholder="Search by cluster or line…"
        searchValue={searchTerm}
        onSearchValueChange={setSearchTerm}
        showDownload={true}
        showEmail={true}
        onDownload={handleDownload}
        isDownloading={downloading}
        reportName="Working_Calendar"
      />
      
      <div className="w-full">
        <DataTable
          columns={COLUMNS}
          data={filteredData}
          columnGroups={COLUMN_GROUPS}
          title="Working Calendar"
          defaultRows={100}
          hidePagination={true}
        />
      </div>

     
      <div
        className="flex flex-wrap gap-3 sm:gap-6 items-center justify-center px-3 sm:px-4 py-3 rounded-lg shadow-sm"
        style={{ background: "#E0F2FE", borderColor: "#7EC8E3" }}
      >
        {[
          { val: "W", bg: "#F0FDF4", border: "#BBF7D0", color: "#15803D", label: "Working" },
          { val: "X", bg: "#FFF0F0", border: "#FECACA", color: "#C53030", label: "Off" },
          { val: "—", bg: "#F1F5F9", border: "#E2E8F0", color: "#94A3B8", label: "Not Scheduled" },
        ].map(({ val, bg, border, color, label }) => (
          <div key={val} className="flex items-center gap-2 text-xs font-medium text-[#0C4A6E]">
            <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-[10px]" style={{ background: bg, border: `1px solid ${border}`, color }}>
              {val}
            </span>
            {label}
          </div>
        ))}
      </div>

    </div>
  );
};

export default WorkingCalendar;
