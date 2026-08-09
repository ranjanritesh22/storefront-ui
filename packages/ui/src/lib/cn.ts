import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class lists with clsx, then resolve Tailwind utility conflicts with
 * tailwind-merge. Every component's `className` prop is merged through this,
 * last, so the consumer always wins (see ARCHITECTURE.md §4, layer 3).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
