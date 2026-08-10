import type { Meta, StoryObj } from "@storybook/react";
import { ProductBadge } from "./product-badge";
import { Badge } from "../badge/badge";

const meta: Meta<typeof ProductBadge> = {
  title: "Components/ProductBadge",
  component: ProductBadge,
  // No "autodocs" tag: product-badge.mdx attaches a custom docs page via <Meta of={ProductBadgeStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A thin wrapper over \`Badge\` that auto-picks a colour variant and default label
from a merchandising \`type\` ("sale" / "new" / "out-of-stock" / "custom"). It
delegates all rendering to \`Badge\` — no duplicated styling.

## Overriding this component

**1. Tokens** — everything \`Badge\` already reads.

**2. \`variant\`** — overrides the auto-picked \`Badge\` colour for this \`type\`.

**3. \`className\`** — merged last via \`cn()\`.

**4. \`slots.Badge\`** — replace the underlying \`Badge\` render entirely, keeping
type-derived variant/label resolution.
        `,
      },
    },
  },
  argTypes: {
    type: { control: "select", options: ["sale", "new", "out-of-stock", "custom"] },
    label: { control: "text" },
  },
  args: {
    type: "sale",
  },
};

export default meta;
type Story = StoryObj<typeof ProductBadge>;

export const Playground: Story = {};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ProductBadge type="sale" />
      <ProductBadge type="new" />
      <ProductBadge type="out-of-stock" />
      <ProductBadge type="custom" label="Limited edition" />
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same ProductBadge, two override layers.
 * Referenced by product-badge.mdx via <Canvas of={ProductBadgeStories.OverrideXxx} />.
 */
export const OverrideVariant: Story = {
  name: "2. variant — override the auto-picked colour",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default (danger)</span>
        <ProductBadge {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">{'variant="warning"'}</span>
        <ProductBadge {...args} variant="warning" />
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace the Badge render",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <ProductBadge {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'slots={{ Badge: (props) => <Badge {...props} size="sm" /> }}'}
        </span>
        <ProductBadge {...args} slots={{ Badge: (props) => <Badge {...props} size="sm" /> }} />
      </div>
    </div>
  ),
};
