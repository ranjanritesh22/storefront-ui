import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./grid";

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface-raised p-4 text-center text-sm text-foreground">
      {children}
    </div>
  );
}

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: `
Responsive CSS grid — the canonical PLP/category grid. Column counts are
per-breakpoint props (\`cols\`, \`colsSm\`, \`colsMd\`, \`colsLg\`, \`colsXl\`) rather
than a single responsive object, so every generated class name is a static
string the precompiled Tailwind build can see.

## Overriding this component

**1. \`gap\`** — \`none\` | \`sm\` | \`md\` (default) | \`lg\` | \`xl\`.

**2. \`gridVariants\`** — exported publicly, for the gap scale.

**3. \`className\`** — merged last.

**4. \`asChild\`** — render as a \`<ul>\`/\`<section>\` instead of a \`<div>\`.
        `,
      },
    },
  },
  argTypes: {
    gap: { control: "select", options: ["none", "sm", "md", "lg", "xl"] },
    cols: { control: "select", options: [1, 2, 3, 4, 5, 6, 12] },
  },
  args: {
    gap: "md",
    cols: 2,
    colsMd: 3,
    colsLg: 4,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Playground: Story = {
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>Item {i + 1}</Cell>
      ))}
    </Grid>
  ),
};

export const PLPGrid: Story = {
  name: "PLP grid (2 → 3 → 4 columns)",
  render: () => (
    <Grid cols={2} colsMd={3} colsLg={4} gap="lg">
      {Array.from({ length: 8 }, (_, i) => (
        <Cell key={i}>Product {i + 1}</Cell>
      ))}
    </Grid>
  ),
};
