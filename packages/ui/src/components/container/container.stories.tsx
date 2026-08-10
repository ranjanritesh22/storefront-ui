import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./container";

const meta: Meta<typeof Container> = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    docs: {
      description: {
        component: `
Centered max-width wrapper with responsive gutters (\`px-4 sm:px-6 lg:px-8\`).
No internal state, so it stays a Server Component.

## Overriding this component

**1. \`size\`** — \`sm\` | \`md\` | \`lg\` | \`xl\` (default) | \`full\`.

**2. \`containerVariants\`** — exported publicly.

**3. \`className\`** — merged last, e.g. override the max-width directly.

**4. \`asChild\`** — render as a \`<section>\`/\`<main>\` instead of a \`<div>\`.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl", "full"] },
  },
  args: {
    size: "xl",
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Playground: Story = {
  render: (args) => (
    <Container {...args}>
      <div className="rounded-md border border-border bg-surface-raised p-6 text-center text-foreground">
        Container content
      </div>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <Container key={size} size={size}>
          <div className="rounded-md border border-border bg-surface-raised p-3 text-center text-sm text-foreground">
            size=&quot;{size}&quot;
          </div>
        </Container>
      ))}
    </div>
  ),
};
