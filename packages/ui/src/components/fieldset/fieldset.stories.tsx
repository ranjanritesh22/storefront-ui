import type { Meta, StoryObj } from "@storybook/react";
import { Fieldset } from "./fieldset";
import { RadioGroup, Radio } from "../radio-group/radio-group";
import { Checkbox } from "../checkbox/checkbox";

const meta: Meta<typeof Fieldset> = {
  title: "Components/Fieldset",
  component: Fieldset,
  // No "autodocs" tag: fieldset.mdx attaches a custom docs page via
  // <Meta of={FieldsetStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A native \`<fieldset>\`/\`<legend>\` wrapper for grouping related controls
under one accessible name — no internal state, so it stays a Server
Component. Setting \`disabled\` disables every descendant control natively.
        `,
      },
    },
  },
  args: {
    legend: "Shipping method",
    description: "Choose how fast you'd like your order.",
    required: false,
    disabled: false,
    invalid: false,
  },
  render: (args) => (
    <Fieldset {...args}>
      <RadioGroup defaultValue="standard">
        <Radio value="standard" label="Standard shipping" description="5-7 business days" />
        <Radio value="express" label="Express shipping" description="2-3 business days" />
      </RadioGroup>
    </Fieldset>
  ),
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Playground: Story = {};

export const CheckboxGroup: Story = {
  args: { legend: "Categories", description: undefined },
  render: (args) => (
    <Fieldset {...args}>
      <Checkbox label="Running shoes" />
      <Checkbox label="Boots" />
      <Checkbox label="Sandals" />
    </Fieldset>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { invalid: true },
};
