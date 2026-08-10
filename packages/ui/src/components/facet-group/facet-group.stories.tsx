import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FacetGroup, type FacetOption } from "./facet-group";

const sizeOptions: FacetOption[] = [
  { value: "xs", label: "XS", count: 4 },
  { value: "s", label: "S", count: 22 },
  { value: "m", label: "M", count: 41 },
  { value: "l", label: "L", count: 30 },
  { value: "xl", label: "XL", count: 9 },
];

const colorOptions: FacetOption[] = [
  { value: "black", label: "Black", count: 18, colorValue: "#111111" },
  { value: "white", label: "White", count: 11, colorValue: "#f5f5f5" },
  { value: "red", label: "Red", count: 6, colorValue: "#b91c1c" },
  { value: "blue", label: "Blue", count: 9, colorValue: "#1d4ed8" },
  { value: "green", label: "Green", count: 3, colorValue: "#15803d" },
];

const ratingOptions: FacetOption[] = [
  { value: "4", label: "4 stars & up", ratingValue: 4, count: 312 },
  { value: "3", label: "3 stars & up", ratingValue: 3, count: 480 },
  { value: "2", label: "2 stars & up", ratingValue: 2, count: 520 },
];

const manyBrandOptions: FacetOption[] = Array.from({ length: 54 }, (_, index) => ({
  value: `brand-${index}`,
  label: `Brand ${index + 1}`,
  count: Math.max(1, 60 - index),
}));

const meta: Meta<typeof FacetGroup> = {
  title: "Commerce/FacetGroup",
  component: FacetGroup,
  // No "autodocs" tag: facet-group.mdx attaches a custom docs page via <Meta of={FacetGroupStories} />.
  parameters: {
    docs: {
      description: {
        component: `
One filterable attribute — a collapsible disclosure (built on \`Accordion\`)
around one of five control shapes: \`checkbox\` (multi-select), \`radio\`
(single-select), \`color-swatch\` (a grid of round toggle buttons),
\`price-range\` (a dual-thumb \`RangeSlider\`), or \`rating\` (single-select star
thresholds). Handles 50+ options via a capped initial render + "show more",
scrolling the revealed overflow in a \`ScrollArea\` instead of growing the
page.

## Overriding this component

**1. Tokens** — everything \`Accordion\`/\`Checkbox\`/\`Radio\`/\`RangeSlider\`/\`Rating\` already read.

**2. \`facetGroupVariants\` / \`facetGroupOptionsVariants\` / \`facetGroupSwatchVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`trigger\`, \`content\`, \`list\`, \`option\`, \`showMoreButton\`).

**4. \`slots.ShowMoreButton\`** — replace the "show more" toggle while keeping everything else.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["checkbox", "radio", "color-swatch", "price-range", "rating"],
    },
  },
  args: {
    id: "size",
    label: "Size",
    variant: "checkbox",
    options: sizeOptions,
  },
};

export default meta;
type Story = StoryObj<typeof FacetGroup>;

function CheckboxDemo(args: React.ComponentProps<typeof FacetGroup>) {
  const [selected, setSelected] = useState<string[]>(["m"]);
  return <FacetGroup {...args} selectedValues={selected} onSelectionChange={setSelected} />;
}

export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <CheckboxDemo {...args} />
    </div>
  ),
};

function RadioDemo(args: React.ComponentProps<typeof FacetGroup>) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  return <FacetGroup {...args} selectedValue={selected} onValueChange={setSelected} />;
}

export const RadioVariant: Story = {
  args: { id: "brand", label: "Brand", variant: "radio", options: [
    { value: "nike", label: "Nike", count: 40 },
    { value: "adidas", label: "Adidas", count: 32 },
    { value: "puma", label: "Puma", count: 12 },
  ] },
  render: (args) => (
    <div className="w-72">
      <RadioDemo {...args} />
    </div>
  ),
};

function ColorSwatchDemo(args: React.ComponentProps<typeof FacetGroup>) {
  const [selected, setSelected] = useState<string[]>(["black"]);
  return <FacetGroup {...args} selectedValues={selected} onSelectionChange={setSelected} />;
}

export const ColorSwatchVariant: Story = {
  args: { id: "color", label: "Color", variant: "color-swatch", options: colorOptions },
  render: (args) => (
    <div className="w-72">
      <ColorSwatchDemo {...args} />
    </div>
  ),
};

function PriceRangeDemo(args: React.ComponentProps<typeof FacetGroup>) {
  const [value, setValue] = useState<[number, number]>([25, 175]);
  return (
    <FacetGroup
      {...args}
      rangeValue={value}
      onRangeChange={setValue}
      formatRangeValue={(v) => `$${v}`}
    />
  );
}

export const PriceRangeVariant: Story = {
  args: { id: "price", label: "Price", variant: "price-range", min: 0, max: 200 },
  render: (args) => (
    <div className="w-72">
      <PriceRangeDemo {...args} />
    </div>
  ),
};

function RatingDemo(args: React.ComponentProps<typeof FacetGroup>) {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  return <FacetGroup {...args} selectedValue={selected} onValueChange={setSelected} />;
}

export const RatingVariant: Story = {
  args: { id: "rating", label: "Customer rating", variant: "rating", options: ratingOptions },
  render: (args) => (
    <div className="w-72">
      <RatingDemo {...args} />
    </div>
  ),
};

export const FiftyPlusOptionsShowMore: Story = {
  name: "50+ options — capped render + show more",
  args: { id: "brand", label: "Brand", variant: "checkbox", options: manyBrandOptions },
  render: (args) => (
    <div className="w-72">
      <CheckboxDemo {...args} selectedValues={[]} />
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach the option list",
  render: (args) => (
    <div className="w-72">
      <CheckboxDemo {...args} classNames={{ list: "rounded-md bg-surface-raised p-3" }} />
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots.ShowMoreButton — replace the toggle",
  args: { id: "brand", label: "Brand", variant: "checkbox", options: manyBrandOptions },
  render: (args) => (
    <div className="w-72">
      <CheckboxDemo
        {...args}
        selectedValues={[]}
        slots={{
          ShowMoreButton: ({ onClick, children }) => (
            <button type="button" onClick={onClick} className="text-sm font-semibold text-primary underline">
              {children}
            </button>
          ),
        }}
      />
    </div>
  ),
};
