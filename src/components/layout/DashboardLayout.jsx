import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Toaster richColors position="top-right" />

      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex flex-col flex-1 min-h-screen lg:ml-64 transition-all duration-300">
        <Navbar toggle={toggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
