import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CompareBar, type CompareBarItem } from "./compare-bar";
import { Button } from "../button/button";

const INITIAL_ITEMS: CompareBarItem[] = [
  { id: "1", label: "Trail Runner" },
  { id: "2", label: "Road Runner" },
  { id: "3", label: "Cushion Max" },
];

function InteractiveDemo(args: React.ComponentProps<typeof CompareBar>) {
  const [items, setItems] = useState(args.items);
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md border border-border">
      <CompareBar
        {...args}
        items={items}
        onRemoveItem={(id) => setItems((current) => current.filter((item) => item.id !== id))}
        onClearAll={() => setItems([])}
      />
    </div>
  );
}

const meta: Meta<typeof CompareBar> = {
  title: "Components/CompareBar",
  component: CompareBar,
  // No "autodocs" tag: compare-bar.mdx attaches a custom docs page via <Meta of={CompareBarStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A sticky bar for a "compare products" flow — pinned to \`bottom: 0\` at
\`z-[var(--ui-z-sticky)]\`. Renders nothing (\`return null\`) when \`items\` is
empty; the consumer owns the array, so visibility is entirely a function of
what's passed in.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-surface\`, \`--ui-z-sticky\`.

**2. \`compareBarVariants\`** — style something that isn't a \`CompareBar\`.

**3. \`classNames\`** — slot map: \`root\`, \`list\`, \`item\`, \`image\`, \`label\`,
\`remove\`, \`actions\`, \`compareButton\`, \`clearButton\`.

**4. \`slots\`** — replace the \`Image\`, \`CompareButton\`, or \`ClearButton\` render.
        `,
      },
    },
  },
  args: {
    items: INITIAL_ITEMS,
  },
};

export default meta;
type Story = StoryObj<typeof CompareBar>;

export const Playground: Story = {
  render: (args) => (
    <div className="relative h-40 w-full overflow-hidden rounded-md border border-border">
      <CompareBar {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  name: "Removable items + clear all",
  render: (args) => <InteractiveDemo {...args} />,
};

export const Empty: Story = {
  name: "Renders nothing when items is empty",
  args: { items: [] },
  render: (args) => (
    <div className="relative h-24 w-full rounded-md border border-dashed border-border p-4 text-sm text-foreground-muted">
      <CompareBar {...args} />
      Nothing renders below — `items` is empty.
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same CompareBar, two override layers.
 * Referenced by compare-bar.mdx via <Canvas of={CompareBarStories.OverrideXxx} />.
 */
export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="relative h-40 w-full overflow-hidden rounded-md border border-border">
      <CompareBar {...args} classNames={{ root: "bg-surface-raised", compareButton: "rounded-full" }} />
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace the compare button",
  render: (args) => (
    <div className="relative h-40 w-full overflow-hidden rounded-md border border-border">
      <CompareBar
        {...args}
        slots={{ CompareButton: (props) => <Button {...props} variant="danger" /> }}
      />
    </div>
  ),
};
