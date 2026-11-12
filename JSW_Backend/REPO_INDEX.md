# JSW Backend — Repository Architecture & API Index

Comprehensive technical reference, architecture guide, and master index for the **JSW Backend** API services, MSSQL database calls, stored procedures, WebSockets, and report distribution infrastructure.

---

## 1. System Architecture Overview

```
                                  ┌───────────────────────────────────┐
                                  │      Client (JSW_UI / Frontend)    │
                                  └───────────────┬───────────────────┘
                                                  │ HTTP / REST & WebSockets
                                                  ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       Express Server                                        │
│  ┌───────────────────────┐   ┌──────────────────────────┐   ┌────────────────────────────┐  │
│  │ Security & Middleware │   │  Authentication & RBAC   │   │     WebSocket Server       │  │
│  │ Helmet, CORS, Brotli  │   │  JWT, Roles (SuperAdmin, │   │  /ws/dashboard (15s push)  │  │
│  │ Morgan, JSON (150MB)  │   │  Admin, User), AccessCtrl│   │  /ws/robot-health (15s)    │  │
│  └───────────────────────┘   └──────────────────────────┘   └────────────────────────────┘  │
│                                              │                                              │
│                     ┌────────────────────────┴────────────────────────┐                     │
│                     ▼                                                 ▼                     │
│  ┌────────────────────────────────────┐             ┌────────────────────────────────────┐  │
│  │      REST Controllers & Routes     │             │     Report Sharing & Emailing      │  │
│  │ 29 Route Modules (Production, OEE, │             │  Multi-Format Mailer (Excel/PDF)   │  │
│  │ Alarms, Robots, Reports, Admin)    │             │  Subscription Management & Sync    │  │
│  └──────────────────┬─────────────────┘             └─────────────────┬──────────────────┘  │
│                     │                                                 │                     │
│                     └────────────────────────┬────────────────────────┘                     │
│                                              ▼                                              │
│                               ┌─────────────────────────────┐                               │
│                               │     27 Domain Services      │                               │
│                               │  Data Normalization, Cache, │                               │
│                               │  Formatters, Transporters   │                               │
│                               └──────────────┬──────────────┘                               │
│                                              │                                              │
│                                              ▼                                              │
│                               ┌─────────────────────────────┐                               │
│                               │   Database Abstraction      │                               │
│                               │   dbUtils & MSSQL Pool      │                               │
│                               └──────────────┬──────────────┘                               │
└──────────────────────────────────────────────┼──────────────────────────────────────────────┘
                                               │
                                               ▼
                              ┌───────────────────────────────────┐
                              │     MSSQL Database (DB_JSW)       │
                              │  • 34 Stored Procedures (app_*)   │
                              │  • Managed Tables (Users, Access) │
                              │  • Master Tables (Hour, Model)    │
                              └───────────────────────────────────┘
```

---

## 2. Directory Structure

