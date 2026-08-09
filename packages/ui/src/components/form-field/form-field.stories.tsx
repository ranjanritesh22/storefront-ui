import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";
import { Input } from "../input/input";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Composes a label, a control (passed as \`children\`), an optional hint, and an
optional error. Wires \`aria-describedby\` and \`aria-invalid\` onto the control
automatically by cloning it — the control itself stays unaware of \`hint\`/\`error\`.
A Server Component: id generation uses \`useId()\`, which is RSC-safe.

## Overriding this component

**1. Tokens** — \`--ui-color-danger\` drives the error text colour.

**2. \`classNames\`** — a slot map (\`root\`, \`label\`, \`control\`, \`hint\`, \`error\`)
since a single \`className\` can only reach the root:

\`\`\`tsx
<FormField classNames={{ label: "text-xs", error: "font-semibold" }} label="Email">
  <Input />
</FormField>
\`\`\`

**3. \`className\`** — shorthand for the root wrapper, merged last via \`cn()\`.
        `,
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    gap: { control: "select", options: ["sm", "md"] },
  },
  args: {
    label: "Email",
    hint: "We'll never share your email.",
    required: false,
    gap: "md",
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  args: { error: "Enter a valid email address." },
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Input type="email" defaultValue="not-an-email" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => (
    <div className="w-80">
      <FormField {...args}>
        <Input type="email" />
      </FormField>
    </div>
  ),
};
