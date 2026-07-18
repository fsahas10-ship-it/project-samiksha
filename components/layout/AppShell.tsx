"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="lg:ml-72">
        <Topbar />

        <main className="p-6 pb-24">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}