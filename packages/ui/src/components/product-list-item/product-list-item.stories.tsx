import type { Meta, StoryObj } from "@storybook/react";
import { ProductListItem } from "./product-list-item";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e5e5'/%3E%3C/svg%3E";

const meta: Meta<typeof ProductListItem> = {
  title: "Components/ProductListItem",
  component: ProductListItem,
  parameters: {
    docs: {
      description: {
        component: `
\`ProductCard\` with \`orientation="horizontal"\` locked in — the row layout used by search
results, cart-style lists, and comparison tables. Everything else — \`classNames\`, \`slots\`,
\`product\`, wishlist/quick-view/swatches — is identical to \`ProductCard\`; see its docs for the
full override model. The only addition is \`size\`, which controls the image column's width.

## Overriding this component

Same four layers as \`ProductCard\` (tokens → variants → \`classNames\` → \`slots\`), since this
component is a thin wrapper around it. \`size\` (\`sm\` / \`md\` / \`lg\`) sets a default image
width via \`productListItemVariants\`; pass \`classNames={{ image: "..." }}\` to override it
per-instance.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    title: "Wireless headphones",
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: "Wireless headphones product photo",
    price: 79.99,
    currency: "USD",
    locale: "en-US",
    ctaLabel: "Add to cart",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof ProductListItem>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-full max-w-xl">
      <ProductListItem {...args} />
    </div>
  ),
};

export const WithSubtitleAndRating: Story = {
  args: { subtitle: "Men's Shoes", rating: 4.5, ratingCount: 128, badgeLabel: "New" },
  render: (args) => (
    <div className="w-full max-w-xl">
      <ProductListItem {...args} />
    </div>
  ),
};

export const CompactSize: Story = {
  args: { size: "sm" },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProductListItem {...args} />
    </div>
  ),
};

export const ListOfItems: Story = {
  render: (args) => (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <ProductListItem {...args} />
      <ProductListItem {...args} title="Leather wallet" price={49.99} />
      <ProductListItem {...args} title="Canvas tote" price={34.99} originalPrice={44.99} badgeLabel="Sale" />
    </div>
  ),
};
