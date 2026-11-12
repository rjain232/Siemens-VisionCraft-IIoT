import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { jsPDF } from "jspdf";
import { installPdfExportCache } from "./utils/reportExportCache";
import { installExportInterceptors } from "./utils/backgroundExportInterceptor";

try {
  installExportInterceptors();
  installPdfExportCache(jsPDF);
} catch (error) {
  console.warn("PDF export caching is unavailable:", error);
}

window.Apex = {
  chart: {
    fontFamily: "'Karla', sans-serif",
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
