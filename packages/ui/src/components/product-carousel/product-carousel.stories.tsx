import type { Meta, StoryObj } from "@storybook/react";
import { ProductCarousel } from "./product-carousel";
import type { ProductSummary } from "../../types/product";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e5e5'/%3E%3C/svg%3E";

const ITEMS: ProductSummary[] = Array.from({ length: 8 }, (_, index) => ({
  id: `sku-${index + 1}`,
  name: `Product ${index + 1}`,
  price: 29.99 + index,
  image: { src: PLACEHOLDER_IMAGE, alt: `Product ${index + 1}` },
}));

const meta: Meta<typeof ProductCarousel> = {
  title: "Components/ProductCarousel",
  component: ProductCarousel,
  // No "autodocs" tag: product-carousel.mdx attaches a custom docs page via <Meta of={ProductCarouselStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A horizontally scrolling rail of \`ProductSummary\` items, rendered via
\`ProductCard\` by default — used for "related products" / "recently viewed"
rails. Hand-rolled CSS scroll-snap (\`snap-x snap-mandatory\` / \`snap-start\`),
no carousel library. Prev/Next buttons and the Left/Right arrow keys (when the
track is focused) page between slides via \`scrollIntoView\`, which respects
\`prefers-reduced-motion\` and RTL automatically.

## Overriding this component

**1. Tokens** — everything \`ProductCard\`/\`Button\` already read.

**2. \`productCarouselTrackVariants\`** — the \`gap\` axis between slides.

**3. \`classNames\`** — slot map: \`root\`, \`header\`, \`title\`, \`controls\`,
\`prevButton\`, \`nextButton\`, \`track\`, \`item\`.

**4. \`slots\`** — replace the per-slide \`Item\` render (or the nav buttons)
while keeping the rest.
        `,
      },
    },
  },
  argTypes: {
    gap: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    items: ITEMS,
    title: "You may also like",
    ctaLabel: "Add to cart",
    gap: "md",
  },
};

export default meta;
type Story = StoryObj<typeof ProductCarousel>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <ProductCarousel {...args} />
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: { title: undefined },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <ProductCarousel {...args} />
    </div>
  ),
};

export const FewItems: Story = {
  name: "Fewer items than fit — both buttons disabled",
  args: { items: ITEMS.slice(0, 2) },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <ProductCarousel {...args} />
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same ProductCarousel, two override layers.
 * Referenced by product-carousel.mdx via <Canvas of={ProductCarouselStories.OverrideXxx} />.
 */
export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="w-full max-w-4xl">
      <ProductCarousel
        {...args}
        classNames={{ title: "uppercase tracking-wide", item: "w-48 sm:w-48" }}
      />
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace the per-slide render",
  render: (args) => (
    <div className="w-full max-w-4xl">
      <ProductCarousel
        {...args}
        slots={{
          Item: ({ item, className }) => (
            <div
              className={`flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-surface-raised p-4 text-center ${className ?? ""}`}
            >
              <span className="font-sans text-sm font-medium text-foreground">{item.name}</span>
              <span className="font-sans text-xs text-foreground-muted">${item.price.toFixed(2)}</span>
            </div>
          ),
        }}
      />
    </div>
  ),
};
