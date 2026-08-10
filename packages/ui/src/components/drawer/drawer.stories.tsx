import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerTitle,
  DrawerDescription,
} from "./drawer";
import { Button } from "../button/button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  // No "autodocs" tag: drawer.mdx attaches a custom docs page via <Meta of={DrawerStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Wraps Radix \`Dialog\` — same modal semantics as \`Dialog\` (focus trap,
Escape/outside-click dismissal, scroll lock), but \`DrawerContent\` docks to a
viewport edge and slides in instead of appearing centered. \`side\` is logical
on the inline axis (\`"start"\` / \`"end"\`, flipping with \`dir="rtl"\`) plus
physical \`"top"\` / \`"bottom"\`.

## Overriding this component

**1. Tokens** — \`--ui-color-overlay\`, \`--ui-color-surface\`, \`--ui-color-border\`, \`--ui-shadow-lg\`.

**2. \`drawerOverlayVariants\` / \`drawerContentVariants\`** — exported publicly.

**3. \`classNames\` on \`DrawerContent\`** — a slot map for \`overlay\`, \`content\`, \`header\`, \`footer\`.

**4. \`asChild\`** — \`DrawerTrigger\`/\`DrawerClose\` support it natively (inherited from Radix).
        `,
      },
    },
  },
  argTypes: {
    side: { control: "select", options: ["top", "end", "bottom", "start"] },
  },
  args: {
    side: "end",
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Playground: Story = {
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open cart</Button>
      </DrawerTrigger>
      <DrawerContent side={args.side}>
        <DrawerHeader>
          <DrawerTitle>Your cart</DrawerTitle>
          <DrawerDescription>2 items</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="font-sans text-sm text-foreground-muted">Cart contents go here.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline">Continue shopping</Button>
          <Button>Checkout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "end", "bottom", "start"] as const).map((side) => (
        <Drawer key={side}>
          <DrawerTrigger asChild>
            <Button variant="outline">{side}</Button>
          </DrawerTrigger>
          <DrawerContent side={side}>
            <DrawerHeader>
              <DrawerTitle>Drawer from &quot;{side}&quot;</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p className="font-sans text-sm text-foreground-muted">
                {side === "start" || side === "end"
                  ? "Logical — flips with dir=\"rtl\"."
                  : "Physical — same edge regardless of direction."}
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames on DrawerContent — reach a specific part",
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open styled drawer</Button>
      </DrawerTrigger>
      <DrawerContent classNames={{ overlay: "bg-primary/30", footer: "justify-between" }}>
        <DrawerHeader>
          <DrawerTitle>Custom overlay + footer</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="ghost">Learn more</Button>
          <Button>Got it</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
