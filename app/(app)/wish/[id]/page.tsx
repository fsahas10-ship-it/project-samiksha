"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function WishPage() {
  const { id } = useParams();

  const [wish, setWish] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWish();
  }, []);

  async function loadWish() {
    const { data } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("id", id)
      .single();

    setWish(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        Loading...
      </div>
    );
  }

  if (!wish) {
    return (
      <div className="text-center py-32">
        Wish not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <Link
        href="/discover"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">

        <div>
          <img
            src={
              wish.image_url ||
              "https://placehold.co/900x900?text=No+Image"
            }
            alt={wish.title}
            className="aspect-square w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        <div className="space-y-8">

          <div>

            <p className="uppercase tracking-[0.3em] text-gray-400 text-sm">
              {wish.category}
            </p>

            <h1 className="mt-3 text-5xl font-bold">
              {wish.title}
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              {wish.description}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Estimated Price
            </p>

            <h2 className="text-5xl font-bold">
              ₹{Number(wish.price || 0).toLocaleString("en-IN")}
            </h2>

          </div>

          <div className="flex gap-4 flex-wrap">

            <button className="rounded-xl border px-5 py-3 hover:bg-red-50 flex items-center gap-2">
              <Heart size={20} />
              Like
            </button>

            <button className="rounded-xl border px-5 py-3 hover:bg-blue-50 flex items-center gap-2">
              <MessageCircle size={20} />
              Comment
            </button>

            <button className="rounded-xl border px-5 py-3 hover:bg-gray-100 flex items-center gap-2">
              <Bookmark size={20} />
              Save
            </button>

            <button className="rounded-xl border px-5 py-3 hover:bg-gray-100 flex items-center gap-2">
              <Share2 size={20} />
              Share
            </button>

          </div>

          {wish.product_url && (
            <a
              href={wish.product_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-black px-8 py-4 text-white hover:bg-gray-800"
            >
              <ExternalLink size={20} />
              Buy / View Product
            </a>
          )}

        </div>

      </div>
    </div>
  );
}