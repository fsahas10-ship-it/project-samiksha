"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import WishCard from "@/components/WishCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Wish = {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  priority: string | null;
  category: string | null;
  product_url: string | null;
  is_purchased: boolean | null;
  status?: string | null;
  created_at?: string;
};

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      setUserName(profile.full_name ?? "");
    }

    const { data, error } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading wishes:", error);
      setWishes([]);
    } else {
      setWishes(data || []);
    }

    setLoading(false);
  }

  const filteredWishes = useMemo(() => {
    const query = search.toLowerCase().trim();

    let result = wishes.filter((wish) => {
      if (!query) return true;

      return (
        wish.title.toLowerCase().includes(query) ||
        (wish.description ?? "").toLowerCase().includes(query) ||
        (wish.category ?? "").toLowerCase().includes(query)
      );
    });

    result = [...result];

    if (sort === "price-low") {
      result.sort(
        (a, b) => (a.price ?? 0) - (b.price ?? 0)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => (b.price ?? 0) - (a.price ?? 0)
      );
    }

    if (sort === "priority") {
      const priorityOrder: Record<string, number> = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      result.sort(
        (a, b) =>
          (priorityOrder[b.priority ?? "Low"] ?? 0) -
          (priorityOrder[a.priority ?? "Low"] ?? 0)
      );
    }

    if (sort === "latest") {
      result.sort((a, b) => {
        const dateA = new Date(a.created_at ?? "").getTime();
        const dateB = new Date(b.created_at ?? "").getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [wishes, search, sort]);

  const totalValue = wishes.reduce(
    (sum, wish) => sum + (wish.price ?? 0),
    0
  );

  const purchasedCount = wishes.filter(
    (wish) => wish.is_purchased
  ).length;

  const remainingCount = wishes.filter(
    (wish) => !wish.is_purchased
  ).length;

  const highPriority = wishes.filter(
    (wish) => wish.priority === "High"
  ).length;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="text-sm font-medium text-indigo-600">
            Your Wishlist
          </p>

          <h1 className="mt-1 text-4xl font-extrabold tracking-tight md:text-5xl">
            Welcome{userName ? `, ${userName}` : ""}
          </h1>

          <p className="mt-2 text-gray-500">
            Keep track of everything you would love to have.
          </p>
        </div>

        <Link href="/add-wish">
          <Button className="rounded-xl px-5">
            + Add Wish
          </Button>
        </Link>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Wishes
          </p>

          <p className="mt-2 text-3xl font-bold">
            {wishes.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Purchased
          </p>

          <p className="mt-2 text-3xl font-bold">
            {purchasedCount}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Remaining
          </p>

          <p className="mt-2 text-3xl font-bold">
            {remainingCount}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Wishlist Value
          </p>

          <p className="mt-2 text-2xl font-bold">
            ₹{totalValue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            High Priority
          </p>

          <div className="mt-2">
            <Badge className="rounded-full">
              {highPriority}
            </Badge>
          </div>
        </div>

      </div>

      {/* Loading */}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-3xl bg-white"
            >
              <div className="aspect-square animate-pulse bg-gray-200" />

              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-1/3 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}

        </div>
      ) : wishes.length === 0 ? (

        /* Empty State */

        <div className="rounded-3xl border bg-white px-6 py-20 text-center shadow-sm">

          <div className="mx-auto max-w-md">

            <h2 className="text-2xl font-bold">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Start adding things you'd love to receive.
            </p>

            <Link href="/add-wish">
              <Button className="mt-6 rounded-xl">
                Add Your First Wish
              </Button>
            </Link>

          </div>

        </div>

      ) : (

        <>
          {/* Search + Sort */}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <Input
              placeholder="Search your wishlist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-white md:w-96"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border bg-white px-4 py-2.5 outline-none"
            >
              <option value="latest">
                Latest
              </option>

              <option value="price-low">
                Price: Low → High
              </option>

              <option value="price-high">
                Price: High → Low
              </option>

              <option value="priority">
                Priority
              </option>
            </select>

          </div>

          {/* Wishlist Header */}

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                My Wishlist
              </h2>

              <p className="text-sm text-gray-500">
                {filteredWishes.length}{" "}
                {filteredWishes.length === 1
                  ? "wish"
                  : "wishes"}
              </p>
            </div>

          </div>

          {/* No Search Results */}

          {filteredWishes.length === 0 ? (

            <div className="rounded-3xl border bg-white py-20 text-center">

              <h2 className="text-xl font-semibold">
                No wishes found
              </h2>

              <p className="mt-2 text-gray-500">
                Try a different search.
              </p>

            </div>

          ) : (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredWishes.map((wish) => (
                <WishCard
                  key={wish.id}
                  wish={wish}
                />
              ))}

            </div>

          )}

        </>
      )}

    </div>
  );
}