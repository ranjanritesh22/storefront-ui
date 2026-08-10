import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./divider";

const meta: Meta<typeof Divider> = {
  title: "Layout/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: `
A single rule for separating content. \`decorative\` (default \`true\`) makes it
\`aria-hidden\`; set it to \`false\` when the divider marks a real content
boundary a screen reader should announce (\`role="separator"\`).

## Overriding this component

**1. Tokens** — \`--ui-color-border\`.

**2. \`dividerVariants\`** — exported publicly.

**3. \`className\`** — merged last, e.g. thickness or color.
        `,
      },
    },
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
  args: {
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-64">
      <p className="text-sm text-foreground">Above</p>
      <Divider {...args} className="my-3" />
      <p className="text-sm text-foreground">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3">
      <span className="text-sm text-foreground">Left</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-foreground">Right</span>
    </div>
  ),
};
