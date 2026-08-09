import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Customer rating" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  // No "autodocs" tag: select.mdx attaches a custom docs page via
  // <Meta of={SelectStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Built on \`@radix-ui/react-select\` — used for the PLP sort control. A Client
Component (owns open/close and highlighted-item state).

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`selectVariants\` / \`selectContentVariants\` / \`selectItemVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`trigger\`, \`value\`, \`icon\`, \`content\`, \`viewport\`, \`item\`, \`group\`, \`groupLabel\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    invalid: false,
    disabled: false,
    "aria-label": "Sort by",
    defaultValue: "popularity",
    options: sortOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Grouped: Story = {
  args: {
    "aria-label": "Category",
    defaultValue: undefined,
    options: [
      {
        label: "Footwear",
        options: [
          { value: "running", label: "Running shoes" },
          { value: "boots", label: "Boots" },
        ],
      },
      {
        label: "Apparel",
        options: [
          { value: "jackets", label: "Jackets" },
          { value: "tees", label: "T-shirts", disabled: true },
        ],
      },
    ],
  },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every select at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Select {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Select {...args} />
      </div>
    </div>
  ),
};
