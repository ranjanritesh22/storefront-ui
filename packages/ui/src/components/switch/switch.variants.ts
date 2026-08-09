import { cva, type VariantProps } from "class-variance-authority";

/** Wraps the Radix `Switch.Root` plus the optional label/description text. */
export const switchVariants = cva(["inline-flex items-center gap-2 font-sans text-foreground"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Styles the Radix `Switch.Root` (the track) — the focusable element. */
export const switchTrackVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "data-[state=checked]:bg-primary",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-invalid:border-danger data-invalid:focus-visible:ring-danger",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Positioned with logical `inset-inline-start` (not `translate-x`) so the
 * slide direction flips for free under `dir="rtl"` — CLAUDE.md rule 7.
 */
export const switchThumbVariants = cva(
  [
    "pointer-events-none absolute inset-y-0.5 start-0.5 block rounded-full bg-surface shadow-sm",
    "transition-[inset-inline-start] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  ],
  {
    variants: {
      size: {
        sm: "size-4 data-[state=checked]:start-[1.125rem]",
        md: "size-5 data-[state=checked]:start-[1.375rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SwitchVariantsProps = VariantProps<typeof switchVariants>;
