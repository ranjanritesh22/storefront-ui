import { cva, type VariantProps } from "class-variance-authority";

export const accordionItemVariants = cva(["border-b border-border"]);

export const accordionTriggerVariants = cva([
  "flex w-full items-center justify-between gap-4 py-4 text-start",
  "font-sans text-sm font-medium text-foreground",
  "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
  "hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--ui-duration-base)]",
  "data-[state=open]:[&_svg]:rotate-180",
]);

export const accordionContentVariants = cva([
  "overflow-hidden text-sm text-foreground-muted",
  "motion-safe:data-[state=open]:animate-[accordion-down_var(--ui-duration-base)_var(--ui-ease-standard)]",
  "motion-safe:data-[state=closed]:animate-[accordion-up_var(--ui-duration-base)_var(--ui-ease-standard)]",
]);

export type AccordionItemVariantsProps = VariantProps<typeof accordionItemVariants>;
export type AccordionTriggerVariantsProps = VariantProps<typeof accordionTriggerVariants>;
export type AccordionContentVariantsProps = VariantProps<typeof accordionContentVariants>;
