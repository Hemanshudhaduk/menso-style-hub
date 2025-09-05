import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(' ');
}

// Offer: 30% off if total quantity >= 3
export function computeGaneshOfferDiscount(total: number, totalQuantity: number) {
  if (totalQuantity >= 3) {
    return Math.round(total * 0.3);
  }
  return 0;
}

// Fisher–Yates shuffle
export function shuffleArrayImmutable<T>(array: T[], seed?: number): T[] {
  const result = array.slice();
  let m = result.length;
  // Simple seeded PRNG for stability across renders when seed is provided
  let rnd = seed ?? Math.floor(Math.random() * 1e9);
  const next = () => {
    rnd ^= rnd << 13; rnd ^= rnd >>> 17; rnd ^= rnd << 5; // xorshift32
    return (rnd >>> 0) / 0xffffffff;
  };
  while (m) {
    const i = Math.floor((seed === undefined ? Math.random() : next()) * m--);
    const t = result[m];
    result[m] = result[i];
    result[i] = t;
  }
  return result;
}