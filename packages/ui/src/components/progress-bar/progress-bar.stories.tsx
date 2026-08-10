import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./progress-bar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  // No "autodocs" tag: progress-bar.mdx attaches a custom docs page via <Meta of={ProgressBarStories} />.
  parameters: {
    docs: {
      description: {
        component: `
No internal state — the consumer owns \`value\` (upload progress, a multi-step checkout's current
step, ...). \`indeterminate\` swaps the value-driven fill for a sliding indicator, for a duration
that isn't known yet; its animation respects \`prefers-reduced-motion\` (falls back to a static
half-opacity full bar).

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-success\`, \`--ui-color-warning\`, \`--ui-color-danger\`, \`--ui-color-surface-raised\`.

**2. \`progressBarTrackVariants\` / \`progressBarFillVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map for \`track\`, \`fill\`, \`value\`.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["primary", "success", "warning", "danger"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  args: {
    value: 60,
    size: "md",
    tone: "primary",
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ProgressBar key={size} {...args} size={size} showValue={false} />
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      {(["primary", "success", "warning", "danger"] as const).map((tone) => (
        <ProgressBar key={tone} {...args} tone={tone} showValue={false} />
      ))}
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar indeterminate label="Loading recommendations" />
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} classNames={{ track: "bg-primary/10", value: "text-primary" }} />
    </div>
  ),
};
