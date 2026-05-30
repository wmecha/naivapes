import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKes(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isAdult(dateOfBirth: string, today = new Date()) {
  const dob = new Date(dateOfBirth);

  if (Number.isNaN(dob.getTime())) {
    return false;
  }

  const adultDate = new Date(dob);
  adultDate.setFullYear(adultDate.getFullYear() + 18);

  return adultDate <= today;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
