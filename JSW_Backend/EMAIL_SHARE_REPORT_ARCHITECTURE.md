# JSW Motors — Email Share Report & Automated Cadence Subscriptions
## Complete Architecture & Implementation Reference

*Last updated: 2026-09-16*

---

## 1. Executive Summary

This feature adds end-to-end automated and manual report email distribution across the JSW Motors dashboard. Rather than maintaining separate, duplicate report generators on the server, the system re-uses the existing, pixel-perfect frontend PDF and Excel download routines by rendering report components offscreen in a headless container, intercepting the binary file streams in memory, and transmitting them via SMTP to end users.

---

## 2. Backend (`JSW_Backend`) New Files

| File Path | Role / Category | Detailed Description |
| :--- | :--- | :--- |
| **`src/services/emailService.js`** | **Email Dispatch & Packaging** | Configures `nodemailer` with SMTP credentials to construct and dispatch emails. Handles multi-recipient sending, HTML email body templating (report metadata table, cadence tags), and automatically bundles multiple report attachments (PDFs & Excel sheets). If total attachment size exceeds limits or files are numerous, it zips them into a single archive before sending. |
| **`src/routes/reportShare.js`** | **API Endpoints** | Exposes REST endpoints for report sharing: `POST /api/reports/share-email` (instant email share with uploaded file buffers/base64), `POST /api/reports/share-by-email` (backwards-compatible alias), and `GET /api/reports/smtp-status` (connection health check). |
| **`src/controller/reportShareController.js`** | **Request Handling & Validation** | Receives and validates incoming share requests (email recipients, report names, base64 payloads, date ranges, filters). Prepares attachments and invokes `emailService`. Calculates active shift windows (Shift A: 06:00–14:00, Shift B: 14:00–22:00, Shift C: 22:00–06:00). |
| **`src/services/subscriptionService.js`** | **Cadence Subscription Store** | Manages subscription schedules stored in the database. Supports CRUD operations for recurring email subscriptions (Hourly, Daily, Shift-wise, Weekly, Monthly), storing target recipients, cadences, selected reports, line/area filters, and execution history. |
| **`src/services/subscriptionScheduler.js`** | **Automated Cron / Cadence Runner** | Background service running on `node-cron`. Evaluates active subscriptions against current server time and shift boundaries. When a subscription is due, it triggers report compilation and dispatches automated emails to scheduled recipients without any user interaction. |
| **`src/controller/subscriptionController.js`** | **Subscription Management API Controller** | Handles HTTP requests for listing, creating, pausing, editing, or deleting scheduled report subscriptions. |
| **`src/routes/subscriptionRoutes.js`** | **Subscription Routes** | Defines API routes: `GET /api/subscriptions`, `POST /api/subscriptions`, `PUT /api/subscriptions/:id`, `DELETE /api/subscriptions/:id`. |
| **`src/services/reportBuilderService.js`** & **`pdfReportBuilder.js`** | **Headless Fallback Generator** | Server-side backup generator. If email sharing is invoked without browser-uploaded UI files (e.g. triggered via cron job or external webhook), this service queries the database directly and formats a standard PDF / Excel document. |

---

## 3. Frontend (`JSW_UI`) New Files

| File Path | Role / Category | Detailed Description |
| :--- | :--- | :--- |
| **`src/context/BackgroundExportContext.jsx`** | **React State Context** | Provides a headless execution context (`isBackground: true`, `dateRange`, `cadence`, `filters`). Allows report pages to know whether they are being viewed by a user or rendered silently offscreen for automated file generation. |
| **`src/utils/backgroundExportInterceptor.js`** | **File Interception Engine** | Hooks into browser download mechanisms (`doc.save` from jsPDF, `saveAs` from file-saver, and `HTMLAnchorElement.click`). When a component triggers a download in background mode, this utility suppresses the browser's OS "Save As" popup and instead captures the generated Blob/File directly in memory so it can be uploaded and emailed. |
| **`src/utils/reportExportCache.js`** | **Client-Side Storage & Caching** | Caches generated report files (Blobs/Base64) into IndexedDB (`jsw-report-exports`) and session memory keyed by report name and date range. Prevents redundant regeneration if a user selects and sends the same report multiple times. |
| **`src/utils/reportGenerator.js`** | **Client-Side Table/Excel Generator** | Utility containing generic report schema builders, column definitions, and multi-sheet Excel generation routines used when converting data tables into downloadable files. |
| **`src/pages/reports/components/ReportSubscriptionManager.jsx`** | **Subscriptions UI** | UI modal/drawer component for creating and managing automated recurring email cadences (Daily, Shift-wise, Weekly, Monthly) with recipient tagging and time selectors. |
| **`src/utils/shiftUtils.js`** | **Time & Shift Helpers** | Calculates shift boundaries (Shift A, Shift B, Shift C timings) and date math needed to compute cadence-specific date intervals (e.g., "Previous Shift", "Yesterday", "Current Week"). |
| **`src/pages/reports/components/ShareReport.original.jsx`** & **`shareReportTree.original.js`** | **Backup Files** | Preserved baseline versions of `ShareReport.jsx` and `shareReportTree.js` saved before the email share and multi-report background generation features were integrated. |

---

## 4. Key Modifications to Existing Files

| Modified File | Summary of Changes |
| :--- | :--- |
| **`src/sharedComponents/DateRangeBar.jsx`** | Added the **"Send Email"** button next to "Download", including the email recipient popup modal, format checkboxes (PDF/Excel), and background export interception trigger. |
| **`src/pages/reports/components/ShareReport.jsx`** | Upgraded to render selected report components in an invisible background DOM container (`offscreen-export-container`), execute their native download pipelines, capture both files, and transmit them to the backend in a single bundle. |
| **All 31 Report Pages**<br>*(e.g., `OverallOEE.jsx`, `AlarmReport.jsx`, `ProductionOverview.jsx`)* | Equipped with the `useBackgroundExport()` hook and auto-download triggers (`bgTriggeredRef`) so they execute seamlessly when mounted offscreen for emailing. |
| **`src/app.js` & `src/server.js` (Backend)** | Mounted `/api/reports` and `/api/subscriptions` routes, auto-created the database subscription table (`ensureSubscriptionTable`), and initiated the cadence cron scheduler. |

---

## 5. End-to-End System Diagram

```
[ User clicks "Send Email" on UI / Cadence Cron Triggers ]
                          │
                          ▼
 [ Set BackgroundExportContext: isBackground = true ]
                          │
                          ▼
 [ Component mounts offscreen & auto-fetches live data ]
                          │
                          ▼
             [ Calls handleDownload() ]
           ┌──────────────┴──────────────┐
           ▼                             ▼
      Generate Excel                Generate PDF
           │                             │
           ▼                             ▼
      saveExcel()                   doc.save()
           │                             │
           └──────────────┬──────────────┘
                          ▼
  [ backgroundExportInterceptor Trap (Suppresses OS Dialog) ]
                          │
                          ▼
    [ Captured in Memory Blobs & Cached in IndexedDB ]
                          │
                          ▼
        [ Converted to Base64 String via FileReader ]
                          │
                          ▼
    [ POST /api/reports/share-email (Axios / Fetch) ]
                          │
                          ▼
  [ Backend reportShareController validates emails & files ]
                          │
                          ▼
     [ emailService formats HTML body & attachments ]
     (Auto-zips if >6 files or total size > 20MB)
                          │
                          ▼
             [ SMTP Dispatched to Inbox ✉️ ]
```

