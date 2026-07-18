"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import WishCard from "../../components/WishCard";

import { Button } from "../../components/ui/button";
import { supabase } from "../../lib/supabase";

type Wish = {
  id: number;
  title: string;
  description: string;
  price: number;
  priority?: string;
  image_url?: string;
  product_url?: string;
  is_purchased?: boolean;
};

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    setName(profile?.full_name || "User");

    const { data, error } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setWishes(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl p-8">
          <h2 className="text-xl">Loading...</h2>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {name} 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your wishlist.
            </p>
          </div>

          <Link href="/add-wish">
            <Button>
              + Add Wish
            </Button>
          </Link>

        </div>

        {wishes.length === 0 ? (
          <div className="rounded-xl border p-10 text-center">

            <h2 className="text-2xl font-bold">
              No wishes yet
            </h2>

            <p className="mt-3 text-gray-500">
              Add your first wishlist item.
            </p>

            <Link href="/add-wish">
              <Button className="mt-6">
                Add Wish
              </Button>
            </Link>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishes.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
              />
            ))}
          </div>
        )}

      </main>
    </>
  );
}