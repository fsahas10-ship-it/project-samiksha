"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  follow,
  unfollow,
  isFollowing,
} from "@/lib/db/followers";

interface Props {
  profileId: string;
}

export default function FollowButton({ profileId }: Props) {
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    checkFollowing();
  }, []);

  async function checkFollowing() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setCurrentUser(user.id);

    if (user.id === profileId) {
      setLoading(false);
      return;
    }

    const followingStatus = await isFollowing(user.id, profileId);
    setFollowing(followingStatus);

    setLoading(false);
  }

  async function toggleFollow() {
    if (!currentUser) return;

    setLoading(true);

    try {
      if (following) {
        await unfollow(currentUser, profileId);
        setFollowing(false);
      } else {
        await follow(currentUser, profileId);
        setFollowing(true);
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <button
        disabled
        className="px-8 py-3 rounded-xl bg-gray-300 animate-pulse"
      >
        Loading...
      </button>
    );
  }

  if (!currentUser) {
    return null;
  }

  if (currentUser === profileId) {
    return null;
  }

  return (
    <button
      onClick={toggleFollow}
      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
        following
          ? "bg-gray-200 hover:bg-gray-300 text-black"
          : "bg-black hover:bg-gray-800 text-white"
      }`}
    >
      {following ? "Following ✓" : "Follow"}
    </button>
  );
}