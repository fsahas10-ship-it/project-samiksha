"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import WishCard from "@/components/WishCard";
import { Search, Sparkles, TrendingUp } from "lucide-react";

export default function DiscoverPage() {
  const [wishes, setWishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadWishes();
  }, []);

  async function loadWishes() {
    setLoading(true);

    const { data } = await supabase
  .from("wishlist_items")
  .select(`
    *,
    profiles (
      username,
      full_name,
      avatar_url
    )
  `)
  .order("created_at", { ascending: false });

    setWishes(data || []);
    setLoading(false);
  }

  const filtered = wishes.filter((wish) => {
    const text =
      `${wish.title} ${wish.description} ${wish.category}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <Sparkles size={32} />
          <h1 className="text-4xl font-bold">
            Discover Wishes
          </h1>
        </div>

        <p className="mt-4 max-w-2xl text-white/90">
          Explore what people are dreaming about. Find inspiration,
          discover gadgets, books, gaming setups, travel goals,
          architecture ideas and much more.
        </p>
      </div>

      {/* Search */}

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search wishes..."
          className="w-full rounded-2xl border bg-white py-4 pl-12 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <TrendingUp className="mb-3 text-indigo-600" />

          <p className="text-sm text-gray-500">
            Total Wishes
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {wishes.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Categories
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {
              new Set(
                wishes
                  .map((w) => w.category)
                  .filter(Boolean)
              ).size
            }
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Showing
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {filtered.length}
          </h2>
        </div>
      </div>

      {/* Wishes */}

      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Loading wishes...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
          <h2 className="text-2xl font-bold">
            No wishes found
          </h2>

          <p className="mt-3 text-gray-500">
            Try another search.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}