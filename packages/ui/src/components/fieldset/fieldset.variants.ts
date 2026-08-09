import { cva, type VariantProps } from "class-variance-authority";

/** Mirrors form-field.variants.ts's gap scale so a Fieldset of FormFields reads as one rhythm. */
export const fieldsetVariants = cva(["flex flex-col border-0 p-0 m-0"], {
  variants: {
    gap: {
      sm: "gap-3",
      md: "gap-4",
    },
  },
  defaultVariants: {
    gap: "md",
  },
});

export const legendVariants = cva([
  "mb-1 w-full p-0 font-sans text-base font-semibold text-foreground",
]);

export type FieldsetVariantsProps = VariantProps<typeof fieldsetVariants>;
