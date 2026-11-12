import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import {
  PDF_MARGIN,
  PDF_HEADER_H,
  loadKarlaFont,
  loadBrandingLogos,
  drawPdfPageChrome,
} from "./pdfUtils";
import { generateExcel } from "./excelUtils";

function flattenBottleneckData(chartData) {
  const rows = [];
  (chartData || []).forEach((line) => {
    (line.stations || []).forEach((station) => {
      (station.substations || []).forEach((sub) => {
        rows.push({
          line: line.name,
          station: station.name,
          equipment: sub.name,
          bni: sub.bni,
          severity: sub.severity,
        });
      });
      if (!station.substations || station.substations.length === 0) {
        rows.push({
          line: line.name,
          station: station.name,
          equipment: "-",
          bni: station.bni,
          severity: station.severity,
        });
      }
    });
  });
  return rows;
}

const COLUMNS = [
  { key: "sr", label: "Sr No.", accessor: "sr" },
  { key: "line", label: "Line", accessor: "line" },
  { key: "station", label: "Station", accessor: "station" },
  { key: "equipment", label: "Equipment", accessor: "equipment" },
  { key: "bni", label: "BNI", accessor: "bni" },
  { key: "severity", label: "Severity", accessor: "severity" },
];

function buildSubLines({
  areaLabel,
  lineLabel,
  stationLabel,
  startDate,
  endDate,
}) {
  const now = new Date();

  const defaultStart = new Date(now);
  defaultStart.setHours(6, 30, 0, 0);

  const from = startDate ? new Date(startDate) : defaultStart;
  const to = endDate ? new Date(endDate) : now;

  const formatDateTime = (d) => {
    if (!d || isNaN(new Date(d))) return "-";

    const date = new Date(d);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy} ${hh}:${mi}:${ss}`;
  };

  return [
    `Report Duration: ${formatDateTime(from)}  To  ${formatDateTime(to)}`,
    `Area: ${areaLabel || "All"} | Line: ${lineLabel || "All"} | Station: ${stationLabel}`,
  ];
}

const SUBLINE_PADDING_Y = 2;
const SUBLINE_LINE_H = 5.5;
function getSubLinesPanelHeight(subLines = []) {
  if (!subLines.length) return 0;
  return subLines.length * SUBLINE_LINE_H + SUBLINE_PADDING_Y * 2;
}

function getImageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

async function captureChartImage(chartNode) {
  console.log("[PDF] chartNode received:", chartNode);
  if (!chartNode) {
    console.warn(
      "[PDF] chartNode is null/undefined — ref not attached or chart not mounted yet",
    );
    return null;
  }

  await new Promise((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 1000));
  });

  const rect = chartNode.getBoundingClientRect();
  console.log("[PDF] chartNode bounding rect:", rect);
  if (rect.width === 0 || rect.height === 0) {
    console.warn("[PDF] chartNode has zero size — skipping capture");
    return null;
  }
  try {
    const dataUrl = await toPng(chartNode, {
      backgroundColor: "#ffffff",
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: false,
      width: Math.max(rect.width, 900),
      height: Math.max(rect.height, 520),
    });
    const { width, height } = await getImageDimensions(dataUrl);
    console.log("[PDF] captured image size:", width, height);
    if (!width || !height) {
      console.warn("[PDF] captured image has zero size");
      return null;
    }
    return { dataUrl, w: width, h: height };
  } catch (e) {
    console.error("[PDF] chart capture failed:", e);
    return null;
  }
}

/**
 * @param {Array} chartData
 * @param {Object} meta - areaLabel, lineLabel, stationLabel, startDate, endDate
 * @param {HTMLElement} chartNode - DOM node to screenshot (e.g. chartRef.current)
 * @param {string} [filename]
 */
export async function downloadBottleneckPdf(
  chartData,
  meta = {},
  chartNode = null,
  filename = "Bottleneck_Report",
) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const font = await loadKarlaFont(doc);
  const [jswImg, schaefflerImg] = await loadBrandingLogos();
  const chartImg = await captureChartImage(chartNode);

  const pageW = doc.internal.pageSize.getWidth();
  const subLines = buildSubLines(meta);
  const panelH = getSubLinesPanelHeight(subLines);
  const panelBottom = PDF_HEADER_H + 2 + panelH;

  let contentY = panelBottom + 4;

  if (chartImg) {
    const availW = pageW - 2 * PDF_MARGIN;
    const pageH = doc.internal.pageSize.getHeight();
    const aspectRatio = chartImg.h / chartImg.w;
    let imgW = availW;
    let imgH = imgW * aspectRatio;
    const FOOTER_RESERVE = 24;
    const maxAvailableH = pageH - contentY - FOOTER_RESERVE;
    if (imgH > maxAvailableH) {
      const shrink = maxAvailableH / imgH;
      imgH *= shrink;
      imgW *= shrink;
    }

    const imgX = PDF_MARGIN + (availW - imgW) / 2; // re-centers only if shrink happened
    const safeImgX = Number(imgX.toFixed(2));
    const safeContentY = Number(contentY.toFixed(2));
    const safeImgW = Number(imgW.toFixed(2));
    const safeImgH = Number(imgH.toFixed(2));

    const allFinite = [safeImgX, safeContentY, safeImgW, safeImgH].every(
      Number.isFinite,
    );

    if (allFinite && safeImgW > 0 && safeImgH > 0) {
      doc.addImage(
        chartImg.dataUrl,
        "PNG",
        safeImgX,
        safeContentY,
        safeImgW,
        safeImgH,
        undefined,
        "FAST",
      );
      contentY += safeImgH + 6;
    } else {
      console.warn("[PDF] skipping chart image — invalid computed placement", {
        safeImgX,
        safeContentY,
        safeImgW,
        safeImgH,
      });
    }
  }

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawPdfPageChrome(doc, {
      pageNum: i,
      totalPages,
      fontFamily: font,
      title: "Downtime Bottleneck Report",
      subLines: i === 1 ? subLines : [],
      jswImg,
      schaefflerImg,
    });
  }

  const safeFilePart = (val, fallback = "All") => {
    if (val === null || val === undefined || val === "") return fallback;
    return String(val).replace(/\s+/g, "_");
  };

  const formattedFileName = [
    filename,
    safeFilePart(meta.areaLabel),
    safeFilePart(meta.lineLabel),
    safeFilePart(meta.stationLabel),
    safeFilePart(meta.startDate, ""),
    safeFilePart(meta.endDate, ""),
  ]
    .filter(Boolean)
    .join("_");

  doc.save(`${formattedFileName}.pdf`);
}

export function downloadBottleneckExcel(
  chartData,
  filename = "Bottleneck_Report",
) {
  const rows = flattenBottleneckData(chartData).map((row, i) => ({
    ...row,
    sr: i + 1,
  }));
  generateExcel(COLUMNS, rows, filename);
}