import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxOption } from "./combobox";

const brands: ComboboxOption[] = [
  { value: "nike", label: "Nike" },
  { value: "adidas", label: "Adidas" },
  { value: "puma", label: "Puma" },
  { value: "new-balance", label: "New Balance" },
  { value: "reebok", label: "Reebok" },
  { value: "converse", label: "Converse", disabled: true },
];

async function mockLoadOptions(query: string): Promise<ComboboxOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return brands.filter((brand) => brand.label.toLowerCase().includes(query.toLowerCase()));
}

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  // No "autodocs" tag: combobox.mdx attaches a custom docs page via
  // <Meta of={ComboboxStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A searchable select — a plain text input plus \`@radix-ui/react-popover\`
(Radix has no combobox primitive). Follows the WAI-ARIA APG "Combobox with
List Autocomplete" pattern: focus stays on the input, keyboard navigation
moves virtually via \`aria-activedescendant\`, and a visually-hidden live
region announces the result count. A Client Component (owns query/open/
highlighted-index state).

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`comboboxInputVariants\` / \`comboboxContentVariants\` / \`comboboxOptionVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`input\`, \`iconButton\`, \`content\`, \`listbox\`, \`option\`, \`empty\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    invalid: false,
    disabled: false,
    "aria-label": "Brand",
    options: brands,
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {};

export const WithInitialValue: Story = {
  args: { defaultValue: "adidas" },
};

export const Async: Story = {
  args: { options: undefined, loadOptions: mockLoadOptions, "aria-label": "Brand (async)" },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "nike" },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every combobox at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex w-56 flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Combobox {...args} />
      </div>
      <div data-theme="dark" className="flex w-56 flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Combobox {...args} />
      </div>
    </div>
  ),
};
