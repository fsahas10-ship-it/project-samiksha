import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

      <h1 className="text-6xl font-bold">
        Project Samiksha
      </h1>

      <p className="mt-4 text-xl text-gray-600 text-center">
        The future of meaningful gifting.
      </p>

      <div className="mt-10 flex gap-4">

        <Link
          href="/signup"
          className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Create Account
        </Link>

        <Link
          href="/login"
          className="rounded-xl border border-black px-6 py-3 hover:bg-gray-100"
        >
          Login
        </Link>

      </div>

    </main>
  );
}