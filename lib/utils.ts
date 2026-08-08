import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Tailwind class merge */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* Currency */

export function formatCurrency(value?: number | null) {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/* Number */

export function formatNumber(value?: number | null) {
  if (!value) return "0";

  return new Intl.NumberFormat("en-IN").format(value);
}

/* Relative Time */

export function timeAgo(date: string | Date) {
  const now = new Date().getTime();
  const then = new Date(date).getTime();

  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60)
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  if (days < 30)
    return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);

  if (months < 12)
    return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);

  return `${years} year${years > 1 ? "s" : ""} ago`;
}

/* Initials */

export function getInitials(name?: string | null) {
  if (!name) return "?";

  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

/* URL */

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/* Random Gradient */

const gradients = [
  "from-violet-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-fuchsia-500",
];

export function randomGradient(seed?: string) {
  if (!seed) return gradients[0];

  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash) % gradients.length];
}

/* Priority */

export function priorityColor(priority?: string | null) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 border-red-200";

    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";

    default:
      return "bg-green-100 text-green-700 border-green-200";
  }
}

/* Purchased */

export function purchasedText(value?: boolean | null) {
  return value ? "Purchased" : "Available";
}