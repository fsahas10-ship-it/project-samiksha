"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100 text-slate-900">

      {/* Desktop Sidebar */}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main */}

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-24" : "lg:ml-72"
        }`}
      >
        {/* Top Navigation */}

        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
          <Topbar
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={() =>
              setSidebarCollapsed(!sidebarCollapsed)
            }
          />
        </header>

        {/* Content */}

        <main className="pb-28">
          <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}

      <MobileNav />
    </div>
  );
}