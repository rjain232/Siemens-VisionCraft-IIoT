# JSW Frontend

## Project Overview

JSW Concept is a React and Vite based frontend dashboard for monitoring and managing manufacturing operations. The application is organized as a multi-module industrial interface that brings together production insights, maintenance views, configuration tools, operations workflows, and support pages inside a shared layout with sidebar navigation and contextual breadcrumbs.

The current implementation includes core sections for OEE, robot monitoring, production control, maintenance, process configurator, third-party data, and part marriage. Several additional routes such as line status, order management, VIN generation, share reports, and user profile management are already scaffolded as placeholders, making the project a strong base for expanding plant-floor and operational visibility features.

From a technical perspective, the project uses React 19, React Router, Vite, and Tailwind CSS. The app is structured around reusable page modules and tab-based subviews, with shared layout components handling navigation, responsiveness, and cross-page context.

## Setup

Install dependencies:

```powershell
npm install
```

Run the frontend:

```powershell
npm run dev
```

Default local URL:

```txt
http://127.0.0.1:5173
```

The frontend expects the backend API at:

```txt
http://localhost:8080
```

To override it, add a Vite environment value:

```txt
VITE_API_BASE_URL=http://localhost:8080
```

## Authentication And Access Flow

The app uses the backend JWT login flow. After login, the token and user are stored in localStorage and protected routes are enabled.

Roles:

```txt
superadmin -> all sidebar sections + User Management + Access Configuration
admin      -> all sidebar sections + Access Configuration
user       -> only assigned sidebar sections
```

Initial setup:

1. Start backend and frontend.
2. Open `http://127.0.0.1:5173/setup/superadmin`.
3. Create the first superadmin using the backend `SUPERADMIN_SETUP_KEY`.
4. Login from `http://127.0.0.1:5173/login/reporting`.
5. Use User Management to create admin/user accounts.
6. Use Access Configuration to assign sidebar pages to normal users.

## Main Pages

```txt
/setup/superadmin       one-time superadmin setup
/login/reporting        login screen
/dashboard              overview
/user-management        superadmin-only user management
/access-configuration   admin/superadmin access configuration
```

## Access Configuration

Access Configuration shows normal user accounts only. Admin and superadmin accounts get full access by role, so they do not need checkbox assignments.

The selected checkbox values are saved through the backend into `dbo.UserPageAccess`. When a normal user logs in, the sidebar calls `/api/access/me/pages` and renders only the allowed sections.

## Central Config

Most frontend constants are centralized in:

```txt
src/config/appConfig.js
```

This includes API base URL, localStorage keys, role names, role groups, route constants, sidebar navigation, group titles, and route-to-page mapping.

`src/config/navigation.js` is a compatibility wrapper that re-exports navigation values from `appConfig.js`.

## Build

Verify the frontend:

```powershell
npm run build
```
