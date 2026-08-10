import { cva, type VariantProps } from "class-variance-authority";

export const navMenuVariants = cva(["relative z-[var(--ui-z-dropdown)] flex justify-center"]);

export const navMenuListVariants = cva([
  "flex list-none items-center gap-1 font-sans",
]);

export const navMenuTriggerVariants = cva([
  "flex items-center gap-1 rounded-md px-3 py-2",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:transition-transform [&_svg]:duration-[var(--ui-duration-base)] data-[state=open]:[&_svg]:rotate-180",
]);

export const navMenuLinkVariants = cva([
  "flex items-center rounded-md px-3 py-2",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "data-[active]:text-primary",
]);

export const navMenuContentVariants = cva([
  "min-w-48 rounded-md border border-border bg-surface p-2 shadow-lg",
  "motion-safe:data-[motion=from-start]:animate-[nav-menu-enter-from-left_var(--ui-duration-base)_var(--ui-ease-out)]",
  "motion-safe:data-[motion=from-end]:animate-[nav-menu-enter-from-right_var(--ui-duration-base)_var(--ui-ease-out)]",
  "motion-safe:data-[motion=to-start]:animate-[nav-menu-exit-to-left_var(--ui-duration-base)_var(--ui-ease-in)]",
  "motion-safe:data-[motion=to-end]:animate-[nav-menu-exit-to-right_var(--ui-duration-base)_var(--ui-ease-in)]",
]);

export const navMenuViewportVariants = cva([
  "relative mt-1.5 overflow-hidden rounded-md border border-border bg-surface shadow-lg",
  "h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
  "motion-safe:origin-[top_center] motion-safe:transition-[width,height] motion-safe:duration-[var(--ui-duration-base)]",
  "motion-safe:data-[state=open]:animate-[nav-menu-viewport-in_var(--ui-duration-fast)_var(--ui-ease-out)]",
  "motion-safe:data-[state=closed]:animate-[nav-menu-viewport-out_var(--ui-duration-fast)_var(--ui-ease-in)]",
]);

export type NavMenuVariantsProps = VariantProps<typeof navMenuVariants>;
