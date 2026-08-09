import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A CVA-driven button with five semantic variants, four sizes, and
\`asChild\` support for rendering as any single child element (e.g. \`next/link\`).

## Overriding this component

**1. Tokens (rebrand every button at once)** — override the semantic colour
tokens Button consumes (\`--ui-color-primary\`, \`--ui-color-danger\`, \`--ui-color-border\`,
\`--ui-color-ring\`, ...) on \`:root\` or under \`[data-theme]\` / \`[data-brand]\`. No
rebuild of this package required.

**2. \`buttonVariants\` (style something that isn't a \`Button\`)** — \`buttonVariants\`
is exported publicly, so you can apply Button's exact styling to a raw element:

\`\`\`tsx
<a className={buttonVariants({ variant: "secondary" })} href="/cart">Cart</a>
\`\`\`

**3. \`className\` (one-off tweak)** — passed through \`cn()\` last, so it always wins
on a conflicting utility:

\`\`\`tsx
<Button className="rounded-full px-8">Checkout</Button>
\`\`\`

**4. \`asChild\` (structural change)** — swap the rendered element while keeping
Button's styling and behaviour, e.g. to render a \`next/link\`:

\`\`\`tsx
<Button asChild><Link href="/cart">Go to cart</Link></Button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
    children: "Add to cart",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          Size {size}
        </Button>
      ))}
      <Button {...args} size="icon" aria-label="Add">
        +
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div className="w-80">
      <Button {...args} />
    </div>
  ),
};

export const AsLink: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="#cart">Go to cart</a>
    </Button>
  ),
};
