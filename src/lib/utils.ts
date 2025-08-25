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
