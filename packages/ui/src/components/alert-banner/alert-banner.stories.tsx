import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AlertBanner } from "./alert-banner";

const meta: Meta<typeof AlertBanner> = {
  title: "Components/AlertBanner",
  component: AlertBanner,
  // No "autodocs" tag: alert-banner.mdx attaches a custom docs page via <Meta of={AlertBannerStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A persistent, page-level status message — no queueing or auto-dismiss (see \`Toast\` for that). No
internal state, so it stays a Server Component. Dismissal is fully owned by the consumer: pass
\`onDismiss\` to render a close button, and stop rendering \`AlertBanner\` however you track that
(local state, a dismissed-ids list, ...).

## Overriding this component

**1. Tokens** — \`--ui-color-success\`, \`--ui-color-warning\`, \`--ui-color-danger\`, \`--ui-color-primary\`.

**2. \`alertBannerVariants\` / \`alertBannerIconVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map for \`icon\`, \`title\`, \`description\`, \`dismiss\`.
        `,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
  },
  args: {
    variant: "info",
    title: "Free shipping this weekend",
  },
};

export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const Playground: Story = {
  render: (args) => <AlertBanner {...args}>Orders over $50 ship free through Sunday.</AlertBanner>,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <AlertBanner variant="info" title="Heads up">
        Standard shipping now takes 5–7 business days.
      </AlertBanner>
      <AlertBanner variant="success" title="Order confirmed">
        You&apos;ll get a shipping email soon.
      </AlertBanner>
      <AlertBanner variant="warning" title="Low stock">
        Only 2 left in your size.
      </AlertBanner>
      <AlertBanner variant="danger" title="Payment failed">
        Check your card details and try again.
      </AlertBanner>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    function Demo() {
      const [visible, setVisible] = React.useState(true);
      if (!visible) return <p className="font-sans text-sm text-foreground-muted">Dismissed.</p>;
      return (
        <AlertBanner variant="info" title="New: order tracking" onDismiss={() => setVisible(false)}>
          Track every order from your account page.
        </AlertBanner>
      );
    }
    return <Demo />;
  },
};

export const WithAction: Story = {
  render: () => (
    <AlertBanner
      variant="danger"
      title="Couldn't load recommendations"
      action={
        <button type="button" className="mt-1 font-sans text-sm font-medium text-danger underline underline-offset-2">
          Retry
        </button>
      }
    >
      Something went wrong on our end.
    </AlertBanner>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: () => (
    <AlertBanner
      variant="success"
      title="Custom styling"
      classNames={{ title: "text-primary", description: "italic" }}
    >
      classNames reaches title and description independently.
    </AlertBanner>
  ),
};
