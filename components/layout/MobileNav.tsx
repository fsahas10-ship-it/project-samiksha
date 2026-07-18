"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Heart,
  Bell,
  User,
} from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t lg:hidden flex justify-around items-center">

      <Link href="/home">
        <Home />
      </Link>

      <Link href="/discover">
        <Search />
      </Link>

      <Link href="/add-wish">
        <Heart />
      </Link>

      <Link href="/notifications">
        <Bell />
      </Link>

      <Link href="/profile">
        <User />
      </Link>

    </nav>
  );
}