import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import appConfig from "./config/appConfig";
import { AuthProvider } from "./context/AuthContext";
import { SubTabProvider } from "./context/SubTabContext";
import MasterLogin from "./pages/master/MasterLogin";
import SystemLogin from "./pages/master/SystemLogin";
import SuperAdminSetup from "./pages/setup/SuperAdminSetup";
import { ChartShimmer, KPIShimmer } from "./sharedComponents/Shimmer";

const About = lazy(() => import("./pages/About"));
const AccessConfiguration = lazy(() => import("./pages/admin/AccessConfiguration"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Help = lazy(() => import("./pages/Help"));
const Maintenance = lazy(() => import("./pages/maintenance"));
const PartMarriageComponent = lazy(() => import("./pages/part-marriage"));
const ShareReports = lazy(() => import("./pages/reports"));
const ProcessConfigurator = lazy(() => import("./pages/process-configurator"));
const OEE = lazy(() => import("./pages/production/oee"));
const ProductionControl = lazy(() => import("./pages/production/production-control"));
const RobotMonitoring = lazy(() => import("./pages/production/robot-monitoring"));
const SiemensPlantHMI = lazy(() => import("./pages/SiemensPlantHMI"));
const CleanroomHvacDashboard = lazy(() => import("./pages/hvac/CleanroomHvacDashboard"));
const ThirdPartyData = lazy(() => import("./pages/third-party-data"));
const SolvynSmartGrid = lazy(() => import("./pages/SolvynSmartGrid"));

function PageFallback() {
  return (
    <div className="p-4 space-y-4">
      <KPIShimmer />
      <ChartShimmer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SubTabProvider>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={appConfig.routes.master} />}
            />
            <Route path={appConfig.routes.master} element={<MasterLogin />} />
            <Route
              path={appConfig.routes.superAdminSetup}
              element={<SuperAdminSetup />}
            />
            <Route path="/login/:systemId" element={<SystemLogin />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path={appConfig.routes.dashboard}
                  element={<Suspense fallback={<PageFallback />}><Dashboard /></Suspense>}
                />
                <Route path="oee" element={<Suspense fallback={<PageFallback />}><OEE /></Suspense>} />
                <Route path="robot-monitoring" element={<Suspense fallback={<PageFallback />}><RobotMonitoring /></Suspense>} />
                <Route path="siemens-hmi" element={<Suspense fallback={<PageFallback />}><SiemensPlantHMI /></Suspense>} />
                <Route path="cleanroom-hvac" element={<Suspense fallback={<PageFallback />}><CleanroomHvacDashboard /></Suspense>} />
                <Route path="solvyn-smartgrid" element={<Suspense fallback={<PageFallback />}><SolvynSmartGrid /></Suspense>} />
                <Route
                  path="production-control"
                  element={<Suspense fallback={<PageFallback />}><ProductionControl /></Suspense>}
                />
                <Route path="maintenance" element={<Suspense fallback={<PageFallback />}><Maintenance /></Suspense>} />
                <Route
                  path="process-configurator"
                  element={<Suspense fallback={<PageFallback />}><ProcessConfigurator /></Suspense>}
                />
                <Route path="third-party-report" element={<Suspense fallback={<PageFallback />}><ThirdPartyData /></Suspense>} />
                <Route
                  path="part-marriage"
                  element={<Suspense fallback={<PageFallback />}><PartMarriageComponent /></Suspense>}
                />
                <Route path="share-reports" element={<Suspense fallback={<PageFallback />}><ShareReports /></Suspense>} />
                <Route path="about" element={<Suspense fallback={<PageFallback />}><About /></Suspense>} />
                <Route path="help" element={<Suspense fallback={<PageFallback />}><Help /></Suspense>} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute requireAdmin />}>
              <Route element={<Layout />}>
                <Route
                  path="access-configuration"
                  element={<Suspense fallback={<PageFallback />}><AccessConfiguration /></Suspense>}
                />
              </Route>
            </Route>

            <Route element={<ProtectedRoute requireSuperAdmin />}>
              <Route element={<Layout />}>
                <Route path="user-management" element={<Suspense fallback={<PageFallback />}><UserManagement /></Suspense>} />
              </Route>
            </Route>
          </Routes>
        </SubTabProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
