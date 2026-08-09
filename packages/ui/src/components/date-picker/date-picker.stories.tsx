import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  // No "autodocs" tag: date-picker.mdx attaches a custom docs page via
  // <Meta of={DatePickerStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A date field built from a trigger button + \`@radix-ui/react-popover\` and a
hand-rolled calendar grid — Radix has no date-picker primitive. Follows the
WAI-ARIA APG "Date Picker Dialog" grid pattern. A Client Component (owns
open/view-month/focused-day state).

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`datePickerTriggerVariants\` / \`datePickerContentVariants\` / \`datePickerDayVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`trigger\`, \`content\`, \`day\`).
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
    "aria-label": "Delivery date",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {};

export const WithInitialValue: Story = {
  args: { defaultValue: new Date() },
};

export const WithMinMax: Story = {
  name: "Bounded range (next 14 days)",
  args: {
    min: new Date(),
    max: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: new Date() },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every date picker at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex w-56 flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <DatePicker {...args} />
      </div>
      <div data-theme="dark" className="flex w-56 flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <DatePicker {...args} />
      </div>
    </div>
  ),
};
