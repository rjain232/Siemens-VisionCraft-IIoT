import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { cacheReportFile } from "./reportExportCache";
import { isBackgroundExportActive, recordCapturedFile } from "./backgroundExportInterceptor";

export const saveExcel = (excelBuffer, filename) => {
  const normalizedFilename = filename.endsWith(".xlsx")
    ? filename.replace(/\s+/g, "_")
    : `${filename.replace(/\s+/g, "_")}.xlsx`;
  const fileBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  try {
    cacheReportFile(normalizedFilename, fileBlob);
  } catch (e) {
    console.warn("Could not cache Excel file:", e);
  }
  if (isBackgroundExportActive()) {
    recordCapturedFile(normalizedFilename, fileBlob);
    return;
  }
  saveAs(fileBlob, normalizedFilename);
};

export const generateExcel = (headers, rows, filename) => {
  const columnHeaders = headers.map((header) => header.label);
  const dataRows = rows.map((row) =>
    headers.map((header) => row[header.accessor] || ""),
  );
  const worksheet = XLSX.utils.aoa_to_sheet([columnHeaders, ...dataRows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename.slice(0, 31));
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveExcel(excelBuffer, filename);
};

export const generateExcelWithGroupedHeaders = (
  headers,
  rows,
  filename,
  headerRows = [],
  merges = [],
  includeColumnHeaderRow = true,
) => {
  const columnHeaders = headers.map((header) => header.label);
  const dataRows = rows.map((row) =>
    headers.map((header) => row[header.accessor] || ""),
  );
  const worksheetRows = includeColumnHeaderRow
    ? [...headerRows, columnHeaders, ...dataRows]
    : [...headerRows, ...dataRows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetRows);

  if (merges.length > 0) {
    worksheet["!merges"] = merges;
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, filename.slice(0, 31));
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveExcel(excelBuffer, filename);
};

export const generateExcelWithSheets = (sheets, filename) => {
  const workbook = XLSX.utils.book_new();

  sheets.forEach(({ sheetName, headers, rows }) => {
    const columnHeaders = headers.map((header) => header.label);
    const dataRows = rows.map((row) =>
      headers.map((header) => row[header.accessor] || ""),
    );
    const worksheet = XLSX.utils.aoa_to_sheet([columnHeaders, ...dataRows]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveExcel(excelBuffer, filename);
};
