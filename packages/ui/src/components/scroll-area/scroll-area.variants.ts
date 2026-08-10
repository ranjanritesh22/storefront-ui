import { cva, type VariantProps } from "class-variance-authority";

export const scrollAreaVariants = cva(["relative overflow-hidden"]);

export const scrollAreaViewportVariants = cva([
  "size-full rounded-[inherit]",
  "[&>div]:!block",
]);

export const scrollAreaScrollbarVariants = cva(
  [
    "flex touch-none select-none p-0.5 transition-colors duration-[var(--ui-duration-fast)]",
    "data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col",
  ],
);

export const scrollAreaThumbVariants = cva([
  "relative flex-1 rounded-full bg-border",
]);

export type ScrollAreaVariantsProps = VariantProps<typeof scrollAreaVariants>;
