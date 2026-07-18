import { supabase } from "@/lib/supabase";

export async function createNotification({
  userId,
  actorId,
  type,
  title,
  message,
  link,
}: {
  userId: string;
  actorId?: string;
  type: string;
  title: string;
  message?: string;
  link?: string;
}) {
  const { error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      actor_id: actorId,
      type,
      title,
      message,
      link,
    });

  if (error) throw error;
}

export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function markAsRead(id: number) {
  const { error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function unreadCount(userId: string) {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error) throw error;

  return count ?? 0;
}