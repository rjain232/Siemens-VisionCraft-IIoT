import {
  Database,
  FileText,
  Gauge,
  HelpCircle,
  Info,
  KeyRound,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  TrendingUp,
  Wrench,
  Zap,
  MonitorPlay,
  Wind,
} from "lucide-react";

const roles = {
  superadmin: "superadmin",
  admin: "admin",
  user: "user",
};

const routes = {
  dashboard: "/dashboard",
  login: "/login/reporting",
  master: "/master",
  superAdminSetup: "/setup/superadmin",
  accessConfiguration: "/access-configuration",
  userManagement: "/user-management",
};

const sidebarNavItems = [
  {
    key: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    to: routes.dashboard,
    group: "main",
  },
  {
    key: "oee",
    label: "OEE",
    icon: TrendingUp,
    to: "/oee",
    group: "production",
  },
  {
    key: "robot-monitoring",
    label: "Robot Monitoring",
    icon: Gauge,
    to: "/robot-monitoring",
    group: "production",
  },
  {
    key: "siemens-hmi",
    label: "Siemens Plant HMI",
    icon: MonitorPlay,
    to: "/siemens-hmi",
    group: "production",
    publicAfterLogin: true,
  },
  {
    key: "cleanroom-hvac",
    label: "Cleanroom HVAC (Fab)",
    icon: Wind,
    to: "/cleanroom-hvac",
    group: "production",
    publicAfterLogin: true,
  },
  {
    key: "solvyn-grid",
    label: "Solvyn Smart Grid",
    icon: Zap,
    to: "/solvyn-smartgrid",
    group: "production",
  },
  {
    key: "production-control",
    label: "Production Control",
    icon: Zap,
    to: "/production-control",
    group: "production",
  },
  {
    key: "maintenance",
    label: "Maintenance",
    icon: Wrench,
    to: "/maintenance",
    group: "production",
  },
  {
    key: "process-configurator",
    label: "Process Configurator",
    icon: Settings,
    to: "/process-configurator",
    group: "config",
  },
  {
    key: "third-party-data",
    label: "Third Party Report",
    icon: Database,
    to: "/third-party-report",
    group: "config",
  },
  {
    key: "part-marriage",
    label: "Part Marriage",
    icon: Package,
    to: "/part-marriage",
    group: "operations",
  },
  {
    key: "share-report",
    label: "Share Reports",
    icon: FileText,
    to: "/share-reports",
    group: "reports",
  },
  {
    key: "access-configuration",
    label: "Access Configuration",
    icon: ShieldCheck,
    to: routes.accessConfiguration,
    group: "admin",
  },
  {
    key: "user-management",
    label: "User Management",
    icon: KeyRound,
    to: routes.userManagement,
    group: "admin",
    superAdminOnly: true,
  },
  {
    key: "about",
    label: "About",
    icon: Info,
    to: "/about",
    group: "help",
    publicAfterLogin: true,
  },
  {
    key: "help",
    label: "Help",
    icon: HelpCircle,
    to: "/help",
    group: "help",
    publicAfterLogin: true,
  },
];

const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  storageKeys: {
    user: "authUser",
  },
  roles,
  roleGroups: {
    adminAccess: [roles.superadmin, roles.admin],
    superAdminAccess: [roles.superadmin],
    assignableAccess: [roles.user],
  },
  routes,
  navItems: sidebarNavItems,
  groupTitles: {
    main: "Dashboard",
    production: "Production",
    config: "Configuration",
    operations: "Operations",
    reports: "Reports",
    admin: "Administration",
    help: "Help",
  },
  routeToPageKey: sidebarNavItems.reduce((acc, item) => {
    acc[item.to] = item.key;
    return acc;
  }, {}),

  // Cycle time constants
  cycleTime: {
    designCT: 60,
  },

  // Line cycle time constants
  lineCycleTime: {
    designCT: 60,
  },

  // Production filter constants
  production: {
    shifts: [
      { label: "All Shift", value: "All" },
      { label: "Shift A", value: "A" },
      { label: "Shift B", value: "B" },
      { label: "Shift C", value: "C" },
    ],
    months: [
      { label: "All", value: "All" },
      { label: "January", value: "January" },
      { label: "February", value: "February" },
      { label: "March", value: "March" },
      { label: "April", value: "April" },
      { label: "May", value: "May" },
      { label: "June", value: "June" },
      { label: "July", value: "July" },
      { label: "August", value: "August" },
      { label: "September", value: "September" },
      { label: "October", value: "October" },
      { label: "November", value: "November" },
      { label: "December", value: "December" },
    ],
  },
};

export default appConfig;
export const { groupTitles, navItems, routeToPageKey } = appConfig;
