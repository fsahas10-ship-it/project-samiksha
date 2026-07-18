"use client";

import Link from "next/link";
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
  return (
    <Card className="overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {wish.image_url ? (
          <img
            src={wish.image_url}
            alt={wish.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold leading-tight">
            {wish.title}
          </h2>

          <Badge>
            {wish.priority ?? "Low"}
          </Badge>
        </div>

        {wish.category && (
          <Badge variant="secondary">
            {wish.category}
          </Badge>
        )}

        {wish.description && (
          <p className="line-clamp-2 text-sm text-gray-600">
            {wish.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">
            {wish.price
              ? `₹${Number(wish.price).toLocaleString("en-IN")}`
              : "Price not set"}
          </p>

          {wish.is_purchased && (
            <Badge variant="secondary">
              Purchased
            </Badge>
          )}
        </div>

        {showActions && (
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/edit/${wish.id}`}>
              <Button className="w-full">
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
                  className="w-full"
                >
                  View
                </Button>
              </a>
            ) : (
              <Button
                disabled
                variant="outline"
                className="w-full"
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