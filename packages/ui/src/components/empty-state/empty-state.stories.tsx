import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Icon } from "../icon/icon";
import { Button } from "../button/button";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  // No "autodocs" tag: empty-state.mdx attaches a custom docs page via <Meta of={EmptyStateStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A "nothing here yet" placeholder — no results, an empty cart, no saved items. Unlike
\`ErrorState\`, \`EmptyState\` makes no icon choice of its own: "no results", "empty cart", and "no
orders yet" each want a different glyph, so pass one via \`icon\` (or omit it). No internal state,
stays a Server Component.

## Overriding this component

**1. Tokens** — \`--ui-color-foreground-muted\`.

**2. \`emptyStateVariants\` / \`emptyStateIconVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map for \`icon\`, \`title\`, \`description\`, \`action\`.
        `,
      },
    },
  },
  args: {
    title: "No results found",
    description: "Try adjusting your filters or search terms.",
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Playground: Story = {
  render: (args) => (
    <EmptyState {...args} icon={<Icon name="search" size="xl" />} />
  ),
};

export const EmptyCart: Story = {
  render: () => (
    <EmptyState
      icon={<Icon name="cart" size="xl" />}
      title="Your cart is empty"
      description="Items you add will show up here."
      action={<Button>Start shopping</Button>}
    />
  ),
};

export const NoIcon: Story = {
  render: () => <EmptyState title="No saved addresses" description="Add one at checkout." />,
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: () => (
    <EmptyState
      icon={<Icon name="search" size="xl" />}
      title="Custom styling"
      description="classNames reaches title and description independently."
      classNames={{ title: "text-primary", description: "italic" }}
    />
  ),
};
