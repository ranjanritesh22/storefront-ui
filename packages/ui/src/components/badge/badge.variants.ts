import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 border",
    "rounded-full font-sans font-medium whitespace-nowrap",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
  ],
  {
    variants: {
      variant: {
        default: "border-border bg-surface-raised text-foreground",
        primary: "border-transparent bg-primary text-primary-fg",
        success: "border-transparent bg-success text-success-fg",
        warning: "border-transparent bg-warning text-warning-fg",
        danger: "border-transparent bg-danger text-danger-fg",
        outline: "border-border bg-transparent text-foreground",
      },
      size: {
        sm: "h-5 px-2 text-xs [&_svg]:size-3",
        md: "h-6 px-2.5 text-sm [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeVariantsProps = VariantProps<typeof badgeVariants>;
