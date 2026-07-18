"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddWish() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Available");
const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  async function saveWish(e: React.FormEvent) {
    e.preventDefault();

    const parsedPrice = Number(price);

if (!title.trim()) {
  alert("Please enter a product name.");
  return;
}

if (isNaN(parsedPrice) || parsedPrice < 0) {
  alert("Please enter a valid price.");
  return;
}

setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("wishlist_items")
      .insert({
  user_id: user.id,
  title,
  description,
  price: parsedPrice,
  image_url: imageUrl,
  product_url: productUrl,
  priority,
  status,
  is_purchased: isPurchased,
});

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function uploadImage(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  setUploadingImage(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setUploadingImage(false);
    return;
  }

  const fileName = `${user.id}-${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("avatars") // later we'll change this to "wish-images"
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    alert(error.message);
    setUploadingImage(false);
    return;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  setImageUrl(data.publicUrl);

  setUploadingImage(false);
}


  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl p-8">
        <Card>
          <CardContent className="space-y-6 p-8">
            <h1 className="text-3xl font-bold">
              Add New Wish
            </h1>

            <form
              onSubmit={saveWish}
              className="space-y-5"
            >
              <Input
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

             <div className="space-y-2">
  <Input
    type="number"
    placeholder="Price (₹)"
    min="0"
    step="1"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required
  />

  {price && !isNaN(Number(price)) && (
    <p className="text-sm text-gray-500">
      Estimated Price:{" "}
      <span className="font-semibold">
        ₹{Number(price).toLocaleString("en-IN")}
      </span>
    </p>
  )}
</div>

             <div className="space-y-3">

  <Input
    type="file"
    accept="image/*"
    onChange={uploadImage}
  />

  {uploadingImage && (
    <p className="text-sm text-blue-600">
      Uploading image...
    </p>
  )}

</div>

              {imageUrl && (
  <div className="border rounded-lg p-4">
    <p className="mb-2 text-sm font-medium">
      Image Preview
    </p>

    <img
      src={imageUrl}
      alt="Preview"
      className="h-48 w-full rounded-lg object-contain"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </div>
)}

        <div className="space-y-3">
  <Input
    placeholder="Amazon / Flipkart Link"
    value={productUrl}
    onChange={(e) => setProductUrl(e.target.value)}
  />

  {productUrl && (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => window.open(productUrl, "_blank")}
    >
      🔗 Test Product Link
    </Button>
  )}
</div>     

              <div>
  <label className="mb-2 block font-medium">
    Priority
  </label>

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full rounded-md border p-3"
  >
    <option value="Low">🟢 Low</option>
    <option value="Medium">🟡 Medium</option>
    <option value="High">🔴 High</option>
  </select>
</div>
<div>
  <label className="mb-2 block font-medium">
    Status
  </label>

  <select
    value={status}
    onChange={(e) => {
      setStatus(e.target.value);
      setIsPurchased(e.target.value === "Purchased");
    }}
    className="w-full rounded-md border p-3"
  >
    <option value="Available">🛍️ Available</option>
    <option value="Purchased">✅ Purchased</option>
  </select>
</div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Wish"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}