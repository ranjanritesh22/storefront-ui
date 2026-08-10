import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Badge } from "../badge/badge";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e5e5'/%3E%3C/svg%3E";

function WishlistDemo(args: React.ComponentProps<typeof ProductCard>) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="w-72">
      <ProductCard
        {...args}
        wishlisted={wishlisted}
        onWishlistToggle={() => setWishlisted((value) => !value)}
      />
    </div>
  );
}

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  // No "autodocs" tag: product-card.mdx attaches a custom docs page via
  // <Meta of={ProductCardStories} />.
  parameters: {
    docs: {
      description: {
        component: `
The composite proof: composes our own \`Card\`, \`Price\`, \`Badge\` and \`Button\`
by default, but every part can be swapped via \`slots\` and every part's
classes reached via \`classNames\` — the two structural override layers from
ARCHITECTURE.md §4. Props are domain-agnostic (\`title\`, \`price\`, \`imageSrc\`,
\`href\`) — no commerce API types.

## Overriding this component

**1. Tokens** — everything \`Card\`/\`Price\`/\`Badge\`/\`Button\` already read.

**2. \`productCardVariants\`** — controls the image aspect ratio.

**3. \`classNames\`** — slot map: \`root\`, \`image\`, \`body\`, \`title\`, \`price\`,
\`badge\`, \`cta\`.

**4. \`slots\`** — replace any part while keeping the rest, e.g. swap in
\`next/image\` for the image slot:

\`\`\`tsx
<ProductCard slots={{ Image: NextImageAdapter }} ... />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    aspect: { control: "select", options: ["square", "portrait", "landscape"] },
    orientation: { control: "select", options: ["vertical", "horizontal"] },
  },
  args: {
    title: "Wireless headphones",
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: "Wireless headphones product photo",
    price: 79.99,
    currency: "USD",
    locale: "en-US",
    ctaLabel: "Add to cart",
    aspect: "square",
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} />
    </div>
  ),
};

export const OnSaleWithBadge: Story = {
  args: { price: 59.99, originalPrice: 79.99, badgeLabel: "Sale" },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} />
    </div>
  ),
};

export const WithRatingAndWishlist: Story = {
  args: {
    subtitle: "Men's Shoes",
    rating: 4.5,
    ratingCount: 1234,
    colorsCount: 2,
    badgeLabel: "10% OFF",
  },
  render: (args) => <WishlistDemo {...args} />,
};

export const WithQuickViewAndSwatches: Story = {
  args: {
    swatches: [
      { id: "black", label: "Black", color: "#111111" },
      { id: "white", label: "White", color: "#ffffff" },
      { id: "red", label: "Red", color: "#b91c1c" },
    ],
    selectedSwatchId: "black",
  },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} onQuickView={() => {}} />
    </div>
  ),
};

export const HorizontalListLayout: Story = {
  args: { orientation: "horizontal", subtitle: "Men's Shoes", rating: 4.5, ratingCount: 128 },
  render: (args) => (
    <div className="w-full max-w-xl">
      <ProductCard {...args} />
    </div>
  ),
};

export const LoadingSkeleton: Story = {
  render: (args) => (
    <div className="flex w-full max-w-3xl flex-wrap gap-6">
      <div className="w-56">
        <ProductCardSkeleton aspect={args.aspect} />
      </div>
      <div className="w-full max-w-xs">
        <ProductCardSkeleton orientation="horizontal" />
      </div>
    </div>
  ),
};

export const AsLinkCard: Story = {
  args: { href: "/products/wireless-headphones" },
  render: (args) => (
    <div className="w-72">
      <ProductCard {...args} />
    </div>
  ),
};

export const CustomBadgeSlot: Story = {
  args: { badgeLabel: "Limited" },
  render: (args) => (
    <div className="w-72">
      <ProductCard
        {...args}
        slots={{
          Badge: (props) => <Badge {...props} variant="warning" size="sm" />,
        }}
      />
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same ProductCard, three override layers.
 * Referenced by product-card.mdx via <Canvas of={ProductCardStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every card at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <div className="w-56">
          <ProductCard {...args} badgeLabel="Sale" />
        </div>
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <div className="w-56">
          <ProductCard {...args} badgeLabel="Sale" />
        </div>
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <div className="w-56">
          <ProductCard {...args} badgeLabel="Sale" />
        </div>
      </div>
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <div className="w-56">
          <ProductCard {...args} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'classNames={{ price: "text-lg font-bold", cta: "rounded-full" }}'}
        </span>
        <div className="w-56">
          <ProductCard
            {...args}
            classNames={{ price: "text-lg font-bold text-primary", cta: "rounded-full" }}
          />
        </div>
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace one part, keep the rest",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default Badge</span>
        <div className="w-56">
          <ProductCard {...args} badgeLabel="Limited" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'slots={{ Badge: (props) => <Badge {...props} variant="warning" /> }}'}
        </span>
        <div className="w-56">
          <ProductCard
            {...args}
            badgeLabel="Limited"
            slots={{ Badge: (props) => <Badge {...props} variant="warning" size="sm" /> }}
          />
        </div>
      </div>
    </div>
  ),
};
