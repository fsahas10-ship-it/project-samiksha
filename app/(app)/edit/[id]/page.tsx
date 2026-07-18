"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditWishPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWish();
  }, []);

  async function loadWish() {
    const { data, error } = await supabase
      .from("wishlist_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Wish not found.");
      router.push("/home");
      return;
    }

    setTitle(data.title || "");
    setDescription(data.description || "");
    setPrice(data.price?.toString() || "");
    setProductUrl(data.product_url || "");
    setImageUrl(data.image_url || "");
    setPriority(data.priority || "Medium");

    setLoading(false);
  }

  async function updateWish() {
    const { error } = await supabase
      .from("wishlist_items")
      .update({
        title,
        description,
        price: Number(price),
        product_url: productUrl,
        image_url: imageUrl,
        priority,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Wish updated successfully!");
    router.push("/home");
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="p-8 text-center">
          Loading...
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-8">
        <Card>
          <CardContent className="space-y-5 p-8">
            <h1 className="text-3xl font-bold">
              Edit Wish
            </h1>

            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Input
              placeholder="Product URL"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
            />

            <Input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <select
              className="w-full rounded-md border p-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <Button
              className="w-full"
              onClick={updateWish}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}