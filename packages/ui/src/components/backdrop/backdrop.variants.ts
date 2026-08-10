import { cva, type VariantProps } from "class-variance-authority";

/**
 * Keyed off `data-state` (set by the component from its `open` prop) rather
 * than a boolean cva variant — the same idiom every other overlay in this
 * package uses (`DialogOverlay`, `DrawerOverlay`, `Toast`), so a consumer's
 * own transition overrides compose the same way everywhere.
 */
export const backdropVariants = cva(
  [
    "fixed inset-0 z-[var(--ui-z-overlay)] bg-overlay",
    "transition-opacity duration-[var(--ui-duration-base)] ease-[var(--ui-ease-standard)] motion-reduce:transition-none",
    "data-[state=open]:opacity-100",
    "data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0",
  ],
  {
    variants: {
      blur: {
        true: "backdrop-blur-sm",
        false: "",
      },
    },
    defaultVariants: {
      blur: false,
    },
  },
);

export type BackdropVariantsProps = VariantProps<typeof backdropVariants>;
