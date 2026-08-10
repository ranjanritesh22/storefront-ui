import type { Meta, StoryObj } from "@storybook/react";
import { StockIndicator } from "./stock-indicator";

const meta: Meta<typeof StockIndicator> = {
  title: "Components/StockIndicator",
  component: StockIndicator,
  // No "autodocs" tag: stock-indicator.mdx attaches a custom docs page via <Meta of={StockIndicatorStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A coloured dot + label pair reporting a product's availability. Pure token
consumption (\`bg-success\`/\`bg-warning\`/\`bg-danger\`) — a Server Component with
no state. Accepts either \`status\` directly or a domain-agnostic \`product\`
(\`ProductSummary\`) to resolve it from.

## Overriding this component

**1. Tokens** — override \`--ui-color-success\`, \`--ui-color-warning\`, \`--ui-color-danger\`.

**2. \`stockIndicatorVariants\` / \`stockIndicatorDotVariants\`** — style something
that isn't a \`StockIndicator\`.

**3. \`classNames\`** — slot map: \`root\`, \`indicator\`, \`label\`.

**4. \`slots.Indicator\`** — replace the dot with any element, e.g. an \`<Icon>\`.
        `,
      },
    },
  },
  argTypes: {
    status: { control: "select", options: ["in-stock", "low-stock", "out-of-stock"] },
    label: { control: "text" },
  },
  args: {
    status: "in-stock",
  },
};

export default meta;
type Story = StoryObj<typeof StockIndicator>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {(["in-stock", "low-stock", "out-of-stock"] as const).map((status) => (
        <StockIndicator key={status} {...args} status={status} />
      ))}
    </div>
  ),
};

export const FromProduct: Story = {
  name: "Resolved from a `product` prop",
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <StockIndicator
        product={{ id: "1", name: "In-stock item", price: 10, image: { src: "", alt: "" }, inStock: true }}
      />
      <StockIndicator
        product={{ id: "2", name: "Out-of-stock item", price: 10, image: { src: "", alt: "" }, inStock: false }}
      />
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same StockIndicator, two override layers.
 * Referenced by stock-indicator.mdx via <Canvas of={StockIndicatorStories.OverrideXxx} />.
 */
export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <StockIndicator {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'classNames={{ label: "font-semibold uppercase" }}'}
        </span>
        <StockIndicator {...args} classNames={{ label: "font-semibold uppercase" }} />
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace the dot",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default dot</span>
        <StockIndicator {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">{"slots={{ Indicator: Ring }}"}</span>
        <StockIndicator
          {...args}
          slots={{
            Indicator: (props) => <span {...props} className={`${props.className} rounded-full ring-2 ring-offset-1`} />,
          }}
        />
      </div>
    </div>
  ),
};
