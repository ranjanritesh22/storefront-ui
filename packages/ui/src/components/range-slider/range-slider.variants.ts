import { cva, type VariantProps } from "class-variance-authority";

export const rangeSliderVariants = cva(["relative w-full touch-none select-none"], {
  variants: {
    size: {
      sm: "h-4",
      md: "h-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const rangeSliderTrackVariants = cva(
  ["pointer-events-none absolute top-1/2 w-full -translate-y-1/2 rounded-full bg-border"],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const rangeSliderRangeVariants = cva(
  ["pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-primary"],
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Both thumbs are full-width native `<input type="range">` elements stacked
 * absolutely; the whole input is pointer-events-none except the thumb
 * pseudo-element (webkit/moz), so clicks pass through to whichever thumb is
 * physically under the cursor instead of always hitting the top layer.
 */
export const rangeSliderThumbVariants = cva(
  [
    "pointer-events-none absolute inset-0 m-0 w-full cursor-pointer appearance-none bg-transparent",
    "disabled:cursor-not-allowed",
    "[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent",
    "[&::-moz-range-track]:appearance-none [&::-moz-range-track]:bg-transparent",
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2",
    "[&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface",
    "[&::-webkit-slider-thumb]:shadow-md",
    "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none",
    "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2",
    "[&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface",
    "[&::-moz-range-thumb]:shadow-md",
    "focus-visible:outline-none",
    "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-ring focus-visible:[&::-webkit-slider-thumb]:ring-offset-2",
    "focus-visible:[&::-moz-range-thumb]:ring-2 focus-visible:[&::-moz-range-thumb]:ring-ring focus-visible:[&::-moz-range-thumb]:ring-offset-2",
    "disabled:[&::-webkit-slider-thumb]:opacity-50 disabled:[&::-moz-range-thumb]:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "[&::-webkit-slider-thumb]:size-4 [&::-moz-range-thumb]:size-4",
        md: "[&::-webkit-slider-thumb]:size-5 [&::-moz-range-thumb]:size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type RangeSliderVariantsProps = VariantProps<typeof rangeSliderVariants>;
