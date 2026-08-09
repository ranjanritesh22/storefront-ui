import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A token-styled text input. No internal state — safe as a Server Component,
same as \`Card\`. Error styling is driven by \`data-invalid\`, not a bespoke
class, so consumers can target it too: \`input[data-invalid="true"] { ... }\`.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-danger\`, \`--ui-color-ring\`.

**2. \`inputVariants\`** — exported publicly.

**3. \`className\`** — merged last via \`cn()\`.

Prefer \`FormField\` when you need a label, hint, or error wired up with
correct \`aria-describedby\`/\`aria-invalid\`.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    size: "md",
    invalid: false,
    disabled: false,
    placeholder: "you@example.com",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Input key={size} {...args} size={size} placeholder={`Size ${size}`} />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: "not-an-email" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't touch this" },
};
