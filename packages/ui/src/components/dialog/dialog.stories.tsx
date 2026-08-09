import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";
import { Button } from "../button/button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Wraps Radix \`Dialog\` — portal, focus trap, and Escape/outside-click
dismissal come from Radix. \`data-state="open"|"closed"\` is emitted by Radix
on the overlay, content, and trigger automatically.

## Overriding this component

**1. Tokens** — \`--ui-color-overlay\` (backdrop), \`--ui-color-surface\`,
\`--ui-color-border\`, \`--ui-shadow-lg\`.

**2. \`dialogOverlayVariants\` / \`dialogContentVariants\`** — exported publicly.

**3. \`classNames\` on \`DialogContent\`** — a slot map for \`overlay\`, \`content\`,
\`header\`, \`footer\`:

\`\`\`tsx
<DialogContent classNames={{ overlay: "bg-primary/40", footer: "justify-between" }}>
  <DialogHeader><DialogTitle>Confirm</DialogTitle></DialogHeader>
  <DialogFooter><Button>Confirm</Button></DialogFooter>
</DialogContent>
\`\`\`

**4. \`asChild\`** — \`DialogTrigger\`/\`DialogClose\` support it natively (inherited
from Radix), e.g. to trigger from a \`next/link\`.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent size={args.size}>
        <DialogHeader>
          <DialogTitle>Remove item</DialogTitle>
          <DialogDescription>
            This will remove the item from your cart. You can't undo this.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="danger">Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const CustomSlotStyling: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open styled dialog</Button>
      </DialogTrigger>
      <DialogContent classNames={{ overlay: "bg-primary/30", footer: "justify-between" }}>
        <DialogHeader>
          <DialogTitle>Custom overlay + footer</DialogTitle>
          <DialogDescription>classNames reaches overlay and footer independently.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Learn more</Button>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
