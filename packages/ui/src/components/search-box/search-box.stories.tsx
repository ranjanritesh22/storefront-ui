import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBox, type SearchSuggestion } from "./search-box";

const catalog: SearchSuggestion[] = [
  { id: "p1", label: "Running shoes", imageSrc: "https://placehold.co/64x64" },
  { id: "p2", label: "Running shorts", imageSrc: "https://placehold.co/64x64" },
  { id: "p3", label: "Running socks" },
  { id: "p4", label: "Trail running jacket" },
];

async function mockFetch(query: string): Promise<SearchSuggestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return catalog.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
}

/**
 * Story-only stateful wrapper — this package does no data fetching itself
 * (CLAUDE.md non-goals), so `SearchBox` is fully controlled: the consumer
 * owns `suggestions`/`loading`/`recentSearches` state and reacts to
 * `onQueryChange`, exactly like this wrapper does.
 */
function ControlledSearchBox(props: React.ComponentProps<typeof SearchBox>) {
  const [suggestions, setSuggestions] = React.useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState(["running shoes", "trail jacket", "socks"]);

  return (
    <SearchBox
      {...props}
      suggestions={suggestions}
      loading={loading}
      recentSearches={recentSearches}
      onQueryChange={async (query) => {
        if (!query) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        const result = await mockFetch(query);
        setSuggestions(result);
        setLoading(false);
      }}
      onSuggestionSelect={(suggestion) => console.log("select suggestion", suggestion)}
      onSearch={(query) => {
        console.log("search", query);
        setRecentSearches((current) => [query, ...current.filter((q) => q !== query)].slice(0, 5));
      }}
      onRecentSearchSelect={(query) => console.log("select recent", query)}
      onRecentSearchRemove={(query) => setRecentSearches((current) => current.filter((q) => q !== query))}
      onRecentSearchesClear={() => setRecentSearches([])}
    />
  );
}

const meta: Meta<typeof SearchBox> = {
  title: "Components/SearchBox",
  component: SearchBox,
  // No "autodocs" tag: search-box.mdx attaches a custom docs page via
  // <Meta of={SearchBoxStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Search input with a suggestion dropdown and a "recent searches" section —
forked from Combobox's input + Radix Popover + hand-rolled listbox pattern.
Fully controlled: this package does no data fetching, so \`suggestions\` /
\`loading\` / \`recentSearches\` are consumer state, driven by the debounced
\`onQueryChange\` callback. A Client Component.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`searchBoxInputVariants\` / \`searchBoxContentVariants\` / \`searchBoxOptionVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`input\`, \`iconButton\`, \`content\`, \`listbox\`, \`option\`, \`optionImage\`, \`recentHeader\`, \`recentItem\`, \`recentRemove\`, \`clearAll\`, \`empty\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    "aria-label": "Search products",
  },
  render: (args) => <ControlledSearchBox {...args} />,
};

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Playground: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every search box at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex w-72 flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <ControlledSearchBox {...args} />
      </div>
      <div data-theme="dark" className="flex w-72 flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <ControlledSearchBox {...args} />
      </div>
    </div>
  ),
};
