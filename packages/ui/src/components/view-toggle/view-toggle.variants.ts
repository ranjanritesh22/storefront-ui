import { cva, type VariantProps } from "class-variance-authority";

/** The `role="radiogroup"` root — a segmented-control track around the two buttons. */
export const viewToggleVariants = cva(
  ["inline-flex items-center gap-0.5 rounded-md border border-border bg-surface-raised p-0.5"],
  {
    variants: {
      size: {
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** A single `role="radio"` segment. `data-state="active"` marks the selected view. */
export const viewToggleButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-sm text-foreground-muted",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "hover:text-foreground",
    "data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  ],
  {
    variants: {
      size: {
        sm: "size-7 [&_svg]:size-3.5",
        md: "size-8 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ViewToggleVariantsProps = VariantProps<typeof viewToggleVariants>;
