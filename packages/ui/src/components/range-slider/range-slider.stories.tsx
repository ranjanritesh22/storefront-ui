import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "./range-slider";

const meta: Meta<typeof RangeSlider> = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  // No "autodocs" tag: range-slider.mdx attaches a custom docs page via
  // <Meta of={RangeSliderStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A dual-thumb range slider built on the headless \`useRangeSlider\` hook — the
PLP price-range facet. Two overlapping native \`<input type="range">\`
elements with pointer-events limited to the thumb, so both stay draggable
regardless of stacking order.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`rangeSliderVariants\` / \`...TrackVariants\` / \`...RangeVariants\` / \`...ThumbVariants\`** —
exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`track\`, \`range\`, \`thumb\`, \`output\`).

**4. \`useRangeSlider\`** — the headless hook underneath, for a fully custom UI.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    minStepsBetweenThumbs: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    min: 999,
    max: 15999,
    step: 100,
    defaultValue: [999, 15999],
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <RangeSlider {...args} formatValue={(v) => `₹${v.toLocaleString("en-IN")}${v === args.max ? "+" : ""}`} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-6">
      {(["sm", "md"] as const).map((size) => (
        <RangeSlider key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-72">
      <RangeSlider {...args} />
    </div>
  ),
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every slider at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex w-56 flex-col items-start gap-3">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <RangeSlider {...args} />
      </div>
      <div data-brand="acme" className="flex w-56 flex-col items-start gap-3">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <RangeSlider {...args} />
      </div>
    </div>
  ),
};
