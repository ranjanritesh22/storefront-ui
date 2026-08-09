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
import { dialogContentVariants } from "./dialog.variants";
import { Button } from "../button/button";
import { cn } from "../../lib/cn";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  // No "autodocs" tag: dialog.mdx attaches a custom docs page via <Meta of={DialogStories} />.
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

/**
 * "Overriding this component" demo stories — same Dialog, three override layers.
 * Referenced by dialog.mdx via <Canvas of={DialogStories.OverrideXxx} />.
 *
 * OverrideTokens renders a static, non-modal preview of dialogContentVariants() rather than
 * three simultaneously-open Radix dialogs: Dialog content portals to document.body by default,
 * so a real open dialog can't be visually scoped inside a [data-brand] wrapper in this docs
 * canvas the way a non-portaled component can. The token mechanism is identical either way —
 * only the demo needs a different shape.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every dialog at once",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(
        [
          { label: "default", attrs: {} },
          { label: 'data-brand="acme"', attrs: { "data-brand": "acme" } },
          { label: 'data-theme="dark"', attrs: { "data-theme": "dark" } },
        ] as const
      ).map(({ label, attrs }) => (
        <div key={label} {...attrs} className="flex flex-col items-start gap-2 rounded-md bg-surface p-4">
          <span className="font-mono text-xs text-foreground-muted">{label}</span>
          <div
            className={cn(
              dialogContentVariants({ size: "sm" }),
              "static translate-x-0 translate-y-0",
            )}
          >
            <DialogHeader>
              <DialogTitle>Remove item</DialogTitle>
              <DialogDescription>This will remove the item from your cart.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="danger" size="sm">
                Remove
              </Button>
            </DialogFooter>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames on DialogContent — reach a specific part",
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

export const OverrideStructural: Story = {
  name: "4. asChild on DialogTrigger — swap the rendered element",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <a href="#cart" className="font-sans text-sm text-primary underline underline-offset-2">
          View cart details
        </a>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Your cart</DialogTitle>
          <DialogDescription>Triggered from a plain anchor via asChild.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};
