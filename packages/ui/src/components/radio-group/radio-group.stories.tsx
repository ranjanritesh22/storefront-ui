import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, Radio } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  // No "autodocs" tag: radio-group.mdx attaches a custom docs page via
  // <Meta of={RadioGroupStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Built on \`@radix-ui/react-radio-group\` — arrow keys move selection with
roving tabindex across \`Radio\` children (one \`Tab\` stop for the whole
group). A Client Component (owns selection state).

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`radioGroupVariants\` / \`radioVariants\` / \`radioBoxVariants\`** — exported publicly.

**3. \`classNames\`** — each of \`RadioGroup\` (\`root\`) and \`Radio\` (\`root\`, \`box\`, \`label\`, \`description\`).
        `,
      },
    },
  },
  args: {
    "aria-label": "Size",
    defaultValue: "m",
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="s" label="Small" />
      <Radio value="m" label="Medium" />
      <Radio value="l" label="Large" />
      <Radio value="xl" label="X-Large" disabled />
    </RadioGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {};

export const WithDescriptions: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="standard" label="Standard shipping" description="5-7 business days" />
      <Radio value="express" label="Express shipping" description="2-3 business days" />
      <Radio value="overnight" label="Overnight" description="Next business day" />
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: undefined },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every radio group at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <RadioGroup {...args}>
          <Radio value="s" label="Small" />
          <Radio value="m" label="Medium" />
        </RadioGroup>
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <RadioGroup {...args}>
          <Radio value="s" label="Small" />
          <Radio value="m" label="Medium" />
        </RadioGroup>
      </div>
    </div>
  ),
};
