import { jsPDF } from "jspdf";
import { saveAs as fileSaverSaveAs } from "file-saver";
import { cacheReportFile } from "./reportExportCache";

let isActive = false;
let activeReportKey = "";
let capturedFiles = {};
let fileCaptureListeners = [];
let interceptorsInstalled = false;

export function isBackgroundExportActive() {
  const isInBackgroundRunner =
    typeof document !== "undefined" &&
    Boolean(document.getElementById("background-report-runner"));

  return (
    isActive ||
    (typeof window !== "undefined" && Boolean(window.__BACKGROUND_EXPORT_ACTIVE__)) ||
    isInBackgroundRunner
  );
}

export function setBackgroundExportActive(active, reportKey = "", onFileCaptured = null) {
  isActive = Boolean(active);
  activeReportKey = reportKey || "";
  capturedFiles = {};
  fileCaptureListeners = onFileCaptured ? [onFileCaptured] : [];

  if (typeof window !== "undefined") {
    window.__BACKGROUND_EXPORT_ACTIVE__ = isActive;
    window.__BACKGROUND_REPORT_KEY__ = activeReportKey;
  }

  if (isActive && !interceptorsInstalled) {
    installExportInterceptors();
  }
}

export function addFileCaptureListener(listener) {
  if (typeof listener === "function") {
    fileCaptureListeners.push(listener);
  }
}

export function recordCapturedFile(filename, blob) {
  if (!filename || !blob) return;
  const cleanName = filename.replace(/\s+/g, "_");
  capturedFiles[cleanName] = blob;

  // Cache in IndexedDB / session cache with both the generated filename and base name
  try {
    cacheReportFile(cleanName, blob);
    if (activeReportKey) {
      if (cleanName.endsWith(".pdf")) {
        cacheReportFile(`${activeReportKey}.pdf`, blob);
      } else if (cleanName.endsWith(".xlsx")) {
        cacheReportFile(`${activeReportKey}.xlsx`, blob);
      }
    }
  } catch (e) {
    console.warn("Failed to cache report file:", e);
  }

  // Notify listeners
  for (const listener of fileCaptureListeners) {
    try {
      listener(cleanName, blob, activeReportKey);
    } catch (e) {
      console.error("File capture listener error:", e);
    }
  }
}

if (typeof window !== "undefined") {
  window.__RECORD_CAPTURED_FILE__ = recordCapturedFile;
}

export function getCapturedFiles() {
  return { ...capturedFiles };
}

export function installExportInterceptors() {
  if (interceptorsInstalled || typeof window === "undefined") return;
  interceptorsInstalled = true;

  // 1. Hook jsPDF.API.save and jsPDF.prototype.save directly
  try {
    const originalApiSave = jsPDF.API?.save;

    const interceptedPdfSave = function (filename, options) {
      const cleanName = (filename || `${activeReportKey || "Report"}.pdf`).replace(/\s+/g, "_");
      let blob = null;
      try {
        blob = this.output("blob");
      } catch (err) {
        console.error("[jsPDF Interceptor] output('blob') failed:", err);
      }

      if (blob) {
        try {
          cacheReportFile(cleanName, blob);
        } catch (e) {
          console.warn("[jsPDF Interceptor] cacheReportFile error:", e);
        }
      }

      // If background export is active (e.g. email sharing / headless runner / subscription)
      if (isBackgroundExportActive()) {
        if (blob) {
          recordCapturedFile(cleanName, blob);
        }
        return options?.returnPromise ? Promise.resolve(this) : this;
      }

      // Normal user download from UI:
      if (blob) {
        fileSaverSaveAs(blob, cleanName);
        return options?.returnPromise ? Promise.resolve(this) : this;
      }

      if (typeof originalApiSave === "function") {
        return originalApiSave.apply(this, arguments);
      }
      return options?.returnPromise ? Promise.resolve(this) : this;
    };

    interceptedPdfSave.__jswPatched = true;
    if (jsPDF.API) jsPDF.API.save = interceptedPdfSave;
    if (jsPDF.prototype) jsPDF.prototype.save = interceptedPdfSave;
  } catch (err) {
    console.warn("Could not patch jsPDF save:", err);
  }

  // 2. Hook file-saver saveAs (window.saveAs)
  try {
    const origSaveAs = window.saveAs || fileSaverSaveAs;
    window.saveAs = function (blob, filename) {
      if (isBackgroundExportActive()) {
        const cleanName = (filename || `${activeReportKey || "report"}.file`).replace(/\s+/g, "_");
        recordCapturedFile(cleanName, blob);
        return;
      }
      return origSaveAs.apply(this, arguments);
    };
  } catch (err) {
    console.warn("Could not patch window.saveAs:", err);
  }

  // 3. Hook window.XLSX.writeFile if available globally
  try {
    if (typeof window !== "undefined" && window.XLSX && window.XLSX.writeFile && !window.XLSX.writeFile.__jswPatched) {
      const originalWriteFile = window.XLSX.writeFile;
      const patchedWriteFile = function (wb, filename, opts) {
        if (isBackgroundExportActive()) {
          try {
            const excelBuffer = window.XLSX.write(wb, {
              bookType: "xlsx",
              type: "array",
              ...opts,
            });
            const blob = new Blob([excelBuffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const cleanName = (filename || `${activeReportKey || "Report"}.xlsx`).replace(/\s+/g, "_");
            recordCapturedFile(cleanName, blob);
            return;
          } catch (err) {
            console.error("Background XLSX.writeFile interception failed:", err);
          }
        }
        return originalWriteFile.apply(this, arguments);
      };
      patchedWriteFile.__jswPatched = true;
      window.XLSX.writeFile = patchedWriteFile;
    }
  } catch (err) {
    console.warn("Could not patch window.XLSX.writeFile:", err);
  }

  // 4. Hook HTMLAnchorElement.prototype.click and dispatchEvent (catches direct download links)
  try {
    const originalAnchorClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      if (isBackgroundExportActive() && (this.hasAttribute("download") || this.download)) {
        const downloadName = (this.download || this.getAttribute("download") || "report_file").replace(/\s+/g, "_");
        const href = this.href || this.getAttribute("href");
        if (href && href.startsWith("blob:")) {
          fetch(href)
            .then((r) => r.blob())
            .then((blob) => {
              recordCapturedFile(downloadName, blob);
            })
            .catch((err) => console.warn("Blob fetch failed from anchor click:", err));
        }
        return; // Suppress browser download dialog in background mode
      }
      return originalAnchorClick.apply(this, arguments);
    };

    const originalDispatchEvent = HTMLAnchorElement.prototype.dispatchEvent;
    HTMLAnchorElement.prototype.dispatchEvent = function (event) {
      if (
        isBackgroundExportActive() &&
        event &&
        (event.type === "click" || event.type?.includes("click")) &&
        (this.hasAttribute("download") || this.download)
      ) {
        const downloadName = (this.download || this.getAttribute("download") || "report_file").replace(/\s+/g, "_");
        const href = this.href || this.getAttribute("href");
        if (href && href.startsWith("blob:")) {
          fetch(href)
            .then((r) => r.blob())
            .then((blob) => {
              recordCapturedFile(downloadName, blob);
            })
            .catch((err) => console.warn("Blob fetch failed from anchor dispatchEvent:", err));
        }
        return true; // Suppress browser download dialog in background mode
      }
      return originalDispatchEvent.apply(this, arguments);
    };
  } catch (err) {
    console.warn("Could not patch HTMLAnchorElement download triggers:", err);
  }
}

// Auto-install when module is loaded
installExportInterceptors();
