const reportFiles = new Map();
const DB_NAME = "jsw-report-exports";
const STORE_NAME = "files";

const openDatabase = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const cacheReportFile = async (filename, blob) => {
  if (!filename || !blob) return;
  reportFiles.set(filename, blob);
  try {
    const db = await openDatabase();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const request = transaction.objectStore(STORE_NAME).put(blob, filename);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn("Could not persist report export:", error);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("report-export-cached", { detail: filename }));
  }
};

export const getCachedReportFile = async (filename) => {
  if (reportFiles.has(filename)) return reportFiles.get(filename);
  try {
    const db = await openDatabase();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(filename);
      request.onsuccess = () => {
        if (request.result) reportFiles.set(filename, request.result);
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
};

export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const installPdfExportCache = (jsPDFInstance) => {
  import("./backgroundExportInterceptor")
    .then(({ installExportInterceptors }) => {
      installExportInterceptors();
    })
    .catch(() => {});
};

export const listCachedReportFiles = async () => {
  try {
    const db = await openDatabase();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).getAllKeys();
      request.onsuccess = () => resolve([...new Set([...reportFiles.keys(), ...request.result])]);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return [...reportFiles.keys()];
  }
};
