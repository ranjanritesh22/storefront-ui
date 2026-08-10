import { cva, type VariantProps } from "class-variance-authority";

export const aspectRatioVariants = cva(["overflow-hidden rounded-[inherit]"]);

export type AspectRatioVariantsProps = VariantProps<typeof aspectRatioVariants>;
