import type { Meta, StoryObj } from "@storybook/react";
import { FooterShell } from "./footer-shell";
import { Icon } from "../icon/icon";

const meta: Meta<typeof FooterShell> = {
  title: "Navigation/FooterShell",
  component: FooterShell,
  parameters: {
    docs: {
      description: {
        component: `
Pure slot container for the site footer — column grid layout, a newsletter
slot, a social row, and a bottom bar below a divider. No default columns or
links. No internal state, so it stays a Server Component.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`.

**2. \`footerShellVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`inner\`, \`columns\`, \`column\`,
\`columnHeading\`, \`newsletter\`, \`social\`, \`bottomBar\`).

**4. Slot props** — \`columns\` / \`newsletter\` / \`social\` / \`bottomBar\` each
accept any \`ReactNode\` / markup.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FooterShell>;

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm text-foreground-muted">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} className="hover:text-foreground hover:underline">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export const Playground: Story = {
  render: () => (
    <FooterShell
      columns={[
        {
          heading: "Shop",
          children: (
            <LinkList
              links={[
                { label: "New Arrivals", href: "/new" },
                { label: "Men", href: "/men" },
                { label: "Women", href: "/women" },
              ]}
            />
          ),
        },
        {
          heading: "Help",
          children: (
            <LinkList
              links={[
                { label: "Shipping", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "Contact", href: "/contact" },
              ]}
            />
          ),
        },
        {
          heading: "Company",
          children: (
            <LinkList
              links={[
                { label: "About", href: "/about" },
                { label: "Careers", href: "/careers" },
              ]}
            />
          ),
        },
      ]}
      newsletter={
        <div>
          <h3 className="mb-3 font-sans text-sm font-semibold text-foreground">Newsletter</h3>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-fg"
            >
              Sign up
            </button>
          </form>
        </div>
      }
      social={
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="text-foreground-muted hover:text-foreground">
            <Icon name="share" />
          </a>
        </div>
      }
      bottomBar={
        <>
          <span>© 2026 Acme, Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-foreground hover:underline">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground hover:underline">
              Terms
            </a>
          </div>
        </>
      }
    />
  ),
};
