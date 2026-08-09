import type { Meta, StoryObj } from "@storybook/react";
import { Price } from "./price";

const meta: Meta<typeof Price> = {
  title: "Components/Price",
  component: Price,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Formats a currency amount with \`Intl.NumberFormat\` — locale and currency are
props, not hard-coded. A Server Component: formatting runs once on the server,
no client JS needed. Pass \`originalValue\` higher than \`value\` to render a
struck-through "was" price and flip \`data-sale="true"\` on the root.

## Overriding this component

**1. Tokens** — \`--ui-color-danger\` (sale price), \`--ui-color-foreground-muted\`
(struck-through original).

**2. \`priceVariants\`** — exported publicly.

**3. \`className\`** — merged last via \`cn()\`.
        `,
      },
    },
  },
  argTypes: {
    value: { control: "number" },
    originalValue: { control: "number" },
    currency: { control: "text" },
    locale: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    value: 49.99,
    currency: "USD",
    locale: "en-US",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const Playground: Story = {};

export const OnSale: Story = {
  args: { value: 34.99, originalValue: 49.99 },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Price key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Price value={49.99} currency="USD" locale="en-US" />
      <Price value={49.99} currency="EUR" locale="de-DE" />
      <Price value={49.99} currency="GBP" locale="en-GB" />
      <Price value={4999} currency="JPY" locale="ja-JP" />
    </div>
  ),
};
