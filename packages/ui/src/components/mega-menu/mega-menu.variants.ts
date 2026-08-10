import { cva, type VariantProps } from "class-variance-authority";

export const megaMenuVariants = cva(["relative z-[var(--ui-z-dropdown)] flex justify-center"]);

export const megaMenuListVariants = cva(["flex list-none items-center gap-1 font-sans"]);

export const megaMenuTriggerVariants = cva([
  "flex items-center gap-1 rounded-md px-3 py-2",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "[&_svg]:transition-transform [&_svg]:duration-[var(--ui-duration-base)] data-[state=open]:[&_svg]:rotate-180",
]);

export const megaMenuLinkVariants = cva([
  "flex items-center rounded-md px-3 py-2",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:bg-surface-raised",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
]);

export const megaMenuContentVariants = cva([
  "w-[min(64rem,90vw)] rounded-md border border-border bg-surface p-6 shadow-lg",
  "motion-safe:data-[motion=from-start]:animate-[nav-menu-enter-from-left_var(--ui-duration-base)_var(--ui-ease-out)]",
  "motion-safe:data-[motion=from-end]:animate-[nav-menu-enter-from-right_var(--ui-duration-base)_var(--ui-ease-out)]",
  "motion-safe:data-[motion=to-start]:animate-[nav-menu-exit-to-left_var(--ui-duration-base)_var(--ui-ease-in)]",
  "motion-safe:data-[motion=to-end]:animate-[nav-menu-exit-to-right_var(--ui-duration-base)_var(--ui-ease-in)]",
]);

export const megaMenuViewportVariants = cva([
  "relative mt-1.5 overflow-hidden rounded-md border border-border bg-surface shadow-lg",
  "h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)]",
  "motion-safe:origin-[top_center] motion-safe:transition-[width,height] motion-safe:duration-[var(--ui-duration-base)]",
  "motion-safe:data-[state=open]:animate-[nav-menu-viewport-in_var(--ui-duration-fast)_var(--ui-ease-out)]",
  "motion-safe:data-[state=closed]:animate-[nav-menu-viewport-out_var(--ui-duration-fast)_var(--ui-ease-in)]",
]);

export const megaMenuSectionHeadingVariants = cva([
  "mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-foreground-muted",
]);

export const megaMenuFeaturedVariants = cva([
  "flex flex-col gap-2 rounded-md border border-border bg-surface-raised p-3",
]);

export type MegaMenuVariantsProps = VariantProps<typeof megaMenuVariants>;
