"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/home");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      setGoogleLoading(false);
      alert(error.message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-5">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Samiksha
          </h1>

          <p className="mt-2 text-gray-500">
            Your wishlist, beautifully organized.
          </p>
        </div>

        <div className="mt-8 space-y-4">

          {/* Google */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-3 font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.39Z"
              />
              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.04H3.28v2.51A9.74 9.74 0 0 0 12 21.5Z"
              />
              <path
                fill="#FBBC05"
                d="M6.53 13.59a5.85 5.85 0 0 1 0-3.18V7.9H3.28a9.75 9.75 0 0 0 0 8.2l3.25-2.51Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.4l3.25 2.51C7.3 8.09 9.46 6.37 12 6.37Z"
              />
            </svg>

            {googleLoading
              ? "Connecting..."
              : "Continue with Google"}
          </button>

          {/* Divider */}

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Email */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {/* Login */}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading || googleLoading}
            className="w-full rounded-xl bg-black p-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="font-semibold text-black hover:underline"
          >
            Create one
          </button>
        </p>

      </div>
    </main>
  );
}