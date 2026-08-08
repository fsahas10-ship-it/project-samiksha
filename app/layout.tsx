import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Samiksha",
    template: "%s • Samiksha",
  },
  description:
    "Discover, share and organize wishlists with friends and family.",
  applicationName: "Samiksha",
  keywords: [
    "wishlist",
    "gift",
    "shopping",
    "social",
    "wishlist app",
    "samiksha",
  ],
  authors: [
    {
      name: "Sahas Farsole",
    },
  ],
  creator: "Sahas Farsole",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans antialiased"
      )}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}