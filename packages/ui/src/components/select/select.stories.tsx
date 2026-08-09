import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  // No "autodocs" tag: select.mdx attaches a custom docs page via
  // <Meta of={SelectStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A styled wrapper over a native \`<select>\` — used for the PLP sort control.
No internal state: a transparent passthrough, so it stays a Server Component.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`selectVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`select\`, \`icon\`).
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
  },
  render: (args) => (
    <Select {...args}>
      <option value="popularity">Popularity</option>
      <option value="newest">Newest first</option>
      <option value="price-asc">Price: low to high</option>
      <option value="price-desc">Price: high to low</option>
      <option value="rating">Customer rating</option>
    </Select>
  ),
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select key={size} {...args} size={size}>
          <option value="popularity">Popularity</option>
          <option value="newest">Newest first</option>
        </Select>
      ))}
    </div>
  ),
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
        <Select {...args}>
          <option>Popularity</option>
        </Select>
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Select {...args}>
          <option>Popularity</option>
        </Select>
      </div>
    </div>
  ),
};
