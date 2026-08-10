import { cva, type VariantProps } from "class-variance-authority";

/**
 * z-index reads --ui-z-overlay/--ui-z-modal directly, same as Dialog — not
 * aliased into Tailwind's theme namespace (see tokens.css Tier 2 comment).
 */
export const drawerOverlayVariants = cva([
  "fixed inset-0 z-[var(--ui-z-overlay)] bg-overlay",
  "transition-opacity duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
]);

/**
 * `side` is logical on the inline axis (`start`/`end`) rather than physical
 * (`left`/`right`) per CLAUDE.md rule 7 — a "start" drawer opens from the
 * reading-direction start edge (left in LTR, right in RTL) and slides off
 * toward that same edge, so both the anchor position and the closed-state
 * translate direction flip together under `dir="rtl"`. `top`/`bottom` have
 * no inline-axis equivalent, so they stay physical.
 */
export const drawerContentVariants = cva(
  [
    "fixed z-[var(--ui-z-modal)] flex flex-col bg-surface shadow-lg",
    "transition-transform duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  ],
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 w-full max-h-[85vh] border-b border-border",
          "data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
        ],
        bottom: [
          "inset-x-0 bottom-0 w-full max-h-[85vh] border-t border-border",
          "data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
        ],
        start: [
          "inset-y-0 start-0 h-full w-full max-w-sm border-e border-border",
          "data-[state=closed]:-translate-x-full rtl:data-[state=closed]:translate-x-full",
          "data-[state=open]:translate-x-0",
        ],
        end: [
          "inset-y-0 end-0 h-full w-full max-w-sm border-s border-border",
          "data-[state=closed]:translate-x-full rtl:data-[state=closed]:-translate-x-full",
          "data-[state=open]:translate-x-0",
        ],
      },
    },
    defaultVariants: {
      side: "end",
    },
  },
);

export type DrawerContentVariantsProps = VariantProps<typeof drawerContentVariants>;
