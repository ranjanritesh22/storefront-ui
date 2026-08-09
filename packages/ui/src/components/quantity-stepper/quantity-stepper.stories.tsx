import type { Meta, StoryObj } from "@storybook/react";
import { QuantityStepper } from "./quantity-stepper";

const meta: Meta<typeof QuantityStepper> = {
  title: "Components/QuantityStepper",
  component: QuantityStepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A client component built on the headless \`useQuantity\` hook, exported
publicly from \`@storefront/ui\` so consumers can build their own stepper UI
without this markup.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-surface\`.

**2. \`quantityStepperVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`decrementButton\`, \`incrementButton\`,
\`input\`) since this is a composite of three parts.

**4. \`useQuantity\`** — the headless hook underneath, for a fully custom UI:

\`\`\`tsx
const quantity = useQuantity({ min: 1, max: 10 });
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    defaultValue: 1,
    min: 1,
    max: 10,
    step: 1,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof QuantityStepper>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <QuantityStepper key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const AtBounds: Story = {
  args: { defaultValue: 1, min: 1, max: 1 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
