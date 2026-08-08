"use client";

import Link from "next/link";
import {
  Bell,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
} from "lucide-react";

type TopbarProps = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

export default function Topbar({
  sidebarCollapsed,
  toggleSidebar,
}: TopbarProps) {
  return (
    <header className="flex h-20 items-center gap-6 px-6 lg:px-8">

      {/* Sidebar Toggle */}

      <button
        onClick={toggleSidebar}
        className="hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:bg-slate-100 lg:flex"
      >
        {sidebarCollapsed ? (
          <PanelLeftOpen size={20} />
        ) : (
          <PanelLeftClose size={20} />
        )}
      </button>

      {/* Mobile Menu */}

      <button className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:hidden">
        <Menu size={20} />
      </button>

      {/* Search */}

      <div className="relative hidden max-w-xl flex-1 md:block">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search wishes, users, collections..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Right Side */}

      <div className="ml-auto flex items-center gap-3">

        <Link href="/add-wish">
          <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            <Plus size={18} />
            <span className="hidden sm:inline">
              Add Wish
            </span>
          </button>
        </Link>

        <button className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <Link href="/profile">
          <div className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-semibold text-white">
              S
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold">
                Sahas
              </p>

              <p className="text-xs text-slate-500">
                Premium Member
              </p>
            </div>
          </div>
        </Link>

      </div>

    </header>
  );
}