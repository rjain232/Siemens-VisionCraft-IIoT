import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import GlobalCadenceRunner from "./GlobalCadenceRunner";
import GlobalWidgetSlot from "../../sharedComponents/GlobalWidgetSlot";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div
        className={`flex min-h-[calc(100vh-4rem)] flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"
        }`}
      >
        <main className="flex-1 p-4 lg:p-6">
          <Breadcrumbs />
          <GlobalWidgetSlot />
          <Outlet />
        </main>
        <Footer />
        <GlobalCadenceRunner />
      </div>
    </div>
  );
}
