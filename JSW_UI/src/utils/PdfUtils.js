import jswLogo from "../assets/jsw-logo.png";
import schaefflerLogo from "../assets/schaeffler.png";

// ─────────────────────────────────────────────────────────────────────────────
// Centralised PDF table design tokens — import these in every report so all
// exported PDFs share identical colours, sizes and spacing.
// ─────────────────────────────────────────────────────────────────────────────

export const PDF_MARGIN = 14;
export const PDF_HEADER_H = 40;

/** Standard body-cell styles. Merge `font` from the caller. */
export const PDF_TABLE_STYLES = {
  fontSize: 8,
  cellPadding: 2.5,
  halign: "center",
  valign: "middle",
  lineColor: [226, 232, 240], // border-slate-200  — matches UI DataTable cell border
  lineWidth: 0.2,
  textColor: [51, 65, 85], // text-slate-700    — matches UI DataTable default cell text
};

/** Standard header-row styles — sky-200 fill, sky-800 text. Merge `font` from the caller. */
export const PDF_HEAD_STYLES = {
  fillColor: [186, 230, 253], // bg-sky-200        — matches UI DataTable thead background
  textColor: [7, 89, 133], // text-sky-800      — matches UI DataTable thead text
  fontStyle: "bold",
  fontSize: 9,
  halign: "center",
  valign: "middle",
  lineColor: [125, 211, 252], // border-sky-300    — matches UI DataTable thead border
  lineWidth: 0.2,
};

/**
 * Dark header-row styles — steel-blue fill, white text.
 * Use for reports whose UI header is the darker blue (e.g. Production Overview).
 */
export const PDF_DARK_HEAD_STYLES = {
  fillColor: [102, 165, 202],
  textColor: [255, 255, 255],
  fontStyle: "bold",
  fontSize: 9,
  halign: "center",
  valign: "middle",
};

/** Standard zebra-stripe styles (same everywhere). */
export const PDF_ALT_ROW_STYLES = { fillColor: [248, 250, 252] }; // bg-slate-50 — matches UI DataTable even-row background

/** Standard autoTable margin (left/right/bottom fixed; top = HEADER_H + 8). */
export const PDF_TABLE_MARGIN = {
  left: PDF_MARGIN,
  right: PDF_MARGIN,
  top: PDF_HEADER_H + 8,
  bottom: 22,
};

/**
 * Returns a ready-to-spread autoTable options object with the standard styles.
 * @param {string} font — value returned by loadKarlaFont()
 */
