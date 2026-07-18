"use client";

import { Bell, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b h-16 px-6 flex items-center justify-between">

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search people or wishes..."
          className="w-full rounded-xl border pl-10 pr-4 py-2 outline-none"
        />

      </div>

      <div className="flex items-center gap-4 ml-6">

        <Link
          href="/add-wish"
          className="bg-black text-white rounded-xl px-4 py-2 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Wish
        </Link>

        <Link href="/notifications">
          <Bell size={22} />
        </Link>

      </div>

    </header>
  );
}