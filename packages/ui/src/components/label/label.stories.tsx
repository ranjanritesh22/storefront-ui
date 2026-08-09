import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "../input/input";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  // No "autodocs" tag: label.mdx attaches a custom docs page via
  // <Meta of={LabelStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Built on \`@radix-ui/react-label\`. \`FormField\` renders its own label
internally for the common case — reach for this component when labelling a
control outside \`FormField\`.

## Overriding this component

**1. Tokens** — \`--ui-color-foreground\`, \`--ui-color-danger\` (the required asterisk).

**2. \`labelVariants\`** — exported publicly.
        `,
      },
    },
  },
  args: {
    children: "Email address",
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const AssociatedWithInput: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label {...args} htmlFor="story-email" />
      <Input id="story-email" type="email" placeholder="you@example.com" />
    </div>
  ),
};
