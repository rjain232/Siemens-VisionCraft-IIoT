# JSW Backend

Express and MSSQL backend for JSW reporting, authentication, user management, and sidebar access control.

## Setup

Install dependencies:

```powershell
npm install
```

Create/update `.env`:

```txt
PORT=8080
JWT_SECRET=supersecret
SUPERADMIN_SETUP_KEY=change-this-superadmin-setup-key
NODE_ENV=dev

DB_USER=sa
DB_PASSWORD=your-password
DB_SERVER=your-sql-server
DB_NAME=DB_Reporting_JSW
DB_PORT=1433
```

The database named in `DB_NAME` must already exist. The backend creates the required tables automatically inside that database.

Run the backend:

```powershell
npm run dev
```

Health check:

```txt
GET http://localhost:8080/health
```

## Architecture & Full API Index

> [!TIP]
> For the complete technical map including all **34 Stored Procedures**, **29 API Route Modules**, **WebSockets**, and **Scheduler Daemons**, see the dedicated **[REPO_INDEX.md](REPO_INDEX.md)**.

## Database Tables

The backend automatically creates, syncs, and manages these tables inside `DB_NAME`:

```txt
dbo.Users                -> User credentials, bcrypt hashes, and role definitions
dbo.SidebarPages         -> Master page registry, routes, and admin flags
dbo.UserPageAccess       -> Many-to-many user-to-page access permissions (RBAC)
dbo.ReportSubscriptions  -> Automated report email subscriptions, filters, and cadences
```

## Roles

```txt
superadmin -> full access + user management
admin      -> full access + access configuration
user       -> only assigned sidebar pages
```

The first superadmin is created through the one-time setup API. After a superadmin exists, that setup endpoint is blocked.

## Initial Flow

1. Start the backend (`npm run dev`).
2. Start the frontend (`JSW_UI`).
3. Open the frontend setup page: `http://127.0.0.1:5173/setup/superadmin`.
4. Create the first superadmin using `SUPERADMIN_SETUP_KEY`.
5. Login as superadmin.
6. Create admin/user accounts from User Management.
7. Assign sidebar access to normal users from Access Configuration.

## Key API Modules & Services

All endpoints and underlying database calls are detailed in [REPO_INDEX.md](REPO_INDEX.md). Key route prefixes:

- **Setup & Auth**: `/api/setup`, `/api/auth`
- **User & RBAC Access**: `/api/users`, `/api/access`
- **Production & Planning**: `/api/production` (Hourly, Transactions, Summaries, Annual Graph, Detailed Counts, Shift Summary)
- **OEE & Cycle Time**: `/api/oee`, `/api/cycle-time`, `/api/line-cycle-time`, `/api/losses-analysis`, `/api/mtbf-mttr`, `/api/line-buffer`
- **Robotics & Quality**: `/api/robot-health`, `/api/robot-status`, `/api/robot-spot-hit-rate`, `/api/part-marriage`, `/api/maintenance` (Tip Change Counts)
- **Alarms & Configuration**: `/api/alarm`, `/api/ct-oee-config`, `/api/shift-backlog-planning`, `/api/master`
- **Reports & Email Subscriptions**: `/api/reports`, `/api/subscriptions`
- **Live WebSockets**: `ws://localhost:8080/ws/dashboard`, `ws://localhost:8080/ws/robot-health`

## Central Config

Most access constants and configuration options are centralized in:

```txt
src/config/appConfig.js
```

This includes roles, role groups, JWT expiry, setup key, sidebar pages, and assignable page keys.