export function getPdfTableStyles(font) {
  return {
    styles: { ...PDF_TABLE_STYLES, font },
    headStyles: { ...PDF_HEAD_STYLES, font },
    alternateRowStyles: PDF_ALT_ROW_STYLES,
    margin: PDF_TABLE_MARGIN,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shift badge colours (A / B / C)
// ─────────────────────────────────────────────────────────────────────────────
export const SHIFT_COLORS = {
  A: { fill: [232, 236, 250], text: [39, 68, 160], border: [195, 203, 240] },  // #e8ecfa / #2744A0 / #c3cbf0
  B: { fill: [219, 234, 254], text: [59, 130, 246], border: [191, 219, 254] }, // #dbeafe / #3b82f6 / #bfdbfe
  C: { fill: [209, 250, 229], text: [16, 185, 129], border: [167, 243, 208] }, // #d1fae5 / #10b981 / #a7f3d0
};

/**
 * Draws a coloured shift badge inside a jsPDF-AutoTable cell.
 * Call from didDrawCell when hookData.column.index === <shift col>.
 *
 * @param {import("jspdf").jsPDF} doc
 * @param {{ x:number, y:number, width:number, height:number }} cell
 * @param {string} shiftVal  — "A" | "B" | "C"
 * @param {string} font      — value returned by loadKarlaFont()
 */
export function drawShiftBadge(doc, cell, shiftVal, font) {
  try {
    const c = SHIFT_COLORS[shiftVal] || SHIFT_COLORS.A;
    const sz = 6;
    const bx = cell.x + (cell.width - sz) / 2;
    const by = cell.y + (cell.height - sz) / 2;
    doc.setFillColor(...c.fill);
    doc.setDrawColor(...c.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, by, sz, sz, 1, 1, "FD");
    doc.setFont(font, "bold");
    doc.setFontSize(7);
    doc.setTextColor(...c.text);
    doc.text(shiftVal, bx + sz / 2, by + sz * 0.72, { align: "center" });
  } catch (e) {
    console.warn("[PDF] drawShiftBadge:", e.message);
  }
}

/**
 * Draws the actual-production value + a ▲/▼ delta pill inside a cell.
 * Call from didDrawCell when hookData.column.index === <actual col>.
 *
 * @param {import("jspdf").jsPDF} doc
 * @param {{ x:number, y:number, width:number, height:number }} cell
 * @param {number} actual
 * @param {number} target
 * @param {string} font
 */
export function drawActualProdBadge(doc, cell, actual, target, font) {
  try {
    if (isNaN(actual)) return;
    const below = !isNaN(target) && actual < target;
    const delta = !isNaN(target) ? Math.abs(actual - target) : 0;
    const mainColor = below ? [220, 38, 38] : [5, 150, 105];
    const midY = cell.y + cell.height / 2;

    doc.setFont(font, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...mainColor);

    if (delta > 0) {
      const numText = String(actual);
      const deltaText = (below ? "-" : "+") + delta;
      doc.setFontSize(6);
      const pillW =
        (() => {
          try {
            return doc.getTextWidth(deltaText);
          } catch (_) {
            return deltaText.length * 1.8;
          }
        })() + 3;
      const pillH = 3.5;
      doc.setFontSize(8);
      const numW = (() => {
        try {
          return doc.getTextWidth(numText);
        } catch (_) {
          return numText.length * 2.2;
        }
      })();
      const gap = 1.5;
      const startX = cell.x + (cell.width - numW - gap - pillW) / 2;
      doc.text(numText, startX + numW / 2, midY + 1.2, { align: "center" });
      const pillX = startX + numW + gap;
      const pillY = midY - pillH / 2;
      doc.setFillColor(...(below ? [254, 226, 226] : [209, 250, 229]));
      doc.setDrawColor(...(below ? [252, 165, 165] : [110, 231, 183]));
      doc.setLineWidth(0.2);
      doc.roundedRect(pillX, pillY, pillW, pillH, 0.8, 0.8, "FD");
      doc.setFont(font, "bold");
      doc.setFontSize(6);
      doc.setTextColor(...mainColor);
      doc.text(deltaText, pillX + pillW / 2, pillY + pillH * 0.72, {
        align: "center",
      });
    } else {
      doc.text(String(actual), cell.x + cell.width / 2, midY + 1.2, {
        align: "center",
      });
    }
  } catch (e) {
    console.warn("[PDF] drawActualProdBadge:", e.message);
  }
}

/**
 * Draws the actual cycle-time value + a ▲/▼ delta pill inside a cell.
 * Green when actual ≤ design CT (good), red when actual > design CT (exceeded).
 * Call from didDrawCell when hookData.column.index === <actual CT col>.
 *
 * @param {import("jspdf").jsPDF} doc
 * @param {{ x:number, y:number, width:number, height:number }} cell
 * @param {number} actual
 * @param {number} design
 * @param {string} font
 */
export function drawCycleTimeBadge(doc, cell, actual, design, font) {
  try {
    if (isNaN(actual)) return;
    const exceeded = !isNaN(design) && actual > design;
    const delta = !isNaN(design) ? Math.abs(actual - design) : 0;
    const mainColor = exceeded ? [220, 38, 38] : [5, 150, 105];
    const midY = cell.y + cell.height / 2;

    doc.setFont(font, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...mainColor);

    if (delta > 0) {
      const numText = String(actual);
      const deltaText = (exceeded ? "+" : "-") + delta;
      doc.setFontSize(6);
      const pillW =
        (() => {
          try {
            return doc.getTextWidth(deltaText);
          } catch (_) {
            return deltaText.length * 1.8;
          }
        })() + 3;
      const pillH = 3.5;
      doc.setFontSize(8);
      const numW = (() => {
        try {
          return doc.getTextWidth(numText);
        } catch (_) {
          return numText.length * 2.2;
        }
      })();
      const gap = 1.5;
      const startX = cell.x + (cell.width - numW - gap - pillW) / 2;
      doc.text(numText, startX + numW / 2, midY + 1.2, { align: "center" });
      const pillX = startX + numW + gap;
      const pillY = midY - pillH / 2;
      doc.setFillColor(...(exceeded ? [254, 226, 226] : [209, 250, 229]));
      doc.setDrawColor(...(exceeded ? [252, 165, 165] : [110, 231, 183]));
      doc.setLineWidth(0.2);
      doc.roundedRect(pillX, pillY, pillW, pillH, 0.8, 0.8, "FD");
      doc.setFont(font, "bold");
      doc.setFontSize(6);
      doc.setTextColor(...mainColor);
      doc.text(deltaText, pillX + pillW / 2, pillY + pillH * 0.72, {
        align: "center",
      });
    } else {
      doc.text(String(actual), cell.x + cell.width / 2, midY + 1.2, {
        align: "center",
      });
    }
  } catch (e) {
    console.warn("[PDF] drawCycleTimeBadge:", e.message);
  }
}

/**
 * Converts a UI DataTable column config + data array into a ready-to-spread
 * jsPDF-autoTable options object (head + body + styles + cell hooks).
 *
 * Column config extensions recognised by this function:
 *   type "shift"     → drawShiftBadge
 *   type "actual"    + targetKey → drawActualProdBadge (below target = red)
 *   type "cycleTime" + targetKey → drawCycleTimeBadge  (above design  = red)
 *   type "primary"   → sky-700 bold text
 *   key  "sr"        → auto-numbered 1…n, slate-500 text
 *   pdfValue(item)   → optional formatter for PDF-only cell value
 *
 * Any column with a `render` prop (UI-only) that has no `type` falls back to item[col.key].
 * Pass report-specific options (didDrawPage, columnStyles, tableWidth, etc.) directly
 * on the autoTable call after spreading the result of this function.
 *
 * @param {Array<{key,label,type?,targetKey?,pdfValue?,render?}>} columns
 * @param {Array<object>}  data
 * @param {import("jspdf").jsPDF} doc
 * @param {string} font — value returned by loadKarlaFont()
 */
export function buildAutoTableConfig(columns, data, doc, font) {
  // ── head ─────────────────────────────────────────────────────────────────
  const head = [columns.map((col) => col.label.toUpperCase())];

  // ── body ─────────────────────────────────────────────────────────────────
  const body = data.map((item, rowIdx) =>
    columns.map((col) => {
      if (col.key === "sr") return rowIdx + 1;
      if (col.pdfValue) return col.pdfValue(item);
      return item[col.key] ?? "";
    }),
  );

  // ── index sets for O(1) lookup in hooks ───────────────────────────────────
  const shiftCols = new Set();
  const actualCols = new Set();
  const ctCols = new Set();
  const primaryCols = new Set();
  const srCols = new Set();

  columns.forEach((col, i) => {
    if (col.key === "sr") srCols.add(i);
    if (col.type === "shift") shiftCols.add(i);
    if (col.type === "actual") actualCols.add(i);
    if (col.type === "cycleTime") ctCols.add(i);
    if (col.type === "primary") primaryCols.add(i);
  });

  // ── hooks ─────────────────────────────────────────────────────────────────
  const didParseCell = (hookData) => {
    if (hookData.section !== "body") return;
    const col = hookData.column.index;
    if (srCols.has(col)) hookData.cell.styles.textColor = [100, 116, 139];
    if (primaryCols.has(col)) {
      hookData.cell.styles.textColor = [3, 105, 161];
      hookData.cell.styles.fontStyle = "bold";
    }
    if (shiftCols.has(col) || actualCols.has(col) || ctCols.has(col)) {
      hookData.cell.text = [" "];
    }
  };

  const didDrawCell = (hookData) => {
    if (hookData.section !== "body") return;
    const col = hookData.column.index;
    const cell = hookData.cell;
    const colDef = columns[col];
    const rowItem = data[hookData.row.index];

    if (shiftCols.has(col)) {
      drawShiftBadge(doc, cell, String(hookData.row.raw[col]), font);
    }
    if (actualCols.has(col) && rowItem) {
      const target = colDef.targetKey ? Number(rowItem[colDef.targetKey]) : 0;
      drawActualProdBadge(
        doc,
        cell,
        Number(hookData.row.raw[col]),
        target,
        font,
      );
    }
    if (ctCols.has(col) && rowItem) {
      const design = colDef.targetKey ? Number(rowItem[colDef.targetKey]) : 0;
      drawCycleTimeBadge(
        doc,
        cell,
        Number(hookData.row.raw[col]),
        design,
        font,
      );
    }
  };

  return {
    head,
    body,
    ...getPdfTableStyles(font),
    didParseCell,
    didDrawCell,
  };
}

// ── Karla font loader ─────────────────────────────────────────────────────────
// Fetches Karla TTF from local public/fonts directory and registers it with
// jsPDF. Result is cached so subsequent PDFs reuse it.
let _karlaCache = null;

export async function loadKarlaFont(doc) {
  try {
    if (!_karlaCache) {
      const toBase64 = (buf) => {
        const bytes = new Uint8Array(buf);
        let binary = "";
        const chunk = 8192;
        for (let i = 0; i < bytes.length; i += chunk) {
          binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
        }
        return btoa(binary);
      };
      const [rBuf, bBuf] = await Promise.all([
        fetch("/fonts/Karla-Regular.ttf").then((r) => r.arrayBuffer()),
        fetch("/fonts/Karla-Bold.ttf").then((r) => r.arrayBuffer()),
      ]);
      _karlaCache = { regular: toBase64(rBuf), bold: toBase64(bBuf) };
    }
    doc.addFileToVFS("Karla-Regular.ttf", _karlaCache.regular);
    doc.addFont("Karla-Regular.ttf", "Karla", "normal");
    // Verify the font is actually usable (jsPDF swallows cmap errors via PubSub)
    doc.setFont("Karla", "normal");
    doc.setFontSize(10);
    // Check metadata directly — if jsPDF couldn't parse the TTF, metadata will be missing
    const _meta = doc.internal.getFont().metadata;
    if (!_meta || !_meta.Unicode)
      throw new Error("Karla font metadata missing — TTF parse failed");
    doc.getTextWidth("test"); // secondary check: throws if metrics are broken
    // Font is good — register regular as bold fallback, then try actual bold
    doc.addFont("Karla-Regular.ttf", "Karla", "bold");
    try {
      doc.addFileToVFS("Karla-Bold.ttf", _karlaCache.bold);
      doc.addFont("Karla-Bold.ttf", "Karla", "bold");
      doc.setFont("Karla", "bold");
      doc.getTextWidth("test"); // verify bold too
    } catch (_) {
      /* keep regular-as-bold fallback */
    }
    return "Karla";
  } catch (e) {
    console.warn("Karla font unavailable for PDF, using helvetica:", e);
    return "helvetica";
  }
}

/**
 * Loads an image src into a canvas and returns { dataUrl, w, h }.
 * Resolves to null on error.
 */
export function loadImageAsBase64(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const cvs = document.createElement("canvas");
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      cvs.getContext("2d").drawImage(img, 0, 0);
      resolve({
        dataUrl: cvs.toDataURL("image/png"),
        w: img.naturalWidth,
        h: img.naturalHeight,
      });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Loads the JSW and Schaeffler logos as base64.
 * Returns [jswImg, schaefflerImg] where each is { dataUrl, w, h } | null.
 */
export function loadBrandingLogos() {
  return Promise.all([
    loadImageAsBase64(jswLogo),
    loadImageAsBase64(schaefflerLogo),
  ]);
}

/**
 * Draws the standard JSW Motors header and footer chrome on the current page.
 *
 * @param {import("jspdf").jsPDF} doc
 * @param {{
 *   pageNum: number,
 *   totalPages: number,
 *   fontFamily: string,
 *   title: string,
 *   subLines?: string[],   // lines printed below the header divider on page 1
 *   jswImg: {dataUrl:string,w:number,h:number}|null,
 * }} options
 */
export function drawPdfPageChrome(
  doc,
  {
    pageNum,
    totalPages,
    fontFamily,
    title,
    subLines = [],
    jswImg,
    schaefflerImg,
  },
) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const MARGIN = 14;
  const HEADER_H = 40;
  const FOOTER_Y = pageH - 8;
  const FOOTER_LOGO_H = 8;
  const JSW_H = 35;
  const JSW_Y = (HEADER_H - JSW_H) / 2;
  const JSW_W = jswImg ? JSW_H * (jswImg.w / jswImg.h) : 35;
  const JSW_X = MARGIN;

  // ── Header — white background matching app navbar/card style ──────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageW, HEADER_H, "F");

  // Top border: sky-200 (matches filter-panel border colour)
  doc.setFillColor(186, 230, 253);
  doc.rect(0, 0, pageW, 1, "F");

  // Bottom accent strip: matches table header fill #66A5CA
  doc.setFillColor(102, 165, 202);
  doc.rect(0, HEADER_H - 2, pageW, 2, "F");

  // JSW logo (white header bg blends naturally with logo's white bg)
  if (jswImg) {
    doc.addImage(jswImg.dataUrl, "PNG", JSW_X, JSW_Y, JSW_W, JSW_H);
  } else {
    doc.setFillColor(22, 70, 161);
    doc.roundedRect(JSW_X, JSW_Y, 44, JSW_H, 2, 2, "F");
    doc.setFont(fontFamily, "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("JSW MOTORS", JSW_X + 22, JSW_Y + JSW_H / 2 + 1.5, {
      align: "center",
    });
  }

  // Title: JSW brand blue #1646A1, bold, vertically centred above accent strip
  doc.setFont(fontFamily, "bold");
  doc.setFontSize(16);
  doc.setTextColor(22, 70, 161);
  doc.text(title, pageW / 2, (HEADER_H - 2) / 2 + 3, { align: "center" });

  // Sub-lines on page 1 — styled panel matching the UI filter panel
  if (pageNum === 1 && subLines.length > 0) {
    const PADDING_X = 4;
    const PADDING_Y = 2;
    const LINE_H = 5.5;
    const panelH = subLines.length * LINE_H + PADDING_Y * 2;
    const panelY = HEADER_H + 2;
    const panelW = pageW - 2 * MARGIN;

    // Panel background: sky-50 fill with sky-200 border
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, panelY, panelW, panelH, 2, 2, "FD");

    doc.setFontSize(8);
    subLines.forEach((line, i) => {
      const y = panelY + PADDING_Y + LINE_H * i + LINE_H * 0.7;
      const colonIdx = line.indexOf(":");
      if (colonIdx > -1) {
        const label = line.slice(0, colonIdx + 1);
        const value = line.slice(colonIdx + 1).trim();
        doc.setFont(fontFamily, "bold");
        doc.setTextColor(12, 74, 110);
        doc.text(label, MARGIN + PADDING_X, y);
        const labelW = doc.getTextWidth(label);
        doc.setFont(fontFamily, "normal");
        doc.setTextColor(55, 65, 81);
        doc.text(value, MARGIN + PADDING_X + labelW + 2, y);
      } else {
        doc.setFont(fontFamily, "normal");
        doc.setTextColor(55, 65, 81);
        doc.text(line, MARGIN + PADDING_X, y);
      }
    });
  }

  // Footer divider — sits 3mm above the logo top
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(
    0,
    FOOTER_Y - FOOTER_LOGO_H - 3,
    pageW,
    FOOTER_Y - FOOTER_LOGO_H - 3,
  );

  // Printed on + page number
  const now = new Date();
  const printedOn = `Printed on : ${now.toLocaleDateString("en-IN")} ${now.toLocaleTimeString("en-IN")}`;
  doc.setFont(fontFamily, "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(printedOn, MARGIN, FOOTER_Y);
  doc.text(`Page No. ${pageNum} / ${totalPages}`, pageW / 2, FOOTER_Y, {
    align: "center",
  });

  // Footer: Schaeffler logo + copyright text — vertically centred on the same row
  const COPYRIGHT_TEXT =
    "\u00A9 2026. Generated using NetPositive \u00A9. All rights reserved.";
  doc.setFont(fontFamily, "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  const textW = doc.getTextWidth(COPYRIGHT_TEXT);
  const GAP = 2;
  if (schaefflerImg) {
    const logoW = FOOTER_LOGO_H * (schaefflerImg.w / schaefflerImg.h);
    const blockRight = pageW - MARGIN;
    const blockLeft = blockRight - logoW - GAP - textW;
    // Centre logo and text on the same mid-line
    const midY = FOOTER_Y - 2.5;
    const logoY = midY - FOOTER_LOGO_H / 2;
    const textY = midY + 1.5;
    doc.addImage(
      schaefflerImg.dataUrl,
      "PNG",
      blockLeft,
      logoY,
      logoW,
      FOOTER_LOGO_H,
    );
    doc.text(COPYRIGHT_TEXT, blockLeft + logoW + GAP, textY);
  } else {
    doc.text("Schaeffler" + COPYRIGHT_TEXT, pageW - MARGIN, FOOTER_Y, {
      align: "right",
    });
  }
}
