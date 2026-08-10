import type { Meta, StoryObj } from "@storybook/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  // No "autodocs" tag: tooltip.mdx attaches a custom docs page via <Meta of={TooltipStories} />.
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Wraps Radix \`Tooltip\` — opens on hover after \`delayDuration\`, opens
instantly (no delay) on keyboard focus, and closes on blur/Escape/scroll.
Wrap a page (or a group of tooltips) in one \`TooltipProvider\` — after the
first tooltip opens, later ones within \`skipDelayDuration\` open instantly,
which is what makes a toolbar of icon buttons feel responsive.

Reserve it for a single line of supplementary text on a control that's
already operable without it (an icon-only button, a truncated label) — never
put the only accessible name for a control inside a tooltip.

## Overriding this component

**1. Tokens** — \`--ui-color-foreground\`, \`--ui-color-surface\`, \`--ui-shadow-md\`.

**2. \`tooltipContentVariants\` / \`tooltipArrowVariants\`** — exported publicly.

**3. \`classNames\` on \`TooltipContent\`** — a slot map for \`content\`, \`arrow\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Add to wishlist">
          <Icon name="heart" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Add to wishlist</TooltipContent>
    </Tooltip>
  ),
};

export const OnText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help font-sans text-sm text-foreground underline decoration-dotted">
          Free shipping over $50
        </span>
      </TooltipTrigger>
      <TooltipContent>Applies at checkout, US addresses only.</TooltipContent>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on the {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames on TooltipContent — reach a specific part",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Danger tooltip</Button>
      </TooltipTrigger>
      <TooltipContent classNames={{ content: "bg-danger", arrow: "fill-danger" }}>
        Something needs attention
      </TooltipContent>
    </Tooltip>
  ),
};
