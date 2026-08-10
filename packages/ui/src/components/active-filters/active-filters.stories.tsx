import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActiveFilters, type ActiveFilter } from "./active-filters";

const initialFilters: ActiveFilter[] = [
  { id: "size-m", label: "Size: M" },
  { id: "color-red", label: "Color: Red" },
  { id: "price-0-100", label: "Price: $0–$100" },
];

const meta: Meta<typeof ActiveFilters> = {
  title: "Commerce/ActiveFilters",
  component: ActiveFilters,
  // No "autodocs" tag: active-filters.mdx attaches a custom docs page via <Meta of={ActiveFiltersStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A row of removable chips for the filters currently applied to a listing —
pairs with \`FacetPanel\`/\`FacetGroup\` to show what's selected above the
results grid. No internal state; renders nothing when \`filters\` is empty.
Each chip's remove button carries a real \`aria-label\` (e.g. "Remove Size: M
filter"), not just an icon.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-surface-raised\`, \`--ui-color-foreground\`.

**2. \`activeFiltersVariants\` / \`activeFiltersChipVariants\` / \`activeFiltersRemoveButtonVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`chip\`, \`chipLabel\`, \`removeButton\`, \`clearAllButton\`).

**4. \`slots.ClearAllButton\`** — replace the "clear all" action.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActiveFilters>;

function InteractiveDemo() {
  const [filters, setFilters] = useState(initialFilters);
  return (
    <ActiveFilters
      filters={filters}
      onRemove={(id) => setFilters((prev) => prev.filter((filter) => filter.id !== id))}
      onClearAll={() => setFilters([])}
    />
  );
}

export const Playground: Story = {
  render: () => <InteractiveDemo />,
};

export const Empty: Story = {
  name: "Empty — renders nothing",
  render: () => (
    <div className="rounded-md border border-dashed border-border p-4 text-sm text-foreground-muted">
      <ActiveFilters filters={[]} onRemove={() => {}} />
      (Nothing rendered above — this box is only here to show the empty result.)
    </div>
  ),
};

export const NoClearAll: Story = {
  name: "No onClearAll — the action is hidden",
  render: () => <ActiveFilters filters={initialFilters} onRemove={() => {}} />,
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach the chips",
  render: () => (
    <ActiveFilters
      filters={initialFilters}
      onRemove={() => {}}
      onClearAll={() => {}}
      classNames={{ chip: "border-primary bg-primary/10 text-primary" }}
    />
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots.ClearAllButton — replace the clear action",
  render: () => (
    <ActiveFilters
      filters={initialFilters}
      onRemove={() => {}}
      onClearAll={() => {}}
      slots={{
        ClearAllButton: ({ onClick, children }) => (
          <button type="button" onClick={onClick} className="text-sm font-semibold text-danger underline">
            {children}
          </button>
        ),
      }}
    />
  ),
};
