import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component: `
Custom-styled scrollbars over a native-feeling scroll container — e.g. a long
MegaMenu column or a horizontally-scrolling chip row. Wraps Radix's
primitive, which owns pointer/touch/keyboard scroll handling.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`.

**2. \`scrollAreaVariants\` / \`scrollAreaScrollbarVariants\` / \`scrollAreaThumbVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`viewport\`, \`scrollbar\`, \`thumb\`).
        `,
      },
    },
  },
  argTypes: {
    orientation: { control: "radio", options: ["vertical", "horizontal", "both"] },
  },
  args: {
    orientation: "vertical",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Playground: Story = {
  render: (args) => (
    <ScrollArea {...args} className="h-48 w-64 rounded-md border border-border">
      <div className="flex flex-col gap-2 p-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="text-sm text-foreground">
            Row {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
