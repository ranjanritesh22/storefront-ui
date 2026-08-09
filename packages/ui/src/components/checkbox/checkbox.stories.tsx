import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  // No "autodocs" tag: checkbox.mdx attaches a custom docs page via
  // <Meta of={CheckboxStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Built on \`@radix-ui/react-checkbox\` for correct keyboard and \`aria-checked\`
(including tri-state \`indeterminate\`) behaviour. Built for filter facets
(category, brand, discount lists), with an optional trailing count.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`checkboxVariants\` / \`checkboxBoxVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`input\`, \`box\`, \`label\`, \`description\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    label: "Nike",
    description: "(45)",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const FacetList: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {[
        ["Nike", "(45)"],
        ["Adidas", "(38)"],
        ["Puma", "(32)"],
        ["New Balance", "(28)"],
      ].map(([label, count]) => (
        <Checkbox key={label} {...args} label={label} description={count} />
      ))}
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every checkbox at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Checkbox {...args} defaultChecked />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <Checkbox {...args} defaultChecked />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Checkbox {...args} defaultChecked />
      </div>
    </div>
  ),
};
