import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  // No "autodocs" tag: textarea.mdx attaches a custom docs page via
  // <Meta of={TextareaStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A styled wrapper over a native \`<textarea>\` — no internal state, so it stays
a Server Component, same as \`Input\`. Used for review bodies, gift-note
fields, order comments.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`textareaVariants\`** — exported publicly.
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
    "aria-label": "Comments",
    placeholder: "Tell us what you think…",
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Textarea key={size} {...args} size={size} />
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
  name: "1. Tokens — rebrand every textarea at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Textarea {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Textarea {...args} />
      </div>
    </div>
  ),
};
