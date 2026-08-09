import { cva, type VariantProps } from "class-variance-authority";

/** `objectFit` is the one styling decision every image call site actually varies — product photography wants `cover`, a lockup/logo banner wants `contain`. */
export const imageVariants = cva([], {
  variants: {
    objectFit: {
      cover: "object-cover",
      contain: "object-contain",
    },
  },
});

export type ImageVariantsProps = VariantProps<typeof imageVariants>;
