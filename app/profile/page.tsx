"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setUsername(data.username || "");
      setFullName(data.full_name || "");
      setBio(data.bio || "");
      setAvatarUrl(data.avatar_url || "");
    }
  }

  async function uploadAvatar(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file || !userId) return;

    setLoading(true);

    const fileName = `${userId}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    setAvatarUrl(data.publicUrl);

    setLoading(false);
  }

  async function saveProfile() {
    if (!userId) {
      alert("User not found.");
      return;
    }

    setLoading(true);

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    let error;

    if (existing) {
      const result = await supabase
        .from("profiles")
        .update({
          username,
          full_name: fullName,
          bio,
          avatar_url: avatarUrl,
        })
        .eq("id", userId);

      error = result.error;
    } else {
      const result = await supabase
        .from("profiles")
        .insert({
          id: userId,
          username,
          full_name: fullName,
          bio,
          avatar_url: avatarUrl,
        });

      error = result.error;
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile Updated Successfully");

    loadProfile();
  }

  const publicUrl =
    username && typeof window !== "undefined"
      ? `${window.location.origin}/u/${username}`
      : "";

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl p-8">
        <Card>
          <CardContent className="space-y-6 p-8">
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-32 w-32 rounded-full object-cover border"
              />
            )}

            <div>
              <label className="mb-2 block font-medium">
                Profile Picture
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <Input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Username
              </label>

              <Input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Bio
              </label>

              <Textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
              />
            </div>

            {publicUrl && (
              <div className="rounded-lg border p-5 space-y-4">
                <p className="font-semibold">
                  Public Wishlist Link
                </p>

                <Input
                  readOnly
                  value={publicUrl}
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(publicUrl);
                    alert("Copied!");
                  }}
                >
                  Copy Link
                </Button>
              </div>
            )}

            <Button
              className="w-full"
              onClick={saveProfile}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}