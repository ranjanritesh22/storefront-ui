import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./stepper";

const steps = [
  { label: "Cart", href: "/cart" },
  { label: "Shipping", description: "Address & method", href: "/shipping" },
  { label: "Payment", description: "Card details" },
  { label: "Review" },
];

const meta: Meta<typeof Stepper> = {
  title: "Navigation/Stepper",
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: `
Checkout progress indicator — horizontal (default) or vertical. Purely
data-driven from \`steps\` + \`currentStep\`, so it stays a Server Component.
Each step's status (completed / current / upcoming) is exposed both visually
(\`data-state\` on the indicator) and to screen readers (a per-step
\`getMessages().stepper.step()\` string plus \`aria-current="step"\` on the
active one). Completed steps with an \`href\` render their indicator as a
clickable link back to that step.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`stepperIndicatorVariants\` / \`stepperLabelVariants\` / \`stepperConnectorVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`list\`, \`item\`, \`indicator\`, \`label\`, \`description\`, \`connector\`).

**4. \`slots.Link\`** — swap the anchor for \`next/link\`.
        `,
      },
    },
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    currentStep: { control: { type: "number", min: 0, max: 3 } },
  },
  args: {
    steps,
    currentStep: 2,
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="w-64">
      <Stepper {...args} />
    </div>
  ),
};
