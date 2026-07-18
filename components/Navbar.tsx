"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/dashboard"
          className="text-2xl font-bold"
        >
          🎁 Project Samiksha
        </Link>

        <nav className="flex items-center gap-6">

          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard"
                ? "font-semibold"
                : "text-gray-500"
            }
          >
            Dashboard
          </Link>

          <Link
            href="/add-wish"
            className={
              pathname === "/add-wish"
                ? "font-semibold"
                : "text-gray-500"
            }
          >
            Add Wish
          </Link>

          <Link
            href="/profile"
            className={
              pathname === "/profile"
                ? "font-semibold"
                : "text-gray-500"
            }
          >
            Profile
          </Link>

          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </nav>

      </div>
    </header>
  );
}