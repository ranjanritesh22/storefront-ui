import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "./visually-hidden";
import { Icon } from "../icon/icon";

const meta: Meta<typeof VisuallyHidden> = {
  title: "Layout/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    docs: {
      description: {
        component: `
Content present for assistive tech but not sighted users — an icon-only
button's label, or structural heading text. Wraps Radix's primitive, which
uses the standard clip-rect technique (not \`display: none\`, so it stays in
the accessibility tree).

## Overriding this component

**1. \`visuallyHiddenVariants\`** — exported publicly (currently unstyled — the
hiding itself is inline style, not a class).

**2. \`className\`** — merged last.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Playground: Story = {
  render: () => (
    <button type="button" className="rounded-md border border-border p-2">
      <Icon name="close" aria-hidden="true" />
      <VisuallyHidden>Close</VisuallyHidden>
    </button>
  ),
};
