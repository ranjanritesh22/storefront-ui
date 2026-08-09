import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  // No "autodocs" tag: pagination.mdx attaches a custom docs page via
  // <Meta of={PaginationStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Data-driven page nav composed of \`Button\`s — no internal state, so it stays
a Server Component. Give \`hrefFor\` to render links instead of buttons for a
server-rendered PLP that paginates via the URL.

## Overriding this component

**1. Tokens** — inherited from \`Button\`'s tokens (\`--ui-color-primary\`, \`--ui-color-border\`).

**2. \`paginationVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`list\`, \`item\`, \`link\`, \`ellipsis\`, \`prev\`, \`next\`).

**4. \`slots.Link\`** — swap the anchor for \`next/link\` (used with \`hrefFor\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    totalPages: { control: "number" },
    siblingCount: { control: "number" },
  },
  args: {
    size: "md",
    page: 1,
    totalPages: 11,
    siblingCount: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

function ControlledPagination(args: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
}

export const Playground: Story = {
  render: (args) => <ControlledPagination {...args} />,
};

export const MiddleOfRange: Story = {
  render: (args) => <ControlledPagination {...args} page={6} />,
};

export const LastPage: Story = {
  render: (args) => <ControlledPagination {...args} page={11} />,
};

export const AsLinks: Story = {
  name: "hrefFor — render as links",
  render: (args) => <Pagination {...args} hrefFor={(page) => `?page=${page}`} />,
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every pagination at once",
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <ControlledPagination {...args} />
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <ControlledPagination {...args} />
      </div>
    </div>
  ),
};
