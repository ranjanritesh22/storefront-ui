// Barrel — re-exports every component, its variants, and shared lib helpers.
// Each new component adds one line here (see CLAUDE.md).

export { cn } from "./lib/cn";
export { Slot, Slottable } from "./lib/slot";

export { Button, buttonVariants } from "./components/button";
export type { ButtonProps, ButtonVariantsProps } from "./components/button";
