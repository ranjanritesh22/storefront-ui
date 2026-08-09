import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  // No "autodocs" tag: rating.mdx attaches a custom docs page via
  // <Meta of={RatingStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Read-only star rating with fractional fill and a compact review count. Pure
presentation, no hooks — stays a Server Component.

## Overriding this component

**1. Tokens** — \`--ui-color-warning\` (fill), \`--ui-color-border\` (empty star).

**2. \`ratingVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`star\`, \`count\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 5, step: 0.5 } },
    max: { control: "number" },
    count: { control: "number" },
  },
  args: {
    size: "md",
    value: 4.5,
    max: 5,
    count: 1234,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Rating key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const WithoutCount: Story = {
  args: { count: undefined },
};

export const FractionalValues: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-2">
      {[0, 1.5, 2.5, 3.2, 4.8, 5].map((value) => (
        <Rating key={value} {...args} value={value} count={undefined} />
      ))}
    </div>
  ),
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every rating at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Rating {...args} />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <Rating {...args} />
      </div>
    </div>
  ),
};
