"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import WishCard from "@/components/WishCard";
import { Button } from "@/components/ui/button";

type Wish = {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  product_url: string | null;
};

export default function HomePage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishes();
  }, []);

  async function loadWishes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setWishes(data || []);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Wishlist</h1>
          <p className="text-gray-500">
            Manage everything you want in one place.
          </p>
        </div>

        <Link href="/add-wish">
          <Button>Add Wish</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : wishes.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <p>No wishes yet.</p>
          <Link href="/add-wish">
            <Button className="mt-4">Create your first wish</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wishes.map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
            />
          ))}
        </div>
      )}
    </div>
  );
}