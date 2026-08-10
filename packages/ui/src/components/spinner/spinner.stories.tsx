import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  // No "autodocs" tag: spinner.mdx attaches a custom docs page via <Meta of={SpinnerStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A single \`<Icon name="spinner">\` wrapped in a \`role="status"\` live region so screen readers
announce \`label\` once, rather than a spinning glyph with no accessible meaning. Animation
respects \`prefers-reduced-motion\` (the registered \`spinner\` glyph gates its own
\`animate-spin\` behind \`motion-safe:\`). No internal state — stays a Server Component.

## Overriding this component

**1. Tokens** — inherits whatever \`--ui-color-*\` the \`tone\` variant resolves to.

**2. \`spinnerVariants\`** — exported publicly.

**3. \`configureIcons({ spinner: MyIcon })\`** — swap the animated glyph itself for every consumer
of \`<Icon name="spinner">\` across the package (\`Button\`'s loading state included).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    tone: { control: "select", options: ["current", "primary", "muted"] },
  },
  args: {
    size: "md",
    tone: "current",
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3 text-foreground">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(["current", "primary", "muted"] as const).map((tone) => (
        <Spinner key={tone} {...args} tone={tone} />
      ))}
    </div>
  ),
};
