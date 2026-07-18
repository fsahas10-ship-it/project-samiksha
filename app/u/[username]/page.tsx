import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import WishCard from "@/components/WishCard";
import FollowButton from "@/components/FollowButton";

export default async function PublicWishlist({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (profileError || !profile) {
    notFound();
  }

  // Fetch wishes
  const { data: wishes } = await supabase
    .from("wishlist_items")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  // Followers count
  const { count: followersCount } = await supabase
    .from("followers")
    .select("*", { count: "exact", head: true })
    .eq("following_id", profile.id);

  // Following count
  const { count: followingCount } = await supabase
    .from("followers")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", profile.id);

  const wishesCount = wishes?.length ?? 0;

  return (
    <main className="max-w-6xl mx-auto pb-12">
      {/* Cover */}
      <div className="h-56 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl" />

      {/* Profile */}
      <div className="px-8 -mt-16">
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-6">

              <img
                src={
                  profile.avatar_url ||
                  "https://placehold.co/200x200?text=Avatar"
                }
                alt={profile.full_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <div>
                <h1 className="text-4xl font-bold">
                  {profile.full_name || profile.username}
                </h1>

                <p className="text-gray-500 text-lg">
                  @{profile.username}
                </p>

                {profile.bio && (
                  <p className="mt-3 text-gray-700 max-w-xl">
                    {profile.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">

                  {profile.location && (
                    <span>📍 {profile.location}</span>
                  )}

                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      🌐 Website
                    </a>
                  )}

                </div>
              </div>
            </div>

            {/* Follow button coming next */}
           <FollowButton profileId={profile.id} />

          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 text-center">

            <div>
              <p className="text-3xl font-bold">
                {followersCount ?? 0}
              </p>
              <p className="text-gray-500">
                Followers
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">
                {followingCount ?? 0}
              </p>
              <p className="text-gray-500">
                Following
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">
                {wishesCount}
              </p>
              <p className="text-gray-500">
                Wishes
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Wishlist */}
      <div className="px-8 mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Wishlist
        </h2>

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

      </div>
    </main>
  );
}