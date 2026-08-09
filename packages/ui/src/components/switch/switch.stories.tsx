import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  // No "autodocs" tag: switch.mdx attaches a custom docs page via
  // <Meta of={SwitchStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Built on \`@radix-ui/react-switch\`. Use for an immediate-effect boolean
setting ("Email me order updates"); use \`Checkbox\` for a value picked as
part of form submission (facet filters, "I agree to the terms"). A Client
Component (owns toggled state).

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`switchVariants\` / \`switchTrackVariants\` / \`switchThumbVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`track\`, \`thumb\`, \`label\`, \`description\`).
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
    label: "Email me order updates",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithDescription: Story = {
  args: { description: "Off", defaultChecked: false, label: "SMS alerts" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every switch at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Switch {...args} defaultChecked />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Switch {...args} defaultChecked />
      </div>
    </div>
  ),
};
