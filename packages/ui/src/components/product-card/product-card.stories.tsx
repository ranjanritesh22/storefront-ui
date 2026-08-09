import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./product-card";
import { Badge } from "../badge/badge";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e5e5'/%3E%3C/svg%3E";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
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