```txt
JSW_Backend/
├── README.md                      # Quickstart and environment setup
├── REPO_INDEX.md                  # Complete technical index & architectural reference
├── package.json                   # Dependencies (express 5, mssql, ws, nodemailer, bcryptjs, etc.)
├── audit_reports.js               # Dev tool: audits UI report components against DB fields
├── create_view.js                 # Dev tool: SQL view generation script
├── fetch_cols.js                  # Dev tool: extracts database column schemas
├── test/                          # Unit & integration test suites
│   ├── shareEmail.test.js         # Email dispatch and validation tests
│   ├── smtp.test.js               # SMTP transporter verification tests
│   ├── subscriptions.test.js      # Report subscription CRUD and dispatch tests
│   ├── test_all.js                # Consolidated test runner
│   ├── test_db.js                 # MSSQL connection verification
│   ├── test_share_email.js        # Scripted standalone email test
│   ├── test_smtp.js               # Standalone SMTP test
│   └── test_subscriptions.js      # Standalone subscription test
├── src/
│   ├── server.js                  # HTTP server, DB connection, WS servers, lifecycle hooks
│   ├── app.js                     # Express app setup, CORS, compression, global route mounting
│   ├── config/
│   │   ├── appConfig.js           # Central configuration: roles, sidebar pages, ports, JWT
│   │   └── db.js                  # MSSQL connection pool singleton
│   ├── middleware/
│   │   ├── auth.js                # JWT verification, requireAdmin, requireSuperAdmin
│   │   └── compress.js            # Brotli (br) & Gzip compression middleware
│   ├── routes/                    # 29 Express route definition files
│   ├── controller/                # 28 Route controllers handling req/res validation
│   ├── services/                  # 27 Domain services implementing business logic & DB queries
│   │   ├── emailService.js        # Nodemailer SMTP transporter with HTML templates & attachments
│   │   ├── subscriptionService.js # Subscription DB operations & dispatch tracking
│   │   └── ... (25 feature services for production, maintenance, alarms, and robotics)
│   └── utils/
│       ├── dbUtils.js             # executeStoredProcedure() helper & SQL type binders
│       ├── productionOeeTransformer.js # Transformer for real-time dashboard WebSocket payloads
│       ├── tipChangeValidators.js # Shift & query parameter validator for tip change reports
│       └── partMarriageValidators.js # Shift & query parameter validator for part marriage reports
```

---

## 3. Database Architecture & Schema

### Managed Tables (Auto-provisioned on Server Startup)
The backend automatically creates and synchronizes these tables during startup:

| Table Name | Schema Provisioner | Purpose |
| :--- | :--- | :--- |
| `dbo.Users` | [`authService.js`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/services/authService.js#L8-L23) | Stores system users, bcrypt password hashes, and system roles (`superadmin`, `admin`, `user`). |
| `dbo.SidebarPages` | [`accessService.js`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/services/accessService.js#L8-L20) | Master list of navigable UI pages, paths, display orders, and admin-only flags. |
| `dbo.UserPageAccess` | [`accessService.js`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/services/accessService.js#L22-L34) | Many-to-many RBAC mapping storing which non-admin users can view which sidebar pages. |
| `dbo.ReportSubscriptions`| [`subscriptionService.js`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/services/subscriptionService.js#L3-L28) | Stores scheduled report bundles, recipients, filter JSONs, cadence intervals, and delivery history. |

### Referenced Master Tables (Pre-existing in ERP / Plant DB)
- `dbo.tbl_Mast_Hour`: Shift hour master table storing `HourId`, `Shift` (`A`, `B`, `C`), `StartHour`, and `EndHour`.
- `dbo.tbl_Mast_AlarmCategory`: Alarm category master storing `CategoryID`, `Name`, and `IsActive`.
- `[DB_Reporting_JSW].[dbo].[tbl_Mast_Model]`: Car variant master storing `Mes_Vcode` and `Description`.

---

## 4. Master API Route & Controller Index

### 🔐 System Setup & Authentication
| Method | Endpoint | Auth / Middleware | Controller | Service / Query |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/setup/superadmin` | None (Setup Key) | [`authController.setupSuperAdmin`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/authController.js) | Bootstraps initial SuperAdmin in `dbo.Users` |
| `POST` | `/api/auth/login` | Public | [`authController.login`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/authController.js) | Validates credentials, issues JWT token |
| `POST` | `/api/auth/logout` | `authenticate` | [`authController.logout`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/authController.js) | Client-side session invalidation |
| `GET` | `/api/auth/me` | `authenticate` | [`authController.me`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/authController.js) | Resolves user profile from JWT payload |

### 👥 User Management & Access Control (RBAC)
| Method | Endpoint | Auth / Middleware | Controller | Service / Query |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | `authenticate`, `requireAdmin` | [`userController.getUsers`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/userController.js) | Lists all registered users from `dbo.Users` |
| `POST` | `/api/users` | `authenticate`, `requireSuperAdmin` | [`userController.createUser`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/userController.js) | Creates user with role (`user`/`admin`) |
| `PATCH` | `/api/users/:userId` | `authenticate`, `requireSuperAdmin` | [`userController.updateUser`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/userController.js) | Updates name, email, role, or password |
| `DELETE` | `/api/users/:userId` | `authenticate`, `requireSuperAdmin` | [`userController.deleteUser`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/userController.js) | Removes user and associated page access |
| `GET` | `/api/access/me/pages` | `authenticate` | [`accessController.getMyPages`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/accessController.js) | Resolves accessible sidebar pages for user |
| `GET` | `/api/access/pages` | `authenticate`, `requireAdmin` | [`accessController.getAvailablePages`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/accessController.js) | Lists all configurable sidebar sections |
| `GET` | `/api/access/users/:userId/pages` | `authenticate`, `requireAdmin` | [`accessController.getUserPages`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/accessController.js) | Gets assigned page permissions for target user |
| `PUT` | `/api/access/users/:userId/pages` | `authenticate`, `requireAdmin` | [`accessController.updateUserPages`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/accessController.js) | Updates page access mappings in `UserPageAccess` |

### 🏭 Production Control & Analytics
| Method | Endpoint | Auth / Middleware | Controller | Stored Procedure / Query |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/production/transactions` | `authenticate` | [`productionController.getProductionTransactions`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/productionController.js) | `dbo.app_GetProductionTransactions` |
| `GET` | `/api/production/production-summary` | Public | [`productionController.getProductionSummary`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/productionController.js) | `dbo.app_GetProductionSummary` |
| `GET` | `/api/production/hourly-report` | `authenticate` | [`hourlyProductionController.getHourlyProductionReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/hourlyProductionController.js) | `dbo.app_GetHourlyProductionReport` |
| `PATCH` | `/api/production/update-remark` | `authenticate` | [`hourlyProductionController.updateHourlyProductionRemark`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/hourlyProductionController.js) | `dbo.app_UpdateHourlyProductionRemark` |
| `GET` | `/api/production/production-overview` | `authenticate` | [`productionOverviewController.getProductionOverview`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/productionOverviewController.js) | `dbo.app_GetProductionOverview` |
| `GET` | `/api/production/annual-graph` | `authenticate` | [`annualGraphProductionController.getAnnualGraphData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/annualGraphProductionController.js) | `dbo.app_GetAnnualProductionReportByVariant` |
| `GET` | `/api/production/detailed-production` | `authenticate` | [`detailedProductionController.getDetailedProductionData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/detailedProductionController.js) | `dbo.app_Detailed_Production_Count` |
| `GET` | `/api/production/shift-summary-report` | `authenticate` | [`shiftSummaryController.getShiftSummaryReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/shiftSummaryController.js) | `dbo.app_GetShiftSummaryReport` |

### ⏱️ OEE, Cycle Time & Plant Losses
| Method | Endpoint | Auth / Middleware | Controller | Stored Procedure / Query |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/oee/report` | `authenticate` | [`oeeController.getReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/oeeController.js) | `dbo.app_OEE_Report` |
| `GET` | `/api/cycle-time/variants` | `authenticate` | [`cycleTimeController.getVariants`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/cycleTimeController.js) | `SELECT DISTINCT [Mes_Vcode] FROM tbl_Mast_Model` |
| `GET` | `/api/cycle-time/report` | `authenticate` | [`cycleTimeController.getReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/cycleTimeController.js) | `dbo.app_CT_SubStation_Report` |
| `GET` | `/api/cycle-time/overview` | `authenticate` | [`cycleTimeController.getOverview`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/cycleTimeController.js) | `dbo.app_CT_Overview` |
| `GET` | `/api/line-cycle-time/report` | `authenticate` | [`lineCycleTimeController.getReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/lineCycleTimeController.js) | `dbo.app_Line_Cycle_Time_Report` |
| `GET` | `/api/losses-analysis/loss-types` | `authenticate` | [`lossesAnalysisController.getLossTypes`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/lossesAnalysisController.js) | `dbo.app_GetLossTypes` |
| `GET` | `/api/losses-analysis/report` | `authenticate` | [`lossesAnalysisController.getReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/lossesAnalysisController.js) | `dbo.app_Line_Station_Losses_Analysis` |
| `GET` | `/api/mtbf-mttr/report` | `authenticate` | [`mtbfMttrController.getReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/mtbfMttrController.js) | `dbo.app_MTBF_MTTR_Report` |
| `GET` | `/api/line-buffer` | `authenticate` | [`lineBufferController.getLineBufferData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/lineBufferController.js) | `dbo.app_GetLineBufferStatusHistory` |

### 🤖 Robotics & Maintenance Tracking
| Method | Endpoint | Auth / Middleware | Controller | Stored Procedure / Query |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/robot-health/status` | `authenticate` | [`robotHealthController.getRobotHealthStatus`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/robotHealthController.js) | `dbo.app_Robot_Health` |
| `GET` | `/api/robot-status/report` | `authenticate` | [`robotStatusController.getRobotStatusReport`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/robotStatusController.js) | `dbo.app_Robot_Status` |
| `GET` | `/api/robot-spot-hit-rate/report` | `authenticate` | [`robotSpotHitRateController.getRobotSpotHitRate`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/robotSpotHitRateController.js) | `dbo.app_Robot_SpotHitRate` |
| `GET` | `/api/maintenance/tip-change-count`| `authenticate` | [`tipChangeCountController.getTipChangeCount`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/tipChangeCountController.js) | `dbo.app_GetTipChangeGraphData`, `dbo.app_GetTipChangeCountPaginated` |
| `GET` | `/api/part-marriage` | `authenticate` | [`partMarriageController.getPartMarriage`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/partMarriageController.js) | `dbo.app_GetPartMarriageGraphData`, `dbo.app_GetPartMarriagePaginated` |

### 🚨 Alarms, Plant Master & Targets Configuration
| Method | Endpoint | Auth / Middleware | Controller | Stored Procedure / Query |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/alarm/categories` | `authenticate` | [`alarmController.getAlarmCategories`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/alarmController.js) | `SELECT CategoryID, Name FROM tbl_Mast_AlarmCategory` |
| `GET` | `/api/alarm/alarm-report` | `authenticate` | [`alarmController.getAlarmReportData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/alarmController.js) | `dbo.app_AlarmsReport` |
| `GET` | `/api/alarm/top-alarms` | `authenticate` | [`alarmController.getTopXAlarmsData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/alarmController.js) | `dbo.app_TopX_Alarms` |
| `GET` | `/api/master` | `authenticate` | [`masterDataController.getMasterData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/masterDataController.js) | `app_GetMasterData` |
| `GET` | `/api/master/line-variant` | `authenticate` | [`lineVariantController.getLineAndVariantData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/lineVariantController.js) | `app_GetMasterData`, `dbo.sp_GetVariantList` |
| `GET` | `/api/ct-oee-config` | `authenticate` | [`ctOeeConfigController.getCTOEEConfig`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/ctoeeConfigController.js) | `dbo.app_Get_CTOEEConfig` |
| `POST` | `/api/ct-oee-config` | `authenticate` | [`ctOeeConfigController.insertCTOEEConfig`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/ctOeeConfigController.js) | `dbo.app_Insert_CTOEEConfig` |
| `PUT` | `/api/ct-oee-config/:id` | `authenticate` | [`ctOeeConfigController.updateCTOEEConfig`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/ctOeeConfigController.js) | `dbo.app_Update_CTOEEConfig` |
| `GET` | `/api/shift-backlog-planning` | `authenticate` | [`shiftBacklogPlanningController.getShiftBacklogPlanning`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/shiftBacklogPlanningController.js) | `dbo.sp_GetShiftData` |
| `PUT` | `/api/shift-backlog-planning/:hourId` | `authenticate` | [`shiftBacklogPlanningController.updateShiftHour`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/shiftBacklogPlanningController.js) | `SELECT FROM tbl_Mast_Hour`, `dbo.sp_UpdateShiftHour` |
| `GET` | `/api/dashboard/dashboard-data` | `authenticate` | [`dashboardController.getDashboardData`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/dashboardController.js) | `dbo.app_productionOeeOverivew`, `dbo.app_GetJphDetails` |

### 📧 Report Sharing & Subscriptions
| Method | Endpoint | Auth / Middleware | Controller | Service / Stored Procedure |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/reports/share-email` | Public | [`reportShareController.shareReportsViaEmail`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/reportShareController.js) | Validates recipients, builds HTML body, dispatches SMTP email |
| `GET` | `/api/reports/smtp-status` | Public | [`reportShareController.verifySmtpStatus`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/reportShareController.js) | Verifies SMTP server connectivity via `verifySmtp()` |
| `GET` | `/api/subscriptions` | Public | [`subscriptionController.getSubscriptions`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Fetches all report subscription records |
| `POST` | `/api/subscriptions` | Public | [`subscriptionController.createSubscription`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Creates a new report subscription record |
| `PUT` | `/api/subscriptions/:id` | Public | [`subscriptionController.updateSubscription`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Updates an existing subscription record |
| `DELETE` | `/api/subscriptions/:id` | Public | [`subscriptionController.deleteSubscription`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Deletes a subscription record |
| `POST` | `/api/subscriptions/:id/record-success` | Public | [`subscriptionController.recordDispatchSuccess`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Updates `LastSentAt` timestamp upon successful client dispatch |
| `POST` | `/api/subscriptions/:id/dispatch` | Public | [`subscriptionController.dispatchSubscriptionNow`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Directed to UI client manager (synthetic dispatch disabled) |
| `POST` | `/api/subscriptions/dispatch-cadence` | Public | [`subscriptionController.dispatchCadenceNow`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/controller/subscriptionController.js) | Directed to UI client manager (synthetic dispatch disabled) |

---

## 5. Master Stored Procedures Catalog (All 34 Stored Procedures)

```txt
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 STORED PROCEDURE DIRECTORY                                     │
├────────────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Procedure Name                         │ Domain & Primary Responsibility                       │
├────────────────────────────────────────┼───────────────────────────────────────────────────────┤
│ dbo.app_productionOeeOverivew          │ Overall production availability, performance, and OEE │
│ dbo.app_GetJphDetails                  │ Real-time and target Jobs Per Hour (JPH) rates        │
│ dbo.app_Detailed_Production_Count      │ 4-recordset breakdown of counts, targets, and charts  │
│ dbo.app_GetHourlyProductionReport      │ Production unit variance bucketed by 1-hour intervals │
│ dbo.app_UpdateHourlyProductionRemark   │ Line supervisor remark recording per hourly entry     │
│ dbo.app_GetProductionOverview          │ Station and shift aggregated production KPIs          │
│ dbo.app_GetProductionTransactions      │ Real-time transactional unit completions              │
│ dbo.app_GetProductionSummary           │ Multi-shift comparative production totals             │
│ dbo.app_GetAnnualProductionReportByVariant │ Year-to-date and monthly vehicle model production │
│ dbo.app_OEE_Report                     │ Station and sub-station level OEE metrics             │
│ dbo.app_CT_SubStation_Report           │ Substation-level granular cycle time logs             │
│ dbo.app_CT_Overview                    │ Aggregated BIW cycle times across line stations       │
│ dbo.app_Line_Cycle_Time_Report         │ Line total cycle time per car body unit               │
│ dbo.app_GetLineBufferStatusHistory     │ Conveyor buffer levels and station bottleneck trends  │
│ dbo.app_Line_Station_Losses_Analysis   │ Multi-category station micro-stoppages & breakdowns   │
│ dbo.app_MTBF_MTTR_Report               │ Machine failure frequency and repair durations        │
│ dbo.app_Robot_Health                   │ Robot axis motor temperatures, current, and alarms    │
│ dbo.app_Robot_Status                   │ Real-time robot communication & execution status      │
│ dbo.app_Robot_SpotHitRate              │ Welding spot hit rate accuracy and missed spots       │
│ dbo.app_GetTipChangeGraphData          │ Tip replacement frequency trends over time            │
│ dbo.app_GetTipChangeCountPaginated     │ Paginated robot electrode tip dress/change events     │
│ dbo.app_GetPartMarriageGraphData       │ Marriage cycle duration graph trends                  │
│ dbo.app_GetPartMarriagePaginated       │ Component assembly marriage transaction logs          │
│ dbo.app_AlarmsReport                   │ Historical plant alarm logs with pagination metadata  │
│ dbo.app_TopX_Alarms                    │ Highest occurring alarm codes ranked by count         │
│ app_GetMasterData                      │ Cluster, Line, Station, and SubStation tree hierarchy │
│ dbo.sp_GetVariantList                  │ Master list of car variants & model codes             │
│ dbo.app_GetLossTypes                   │ System dictionary of classified downtime types        │
│ dbo.sp_GetShiftData                    │ 24-hour hour-to-shift master schedule mappings        │
│ dbo.sp_UpdateShiftHour                 │ Modify start/end hours for a specific shift interval  │
│ dbo.app_GetShiftSummaryReport          │ Summary of actual vs target, loss, & top 3 alarms     │
│ dbo.app_Get_CTOEEConfig                │ Target parameters (Nominal CT, Target OEE, JPH)       │
│ dbo.app_Insert_CTOEEConfig             │ Insert new line-level performance targets             │
│ dbo.app_Update_CTOEEConfig             │ Update existing line-level performance targets        │
└────────────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 6. Real-Time WebSockets (`src/server.js`)

Two dedicated WebSocket streams operate over the primary HTTP server port using HTTP `upgrade` routing:

1. **Dashboard Push Stream**:
   - **Endpoint**: `ws://localhost:8080/ws/dashboard?range=today`
   - **Interval**: Pushes fresh metrics every **15 seconds** (or immediately upon initial connection / range change).
   - **Payload**: Combines `app_productionOeeOverivew` and `app_GetJphDetails`, transformed into clean chart-ready metrics via `productionOeeTransformer.js`.
   - **Heartbeat**: 25-second ping-pong keepalive detection to terminate unresponsive connections.

2. **Robot Health Stream**:
   - **Endpoint**: `ws://localhost:8080/ws/robot-health`
   - **Interval**: Pushes fresh robot statuses every **15 seconds**.
   - **Payload**: Executes `dbo.app_Robot_Health` for active robotic stations.

---

## 7. Middleware & Security Architecture

1. **Authentication & RBAC ([`auth.js`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/middleware/auth.js)):**
   - JWT tokens passed in `Authorization: Bearer <token>` or HTTP cookie.
   - Three hierarchical system roles: `superadmin` > `admin` > `user`.
   - Fine-grained per-user sidebar page access control via `dbo.UserPageAccess`.
2. **Compression ([`compress.js`](file:///C:/Users/SDS/OneDrive%20-%20dacpl.in/Desktop/JSW/JSW_Backend/src/middleware/compress.js)):**
   - Brotli (`br`) compression prioritized for supported clients; Gzip fallback using Node.js native `zlib`.
   - Compresses large JSON payloads (up to 150MB limit configured in `app.js`).
3. **CORS & HTTP Headers:**
   - Whitelist validation via `appConfig.allowedOrigins`.
   - Security hardening with `helmet`.
