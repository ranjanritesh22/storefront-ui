import type { Meta, StoryObj } from "@storybook/react";
import { QuantityStepper } from "./quantity-stepper";
import { useQuantity } from "../../hooks/use-quantity";

const meta: Meta<typeof QuantityStepper> = {
  title: "Components/QuantityStepper",
  component: QuantityStepper,
  // No "autodocs" tag: quantity-stepper.mdx attaches a custom docs page via
  // <Meta of={QuantityStepperStories} />.
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

/**
 * "Overriding this component" demo stories — same QuantityStepper, three override layers.
 * Referenced by quantity-stepper.mdx via <Canvas of={QuantityStepperStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every stepper at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <QuantityStepper {...args} />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <QuantityStepper {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <QuantityStepper {...args} />
      </div>
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <QuantityStepper {...args} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'classNames={{ root: "rounded-full", input: "font-semibold" }}'}
        </span>
        <QuantityStepper
          {...args}
          classNames={{ root: "rounded-full", input: "font-semibold" }}
        />
      </div>
    </div>
  ),
};

function CustomStepper() {
  const quantity = useQuantity({ defaultValue: 1, min: 1, max: 5 });
  return (
    <div className="flex items-center gap-3 font-sans text-sm text-foreground">
      <button
        type="button"
        onClick={quantity.decrement}
        disabled={!quantity.canDecrement}
        className="flex size-8 items-center justify-center rounded-full border border-primary text-primary disabled:opacity-40"
      >
        −
      </button>
      <span className="w-6 text-center tabular-nums">{quantity.inputProps.value}</span>
      <button
        type="button"
        onClick={quantity.increment}
        disabled={!quantity.canIncrement}
        className="flex size-8 items-center justify-center rounded-full border border-primary text-primary disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export const OverrideStructural: Story = {
  name: "4. useQuantity — a fully custom UI",
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <span className="font-mono text-xs text-foreground-muted">
        useQuantity({"{ min: 1, max: 5 }"}) with bespoke markup
      </span>
      <CustomStepper />
    </div>
  ),
};
