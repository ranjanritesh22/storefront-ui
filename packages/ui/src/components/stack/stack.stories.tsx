import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./stack";

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface-raised px-4 py-2 text-sm text-foreground">
      {children}
    </div>
  );
}

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: `
One-dimensional flexbox layout — vertical or horizontal, with a token-driven
\`gap\`. No internal state, so it stays a Server Component.

## Overriding this component

**1. \`direction\` / \`gap\` / \`align\` / \`justify\` / \`wrap\`** — CVA variants.

**2. \`stackVariants\`** — exported publicly.

**3. \`className\`** — merged last.

**4. \`asChild\`** — render as a \`<ul>\`/\`<nav>\` instead of a \`<div>\`.
        `,
      },
    },
  },
  argTypes: {
    direction: { control: "radio", options: ["vertical", "horizontal"] },
    gap: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
  },
  args: {
    direction: "vertical",
    gap: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Playground: Story = {
  render: (args) => (
    <Stack {...args}>
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: { direction: "horizontal", gap: "sm", align: "center" },
  render: (args) => (
    <Stack {...args}>
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </Stack>
  ),
};
