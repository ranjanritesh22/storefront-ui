import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FacetPanel, FacetPanelSkeleton, type FacetGroupData } from "./facet-panel";

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
    selectedValues: [],
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
  {
    id: "rating",
    label: "Customer rating",
    variant: "rating",
    options: [
      { value: "4", label: "4 stars & up", ratingValue: 4, count: 312 },
      { value: "3", label: "3 stars & up", ratingValue: 3, count: 480 },
    ],
  },
];

const meta: Meta<typeof FacetPanel> = {
  title: "Commerce/FacetPanel",
  component: FacetPanel,
  // No "autodocs" tag: facet-panel.mdx attaches a custom docs page via <Meta of={FacetPanelStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Data-driven container that lays out several \`FacetGroup\`s from a plain
\`groups: FacetGroupData[]\` array — the PLP sidebar / drawer body. No
selection state of its own, so it stays a Server Component. Ships a matching
\`FacetPanelSkeleton\` for the loading state.

## Overriding this component

**1. Tokens** — everything \`FacetGroup\`/\`Button\` already read.

**2. \`facetPanelVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`header\`, \`heading\`, \`group\`, \`clearAllButton\`).

**4. \`slots\`** — replace the group renderer or the "clear all" action while keeping the rest.
        `,
      },
    },
  },
  args: {
    groups: baseGroups,
    heading: "Filters",
  },
};

export default meta;
type Story = StoryObj<typeof FacetPanel>;

function InteractiveDemo(args: React.ComponentProps<typeof FacetPanel>) {
  const [groups, setGroups] = useState(args.groups);

  function updateGroup(id: string, patch: Partial<FacetGroupData>) {
    setGroups((prev) => prev.map((group) => (group.id === id ? { ...group, ...patch } : group)));
  }

  const wiredGroups: FacetGroupData[] = groups.map((group) => {
    if (group.variant === "checkbox" || group.variant === "color-swatch") {
      return { ...group, onSelectionChange: (values: string[]) => updateGroup(group.id, { selectedValues: values }) };
    }
    if (group.variant === "radio" || group.variant === "rating") {
      return { ...group, onValueChange: (value: string | undefined) => updateGroup(group.id, { selectedValue: value }) };
    }
    if (group.variant === "price-range") {
      return { ...group, onRangeChange: (value: [number, number]) => updateGroup(group.id, { rangeValue: value }) };
    }
    return group;
  });

  return (
    <FacetPanel
      {...args}
      groups={wiredGroups}
      onClearAll={() => setGroups(baseGroups.map((g) => ({ ...g, selectedValues: [], selectedValue: undefined })))}
    />
  );
}

export const Playground: Story = {
  render: (args) => (
    <div className="w-80">
      <InteractiveDemo {...args} />
    </div>
  ),
};

export const Loading: Story = {
  name: "Loading state — FacetPanelSkeleton",
  render: () => (
    <div className="w-80">
      <FacetPanelSkeleton />
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="w-80">
      <InteractiveDemo {...args} classNames={{ group: "bg-surface-raised px-3 rounded-md my-1" }} />
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots.ClearAllButton — replace the clear action",
  render: (args) => (
    <div className="w-80">
      <InteractiveDemo
        {...args}
        slots={{
          ClearAllButton: ({ onClick, children }) => (
            <button type="button" onClick={onClick} className="text-sm font-semibold text-danger underline">
              {children}
            </button>
          ),
        }}
      />
    </div>
  ),
};
