import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared by `DropdownMenuContent` and `DropdownMenuSubContent` — a submenu
 * is visually identical to the root menu, just docked to its parent item
 * instead of the trigger.
 */
export const dropdownMenuContentVariants = cva([
  "z-[var(--ui-z-dropdown)] min-w-48 rounded-md border border-border bg-surface p-1 text-foreground shadow-md",
  "origin-[var(--radix-dropdown-menu-content-transform-origin)]",
  "transition-[opacity,transform] duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
  "data-[state=open]:opacity-100 data-[state=open]:scale-100",
  "data-[state=closed]:opacity-0 data-[state=closed]:scale-95",
  "outline-none",
]);

export const dropdownMenuItemVariants = cva(
  [
    "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 font-sans text-sm outline-none",
    "transition-colors duration-[var(--ui-duration-fast)] ease-[var(--ui-ease-standard)]",
    "data-[highlighted]:bg-surface-raised",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "text-foreground",
        danger: "text-danger data-[highlighted]:bg-danger/10",
      },
      inset: {
        true: "ps-8",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inset: false,
    },
  },
);

export const dropdownMenuLabelVariants = cva([
  "px-2 py-1.5 font-sans text-xs font-medium text-foreground-muted",
]);

export const dropdownMenuSeparatorVariants = cva(["-mx-1 my-1 h-px bg-border"]);

export const dropdownMenuShortcutVariants = cva([
  "ms-auto font-sans text-xs tracking-widest text-foreground-muted",
]);

export type DropdownMenuContentVariantsProps = VariantProps<typeof dropdownMenuContentVariants>;
export type DropdownMenuItemVariantsProps = VariantProps<typeof dropdownMenuItemVariants>;
