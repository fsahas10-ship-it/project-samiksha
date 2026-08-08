"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Bell,
  User,
  Settings,
  Gift,
  Calendar,
  FolderOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const links = [
  {
    href: "/home",
    label: "Home",
    icon: Home,
  },
  {
    href: "/discover",
    label: "Discover",
    icon: Search,
  },
  {
    href: "/add-wish",
    label: "Add Wish",
    icon: Gift,
  },
  {
    href: "/collections",
    label: "Collections",
    icon: FolderOpen,
  },
  {
    href: "/birthdays",
    label: "Birthdays",
    icon: Calendar,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 hidden h-screen border-r border-slate-200 bg-white/80 backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
            <Sparkles size={22} />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Samiksha
              </h1>

              <p className="text-sm text-slate-500">
                Wishlist Platform
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="rounded-xl p-2 transition hover:bg-slate-100"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={`group flex items-center rounded-2xl transition-all duration-200 ${
                collapsed
                  ? "justify-center p-4"
                  : "gap-4 px-4 py-3"
              } ${
                active
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={20} />

              {!collapsed && (
                <span className="font-medium">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Card */}

      <div className="border-t border-slate-200 p-4">
        <div
          className={`rounded-2xl bg-slate-100 transition-all ${
            collapsed
              ? "flex justify-center p-3"
              : "flex items-center gap-3 p-4"
          }`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">
            S
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate font-semibold">
                Your Account
              </p>

              <p className="truncate text-sm text-slate-500">
                Manage Profile
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}