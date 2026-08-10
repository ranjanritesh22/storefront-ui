import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MobileFilterDrawer } from "./mobile-filter-drawer";
import { Button } from "../button/button";
import type { FacetGroupData } from "../facet-panel/facet-panel";

const baseGroups: FacetGroupData[] = [
  {
    id: "size",
    label: "Size",
    variant: "checkbox",
    options: [
      { value: "s", label: "S", count: 22 },
      { value: "m", label: "M", count: 41 },
      { value: "l", label: "L", count: 30 },
    ],
    selectedValues: ["m"],
  },
  {
    id: "color",
    label: "Color",
    variant: "color-swatch",
    options: [
      { value: "black", label: "Black", count: 18, colorValue: "#111111" },
      { value: "white", label: "White", count: 11, colorValue: "#f5f5f5" },
      { value: "red", label: "Red", count: 6, colorValue: "#b91c1c" },
    ],
    selectedValues: [],
  },
  {
    id: "price",
    label: "Price",
    variant: "price-range",
    min: 0,
    max: 200,
    rangeValue: [0, 200],
    formatRangeValue: (v) => `$${v}`,
  },
];

const meta: Meta<typeof MobileFilterDrawer> = {
  title: "Commerce/MobileFilterDrawer",
  component: MobileFilterDrawer,
  // No "autodocs" tag: mobile-filter-drawer.mdx attaches a custom docs page via <Meta of={MobileFilterDrawerStories} />.
  parameters: {
    docs: {
      description: {
        component: `
The mobile PLP filter surface: \`Drawer\` (docked to the bottom edge by
default) with a \`FacetPanel\` in the body and Apply/Clear actions in the
footer. Built entirely on top of the existing \`Drawer\` — no reimplemented
dialog, focus-trap, or scroll-lock logic.

## Overriding this component

**1. Tokens** — everything \`Drawer\`/\`FacetPanel\`/\`Button\` already read.

**2. \`mobileFilterDrawerBodyVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`overlay\`, \`content\`, \`header\`, \`body\`, \`footer\`,
\`clearButton\`, \`applyButton\`, \`panel\` — the last forwarded straight to \`FacetPanel\`).

**4. \`slots\`** — replace the panel or either footer action while keeping the rest.
        `,
      },
    },
  },
  argTypes: {
    side: { control: "select", options: ["top", "bottom", "start", "end"] },
  },
  args: {
    groups: baseGroups,
    side: "bottom",
  },
};

export default meta;
type Story = StoryObj<typeof MobileFilterDrawer>;

export const Playground: Story = {
  render: (args) => (
    <MobileFilterDrawer {...args} trigger={<Button variant="outline">Filter</Button>} onApply={() => {}} />
  ),
};

export const WithResultCountAndClearAll: Story = {
  name: "resultCount + onClearAll",
  render: (args) => (
    <MobileFilterDrawer
      {...args}
      trigger={<Button variant="outline">Filter (2)</Button>}
      resultCount={128}
      onApply={() => {}}
      onClearAll={() => {}}
    />
  ),
};

function ControlledDemo(args: React.ComponentProps<typeof MobileFilterDrawer>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open filters (controlled)</Button>
      <MobileFilterDrawer {...args} open={open} onOpenChange={setOpen} onApply={() => setOpen(false)} />
    </>
  );
}

export const ControlledOpenState: Story = {
  name: "Controlled open — external trigger",
  render: (args) => <ControlledDemo {...args} />,
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach the panel",
  render: (args) => (
    <MobileFilterDrawer
      {...args}
      trigger={<Button variant="outline">Filter</Button>}
      onApply={() => {}}
      classNames={{ panel: { group: "px-1" } }}
    />
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots.ApplyButton — replace the primary action",
  render: (args) => (
    <MobileFilterDrawer
      {...args}
      trigger={<Button variant="outline">Filter</Button>}
      onApply={() => {}}
      slots={{
        ApplyButton: ({ onClick, children }) => (
          <button type="button" onClick={onClick} className="rounded-full bg-primary px-6 py-2 text-primary-fg">
            {children}
          </button>
        ),
      }}
    />
  ),
};
