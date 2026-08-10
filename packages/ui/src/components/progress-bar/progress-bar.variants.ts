import { cva, type VariantProps } from "class-variance-authority";

export const progressBarTrackVariants = cva(
  ["relative w-full overflow-hidden rounded-full bg-surface-raised"],
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * `indeterminate` swaps a value-driven `width` (set inline by the component,
 * since it's numeric and per-instance) for a fixed-width bar that slides via
 * the `progress-indeterminate` keyframes declared in styles/index.css.
 */
export const progressBarFillVariants = cva(
  [
    "h-full rounded-full",
    "transition-[width] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  ],
  {
    variants: {
      tone: {
        primary: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
      },
      indeterminate: {
        true: "w-1/3 motion-safe:animate-[progress-indeterminate_1.4s_ease-in-out_infinite] motion-reduce:w-full motion-reduce:opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      tone: "primary",
      indeterminate: false,
    },
  },
);

export type ProgressBarTrackVariantsProps = VariantProps<typeof progressBarTrackVariants>;
export type ProgressBarFillVariantsProps = VariantProps<typeof progressBarFillVariants>;
