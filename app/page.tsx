import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">
        Project Samiksha
      </h1>

      <p className="mt-6 text-xl text-gray-600">
        The future of meaningful gifting.
      </p>

      <button className="mt-10 rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800">
        Coming Soon
      </button>
    </main>
  );
}
