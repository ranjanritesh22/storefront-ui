import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./toast";
import { toast } from "../../hooks/use-toast";
import { Button } from "../button/button";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  // No "autodocs" tag: toast.mdx attaches a custom docs page via <Meta of={ToastStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A headless queue (\`useToast\`/\`toast()\`, in \`packages/ui/src/hooks/use-toast.ts\`) plus a
presentational renderer (\`Toaster\`, \`Toast\`, \`ToastTitle\`, \`ToastDescription\`,
\`ToastAction\`). Call \`toast({ title, description, variant, action, duration })\` from any event
handler or callback — no import from this component folder required — and mount one \`<Toaster />\`
(e.g. once in the root layout) to render whatever's queued.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-success\`, \`--ui-color-warning\`, \`--ui-color-danger\`, \`--ui-shadow-lg\`.

**2. \`toastVariants\` / \`toastViewportVariants\` / \`toastIconVariants\`** — exported publicly.

**3. \`classNames\` on \`Toaster\`** — a slot map for \`icon\`, \`title\`, \`description\`, \`action\`, \`close\`,
applied to every toast \`Toaster\` renders.

**4. Composition** — reach for \`Toast\`/\`ToastTitle\`/\`ToastDescription\`/\`ToastAction\` directly to
hand-roll a custom viewport instead of \`Toaster\`'s.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast({ title: "Added to cart", description: "Running shoes, size 10" })}
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({ title: "Order confirmed", description: "You'll get a shipping email soon.", variant: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Low stock", description: "Only 2 left in your size.", variant: "warning" })}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast({ title: "Payment failed", description: "Check your card details.", variant: "danger" })}
      >
        Danger
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Item removed",
            action: { label: "Undo", onClick: () => toast({ title: "Item restored" }) },
          })
        }
      >
        With action
      </Button>
      <Toaster />
    </div>
  ),
};

export const Queueing: Story = {
  name: "Queue — newest on top, oldest dropped past the limit",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => {
          for (let i = 1; i <= 6; i += 1) {
            toast({ title: `Notification ${i}` });
          }
        }}
      >
        Fire 6 toasts
      </Button>
      <Toaster />
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames on Toaster — reach a specific part",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast({ title: "Custom styling", description: "classNames reaches title and description." })}
      >
        Show styled toast
      </Button>
      <Toaster classNames={{ title: "text-primary", description: "italic" }} />
    </div>
  ),
};
