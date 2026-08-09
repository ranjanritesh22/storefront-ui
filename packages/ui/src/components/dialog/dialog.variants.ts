import { cva, type VariantProps } from "class-variance-authority";

/**
 * z-index reads --ui-z-overlay/--ui-z-modal directly — like button.variants.ts's
 * motion timing, the z-index scale isn't aliased into Tailwind's theme
 * namespace (only colour/radius/font/shadow are, see styles/index.css).
 */
export const dialogOverlayVariants = cva([
  "fixed inset-0 z-[var(--ui-z-overlay)] bg-overlay",
  "transition-opacity duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
]);

export const dialogContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-[var(--ui-z-modal)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
    "rounded-lg border border-border bg-surface shadow-lg",
    "transition-[opacity,transform] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
    "data-[state=open]:opacity-100 data-[state=open]:scale-100",
    "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm p-6",
        md: "max-w-md p-6",
        lg: "max-w-lg p-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type DialogContentVariantsProps = VariantProps<typeof dialogContentVariants>;
