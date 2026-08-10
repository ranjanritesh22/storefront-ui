import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Backdrop } from "./backdrop";
import { Button } from "../button/button";
import { Spinner } from "../spinner/spinner";

const meta: Meta<typeof Backdrop> = {
  title: "Components/Backdrop",
  component: Backdrop,
  // No "autodocs" tag: backdrop.mdx attaches a custom docs page via <Meta of={BackdropStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A standalone, full-viewport overlay for custom modal/loading surfaces that aren't built on Radix
Dialog (\`Dialog\`/\`Drawer\` render their own overlay already). No open/close logic of its own —
\`open\` only drives the fade transition, so mounting/unmounting it (and matching that to the
transition) is the consumer's call.

## Overriding this component

**1. Tokens** — \`--ui-color-overlay\`.

**2. \`backdropVariants\`** — exported publicly.
        `,
      },
    },
  },
  argTypes: {
    blur: { control: "boolean" },
  },
  args: {
    blur: false,
  },
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

export const Playground: Story = {
  render: (args) => (
    <div className="relative h-64 overflow-hidden rounded-lg border border-border">
      <Backdrop {...args} className="absolute" />
    </div>
  ),
};

export const ClickToDismiss: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="relative h-64 overflow-hidden rounded-lg border border-border">
          {!open ? (
            <div className="flex h-full items-center justify-center">
              <Button variant="outline" onClick={() => setOpen(true)}>
                Reopen
              </Button>
            </div>
          ) : (
            <Backdrop className="absolute" onClick={() => setOpen(false)} />
          )}
        </div>
      );
    }
    return <Demo />;
  },
};

export const LoadingOverlay: Story = {
  render: () => (
    <div className="relative h-64 overflow-hidden rounded-lg border border-border">
      <Backdrop className="absolute" blur />
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner size="lg" className="text-surface" />
      </div>
    </div>
  ),
};
