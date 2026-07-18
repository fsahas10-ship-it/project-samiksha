"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Heart,
  Bell,
  User,
  Settings,
  Gift,
  Calendar,
  FolderOpen,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r flex-col">

      <div className="p-8 border-b">
        <h1 className="text-3xl font-bold">
          Samiksha
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          href="/home"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          href="/discover"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <Search size={20} />
          Discover
        </Link>

        <Link
          href="/add-wish"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <Gift size={20} />
          Wishlist
        </Link>

        <Link
          href="/collections"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <FolderOpen size={20} />
          Collections
        </Link>

        <Link
          href="/birthdays"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <Calendar size={20} />
          Birthdays
        </Link>

        <Link
          href="/notifications"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <Bell size={20} />
          Notifications
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100"
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>
    </aside>
  );
}