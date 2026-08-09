import type { Meta, StoryObj } from "@storybook/react";
import { Price } from "./price";
import { priceVariants } from "./price.variants";

const meta: Meta<typeof Price> = {
  title: "Components/Price",
  component: Price,
  // No "autodocs" tag: price.mdx attaches a custom docs page via <Meta of={PriceStories} />.
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

/**
 * "Overriding this component" demo stories — same Price, three override layers.
 * Referenced by price.mdx via <Canvas of={PriceStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every price at once",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Price value={34.99} originalValue={49.99} size="lg" />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <Price value={34.99} originalValue={49.99} size="lg" />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Price value={34.99} originalValue={49.99} size="lg" />
      </div>
    </div>
  ),
};

export const OverrideVariants: Story = {
  name: "2. priceVariants — style something that isn't a Price",
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs text-foreground-muted">
        {'<data className={priceVariants({ size: "lg" })}>$49.99</data>'}
      </span>
      <data className={priceVariants({ size: "lg" })} value="49.99">
        $49.99
      </data>
    </div>
  ),
};

export const OverrideClassName: Story = {
  name: "3. className — tweak one instance",
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Price value={49.99} size="lg" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          className=&quot;text-primary&quot;
        </span>
        <Price value={49.99} size="lg" className="text-primary" />
      </div>
    </div>
  ),
};
