import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: `
Locks a child to a fixed width/height ratio — the wrapper a product tile or
hero banner \`<Image>\` sits inside. Thin wrapper around Radix's
\`AspectRatio.Root\`, which owns the cross-browser sizing trick.

## Overriding this component

**1. \`ratio\`** — any \`width / height\` number, e.g. \`16 / 9\`, \`4 / 3\`, \`1\`.

**2. \`aspectRatioVariants\`** — exported publicly.

**3. \`className\`** — merged last.
        `,
      },
    },
  },
  args: {
    ratio: 16 / 9,
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <div className="flex size-full items-center justify-center bg-surface-raised text-sm text-foreground-muted">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-40">
      <AspectRatio ratio={1}>
        <div className="flex size-full items-center justify-center bg-surface-raised text-sm text-foreground-muted">
          1 / 1
        </div>
      </AspectRatio>
    </div>
  ),
};
