import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  // No "autodocs" tag: breadcrumb.mdx attaches a custom docs page via
  // <Meta of={BreadcrumbStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Data-driven breadcrumb trail — no internal state, so it stays a Server
Component. The last item (or any item with no \`href\`) renders as the
current, non-linked page.

## Overriding this component

**1. Tokens** — \`--ui-color-foreground\`, \`--ui-color-foreground-muted\`.

**2. \`breadcrumbVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`list\`, \`item\`, \`link\`, \`current\`, \`separator\`).

**4. \`slots.Link\`** — swap the anchor for \`next/link\`.
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
  },
  args: {
    size: "md",
    items: [
      { label: "Home", href: "/" },
      { label: "Men", href: "/men" },
      { label: "Shoes" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {};

export const CustomSeparator: Story = {
  args: { separator: "/" },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every breadcrumb at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Breadcrumb {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Breadcrumb {...args} />
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots.Link — swap the anchor",
  render: (args) => (
    <Breadcrumb
      {...args}
      slots={{
        Link: ({ href, children, className }) => (
          <a href={href} className={className} data-demo-router-link="true">
            {children}
          </a>
        ),
      }}
    />
  ),
};
