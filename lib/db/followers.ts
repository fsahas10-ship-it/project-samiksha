import { supabase } from "@/lib/supabase";

export async function getFollowersCount(userId: string) {
  const { count } = await supabase
    .from("followers")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  return count ?? 0;
}

export async function getFollowingCount(userId: string) {
  const { count } = await supabase
    .from("followers")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);

  return count ?? 0;
}

export async function isFollowing(
  followerId: string,
  followingId: string
) {
  const { data } = await supabase
    .from("followers")
    .select("id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();

  return !!data;
}

export async function follow(
  followerId: string,
  followingId: string
) {
  return supabase.from("followers").insert({
    follower_id: followerId,
    following_id: followingId,
  });
}

export async function unfollow(
  followerId: string,
  followingId: string
) {
  return supabase
    .from("followers")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
}