import type { Meta, StoryObj } from "@storybook/react";
import { SortSelect, type SortOption } from "./sort-select";

const sortOptions: SortOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Customer rating" },
];

const meta: Meta<typeof SortSelect> = {
  title: "Components/SortSelect",
  component: SortSelect,
  // No "autodocs" tag: sort-select.mdx attaches a custom docs page via
  // <Meta of={SortSelectStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A thin, domain-flavored wrapper around \`Select\` for a PLP "sort by" control
— composes \`Select\` rather than re-wiring Radix Select. A Client Component
(because \`Select\` is).

## Overriding this component

**1. Tokens** — everything \`Select\` already reads: \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`sortSelectVariants\`** — sizes the optional visible label; the trigger itself is styled by \`Select\`'s own \`selectVariants\`, exported from \`@storefront/ui\`.

**3. \`classNames\`** — \`root\` / \`label\` plus every key \`Select\` accepts (\`trigger\`, \`value\`, \`icon\`, \`content\`, \`viewport\`, \`item\`, \`group\`, \`groupLabel\`), forwarded straight through.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    showLabel: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    showLabel: false,
    disabled: false,
    defaultValue: "relevance",
    options: sortOptions,
  },
};

export default meta;
type Story = StoryObj<typeof SortSelect>;

export const Playground: Story = {};

export const WithVisibleLabel: Story = {
  args: { showLabel: true },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every sort select at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex w-56 flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <SortSelect {...args} />
      </div>
      <div data-theme="dark" className="flex w-56 flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <SortSelect {...args} />
      </div>
    </div>
  ),
};
