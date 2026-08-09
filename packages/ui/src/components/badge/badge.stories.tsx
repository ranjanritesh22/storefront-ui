import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  // No "autodocs" tag: badge.mdx attaches a custom docs page via <Meta of={BadgeStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A CVA-driven badge for status/label pills. Pure token consumption — a Server
Component with no state, styled entirely through semantic colour tokens.

## Overriding this component

**1. Tokens (rebrand every badge at once)** — override \`--ui-color-primary\`,
\`--ui-color-success\`, \`--ui-color-warning\`, \`--ui-color-danger\`, \`--ui-color-border\`
on \`:root\` or under \`[data-theme]\` / \`[data-brand]\`.

**2. \`badgeVariants\` (style something that isn't a \`Badge\`)**:

\`\`\`tsx
<a className={badgeVariants({ variant: "success" })}>In stock</a>
\`\`\`

**3. \`className\` (one-off tweak)** — merged last via \`cn()\`.

**4. \`asChild\` (structural change)** — render as an anchor for a filter tag:

\`\`\`tsx
<Badge asChild><a href="/sale">Sale</a></Badge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger", "outline"],
    },
    size: { control: "select", options: ["sm", "md"] },
    children: { control: "text" },
  },
  args: {
    variant: "default",
    size: "md",
    children: "New",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["default", "primary", "success", "warning", "danger", "outline"] as const).map(
        (variant) => (
          <Badge key={variant} {...args} variant={variant}>
            {variant}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["sm", "md"] as const).map((size) => (
        <Badge key={size} {...args} size={size}>
          Size {size}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same Badge, three override layers.
 * Referenced by badge.mdx via <Canvas of={BadgeStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every badge at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Badge {...args} />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <Badge {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Badge {...args} />
      </div>
    </div>
  ),
};

export const OverrideClassName: Story = {
  name: "3. className — tweak one instance",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Badge {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          className=&quot;uppercase tracking-wide&quot;
        </span>
        <Badge {...args} className="uppercase tracking-wide">
          Limited
        </Badge>
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. asChild — swap the rendered element",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">{"<span>"}</span>
        <Badge {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'asChild -> <a href="/sale">'}
        </span>
        <Badge {...args} asChild variant="danger">
          <a href="#sale">Sale</a>
        </Badge>
      </div>
    </div>
  ),
};
