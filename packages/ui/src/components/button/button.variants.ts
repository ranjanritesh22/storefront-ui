import { cva, type VariantProps } from "class-variance-authority";

/**
 * `border` is always present (even on borderless variants, via
 * `border-transparent`) so switching variants never shifts box size by 1px.
 * Motion timing reads --ui-duration-base/--ui-ease-standard directly — those
 * scales aren't aliased into Tailwind's theme namespace, only colour/radius/
 * font/shadow are (see tokens.css §Tier 2 comment).
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 border",
    "rounded-md font-sans font-medium whitespace-nowrap",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    "data-loading:cursor-wait",
  ],
  {
    variants: {
      variant: {
        primary: "border-transparent bg-primary text-primary-fg hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "border-border bg-surface-raised text-foreground hover:bg-border/50 active:bg-border/70",
        outline: "border-border bg-transparent text-foreground hover:bg-surface-raised active:bg-border/50",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-surface-raised active:bg-border/50",
        danger: "border-transparent bg-danger text-danger-fg hover:bg-danger/90 active:bg-danger/80",
      },
      size: {
        sm: "h-8 px-3 text-sm [&_svg]:size-3.5",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-5",
        icon: "size-10 p-0 [&_svg]:size-4",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
