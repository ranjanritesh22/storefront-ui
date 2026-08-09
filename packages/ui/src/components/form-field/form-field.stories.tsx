import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";
import { Input } from "../input/input";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  // No "autodocs" tag: form-field.mdx attaches a custom docs page via <Meta of={FormFieldStories} />.
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

/**
 * "Overriding this component" demo stories — same FormField, three override layers.
 * Referenced by form-field.mdx via <Canvas of={FormFieldStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every field at once",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <div className="w-56">
          <FormField label="Email" error="Enter a valid email address.">
            <Input type="email" defaultValue="not-an-email" />
          </FormField>
        </div>
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <div className="w-56">
          <FormField label="Email" error="Enter a valid email address.">
            <Input type="email" defaultValue="not-an-email" />
          </FormField>
        </div>
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <div className="w-56">
          <FormField label="Email" error="Enter a valid email address.">
            <Input type="email" defaultValue="not-an-email" />
          </FormField>
        </div>
      </div>
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "2. classNames — reach a specific part",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <div className="w-64">
          <FormField label="Email" hint="We'll never share your email.">
            <Input type="email" placeholder="you@example.com" />
          </FormField>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'classNames={{ label: "text-xs uppercase", hint: "italic" }}'}
        </span>
        <div className="w-64">
          <FormField
            label="Email"
            hint="We'll never share your email."
            classNames={{ label: "text-xs uppercase tracking-wide", hint: "italic" }}
          >
            <Input type="email" placeholder="you@example.com" />
          </FormField>
        </div>
      </div>
    </div>
  ),
};

export const OverrideClassName: Story = {
  name: "3. className — shorthand for the root",
  render: () => (
    <div className="w-64">
      <FormField label="Email" hint="We'll never share your email." className="gap-3 rounded-md border border-border p-3">
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};
