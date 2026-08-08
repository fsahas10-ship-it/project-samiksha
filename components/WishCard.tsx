"use client";

import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Wish = {
  id: number;
  title: string;
  description?: string | null;
  price?: number | null;
  priority?: string | null;
  category?: string | null;
  image_url?: string | null;
  product_url?: string | null;
  is_purchased?: boolean | null;
};

type WishCardProps = {
  wish: Wish;
  showActions?: boolean;
};

export default function WishCard({
  wish,
  showActions = true,
}: WishCardProps) {
  const priorityColor =
    wish.priority === "High"
      ? "bg-red-100 text-red-700"
      : wish.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <Card className="group overflow-hidden rounded-3xl border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {wish.image_url ? (
            <img
              src={wish.image_url}
              alt={wish.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {wish.is_purchased && (
          <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            Purchased
          </div>
        )}

        <div className="absolute right-3 top-3">
          <Badge className={priorityColor}>
            {wish.priority ?? "Low"}
          </Badge>
        </div>
      </div>

      <CardContent className="space-y-4 p-5">
        {wish.category && (
          <p className="text-xs uppercase tracking-widest text-gray-400">
            {wish.category}
          </p>
        )}

        <Link href={`/wish/${wish.id}`}>
  <h2 className="line-clamp-2 cursor-pointer text-xl font-bold transition hover:text-indigo-600">
    {wish.title}
  </h2>
</Link>

        {wish.description && (
          <p className="line-clamp-2 text-sm text-gray-600">
            {wish.description}
          </p>
        )}

        <div className="border-t pt-4">
          <p className="text-xs text-gray-400">
            Estimated Price
          </p>

          <p className="text-3xl font-bold">
            {wish.price
              ? `₹${Number(wish.price).toLocaleString("en-IN")}`
              : "—"}
          </p>
        </div>

        {/* Social Actions */}

        <div className="flex items-center justify-between border-t pt-4">
          <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-gray-500 transition hover:bg-red-50 hover:text-red-500">
            <Heart size={18} />
            <span className="text-sm">Like</span>
          </button>

          <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-gray-500 transition hover:bg-blue-50 hover:text-blue-500">
            <MessageCircle size={18} />
            <span className="text-sm">Comment</span>
          </button>

          <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-gray-500 transition hover:bg-gray-100 hover:text-black">
            <Bookmark size={18} />
            <span className="text-sm">Save</span>
          </button>
        </div>

        {showActions && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link href={`/edit/${wish.id}`}>
              <Button className="w-full rounded-xl">
                Edit
              </Button>
            </Link>

            {wish.product_url ? (
              <a
                href={wish.product_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                >
                  View
                </Button>
              </a>
            ) : (
              <Button
                disabled
                variant="outline"
                className="w-full rounded-xl"
              >
                No Link
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}