import { cva, type VariantProps } from "class-variance-authority";

export const fileUploadVariants = cva(["flex w-full flex-col gap-3"]);

/** The `<label>` that wraps the sr-only file input — the visible drop target. */
export const dropzoneVariants = cva(
  [
    "flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed bg-surface px-6 py-10 text-center",
    "rounded-lg border-border",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    // The sr-only input is a preceding sibling, so its focus-visible state paints the box.
    "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-surface",
    "data-dragging:border-primary data-dragging:bg-primary/5",
    "data-invalid:border-danger",
    "data-disabled:cursor-not-allowed data-disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "py-6",
        md: "py-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const fileListVariants = cva(["flex w-full flex-col gap-2"]);

export const fileRowVariants = cva([
  "flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2",
  "data-[status=error]:border-danger",
]);

export const fileRowProgressVariants = cva([
  "h-1.5 w-full overflow-hidden rounded-full bg-border",
]);

export const fileRowProgressBarVariants = cva([
  "h-full rounded-full bg-primary transition-[width] duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
]);

export type FileUploadVariantsProps = VariantProps<typeof fileUploadVariants>;
export type DropzoneVariantsProps = VariantProps<typeof dropzoneVariants>;
