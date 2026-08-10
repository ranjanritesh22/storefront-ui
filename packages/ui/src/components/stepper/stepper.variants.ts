import { cva, type VariantProps } from "class-variance-authority";

export const stepperVariants = cva(["flex"], {
  variants: {
    orientation: {
      horizontal: "w-full flex-row items-start",
      vertical: "flex-col items-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepperItemVariants = cva(["flex flex-1 gap-3"], {
  variants: {
    orientation: {
      horizontal: "flex-col items-center text-center last:flex-none",
      vertical: "flex-row items-start",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepperConnectorVariants = cva(["shrink-0 bg-border"], {
  variants: {
    orientation: {
      horizontal: "mt-4 h-px w-full",
      vertical: "ms-4 my-1 h-6 w-px",
    },
    state: {
      completed: "bg-primary",
      current: "",
      upcoming: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    state: "upcoming",
  },
});

export const stepperIndicatorVariants = cva(
  [
    "flex size-8 shrink-0 items-center justify-center rounded-full border-2",
    "font-sans text-sm font-medium",
    "transition-colors duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)]",
  ],
  {
    variants: {
      state: {
        completed: "border-primary bg-primary text-primary-fg",
        current: "border-primary bg-surface text-primary",
        upcoming: "border-border bg-surface text-foreground-muted",
      },
    },
    defaultVariants: {
      state: "upcoming",
    },
  },
);

export const stepperLabelVariants = cva(["font-sans text-sm font-medium"], {
  variants: {
    state: {
      completed: "text-foreground",
      current: "text-foreground",
      upcoming: "text-foreground-muted",
    },
  },
  defaultVariants: {
    state: "upcoming",
  },
});

export type StepperVariantsProps = VariantProps<typeof stepperVariants>;
export type StepperItemVariantsProps = VariantProps<typeof stepperItemVariants>;
export type StepperState = "completed" | "current" | "upcoming";
