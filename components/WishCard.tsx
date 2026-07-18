"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

type WishCardProps = {
  wish: Wish;
  showActions?: boolean;
};

export default function WishCard({
  wish,
  showActions = true,
}: WishCardProps) {
  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      {wish.image_url && (
        <img
          src={wish.image_url}
          alt={wish.title}
          className="h-56 w-full object-cover"
        />
      )}

      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{wish.title}</h2>

          <Badge>{wish.priority || "Low"}</Badge>
        </div>

        <p className="text-gray-600">{wish.description}</p>

        <p className="text-2xl font-bold">
          ₹{Number(wish.price).toLocaleString("en-IN")}
        </p>

        {wish.is_purchased && (
          <Badge variant="secondary">Purchased</Badge>
        )}

        {showActions && (
          <div className="flex gap-2">
            <Link href={`/edit/${wish.id}`} className="flex-1">
              <Button className="w-full">Edit</Button>
            </Link>

            {wish.product_url && (
              <a
                href={wish.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full">
                  View
                </Button>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}