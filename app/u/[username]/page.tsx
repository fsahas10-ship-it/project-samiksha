import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import WishCard from "@/components/WishCard";

export default async function PublicWishlist({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // Find the profile by username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (profileError || !profile) {
    notFound();
  }

  // Fetch wishlist items for that user
  const { data: wishes } = await supabase
    .from("wishlist_items")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-10">
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-28 h-28 rounded-full mx-auto object-cover border"
          />
        )}

        <h1 className="text-4xl font-bold mt-4">
          {profile.full_name || profile.username}
        </h1>

        {profile.bio && (
          <p className="text-gray-500 mt-2">
            {profile.bio}
          </p>
        )}
      </div>

      {wishes && wishes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              showActions={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No wishes added yet.
        </div>
      )}
    </main>
  );
}