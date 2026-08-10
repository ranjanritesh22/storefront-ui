import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "../button/button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  // No "autodocs" tag: popover.mdx attaches a custom docs page via <Meta of={PopoverStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Wraps Radix \`Popover\` — positioning, outside-click/Escape dismissal, and
focus return come from Radix. Unlike \`Dialog\`, it doesn't trap focus or
render a backdrop, so it's the right choice for non-modal auxiliary content
(filters, a mini form, a details flyout) rather than a blocking confirmation.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-surface\`, \`--ui-shadow-md\`.

**2. \`popoverContentVariants\` / \`popoverArrowVariants\`** — exported publicly.

**3. \`classNames\` on \`PopoverContent\`** — a slot map for \`content\`, \`arrow\`.

**4. \`asChild\`** — \`PopoverTrigger\`/\`PopoverClose\` support it natively.
        `,
      },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filter by size</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <p className="font-sans text-sm font-semibold text-foreground">Size</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                type="button"
                className="flex size-8 items-center justify-center rounded-md border border-border font-sans text-sm text-foreground hover:bg-surface-raised"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open (no arrow)</Button>
      </PopoverTrigger>
      <PopoverContent showArrow={false}>
        <p className="font-sans text-sm text-foreground">No connecting arrow.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames on PopoverContent — reach a specific part",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open styled popover</Button>
      </PopoverTrigger>
      <PopoverContent classNames={{ content: "border-primary", arrow: "fill-primary" }}>
        <p className="font-sans text-sm text-foreground">Border and arrow recolored via classNames.</p>
      </PopoverContent>
    </Popover>
  ),
};
