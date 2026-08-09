import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { inputVariants } from "./input.variants";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  // No "autodocs" tag: input.mdx attaches a custom docs page via <Meta of={InputStories} />.
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

/**
 * "Overriding this component" demo stories — same Input, three override layers.
 * Referenced by input.mdx via <Canvas of={InputStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every input at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Input {...args} />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <Input {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Input {...args} />
      </div>
    </div>
  ),
};

export const OverrideVariants: Story = {
  name: "2. inputVariants — style something that isn't an Input",
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs text-foreground-muted">
        {'<textarea className={inputVariants({ size: "md" })} />'}
      </span>
      <textarea
        className={inputVariants({ size: "md" }) + " h-20"}
        placeholder="A textarea, styled like our Input"
      />
    </div>
  ),
};

export const OverrideClassName: Story = {
  name: "3. className — tweak one instance",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Input {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          className=&quot;rounded-full text-center&quot;
        </span>
        <Input {...args} className="rounded-full text-center" placeholder="Search..." />
      </div>
    </div>
  ),
};
