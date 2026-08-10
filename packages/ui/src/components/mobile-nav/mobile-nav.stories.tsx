import type { Meta, StoryObj } from "@storybook/react";
import { MobileNav, type MobileNavItem } from "./mobile-nav";

const items: MobileNavItem[] = [
  {
    label: "Men",
    children: [
      { label: "Shoes", href: "/men/shoes" },
      { label: "Apparel", href: "/men/apparel" },
      { label: "Accessories", href: "/men/accessories" },
    ],
  },
  {
    label: "Women",
    children: [
      { label: "Shoes", href: "/women/shoes" },
      { label: "Apparel", href: "/women/apparel" },
    ],
  },
  { label: "New Arrivals", href: "/new" },
  { label: "Sale", href: "/sale" },
];

const meta: Meta<typeof MobileNav> = {
  title: "Navigation/MobileNav",
  component: MobileNav,
  parameters: {
    docs: {
      description: {
        component: `
Drawer-based off-canvas menu with nested categories and back navigation —
the small-viewport counterpart to \`MegaMenu\`. Built on \`Drawer\`
(\`@radix-ui/react-dialog\`): focus trap, Escape/outside-click dismissal, and
scroll lock come for free. Drilling into \`item.children\` keeps a back-stack
so the shopper can retrace their steps one level at a time; picking a leaf
link closes the drawer.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`mobileNavTriggerVariants\` / \`mobileNavItemVariants\` / \`mobileNavBackVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`content\`, \`header\`, \`list\`, \`item\`, \`link\`).

**4. \`slots.Link\`** — swap every rendered anchor for \`next/link\`; \`trigger\`
replaces the default hamburger button.

**5. i18n** — \`open\` / \`close\` / \`back\` / \`nav\` all come from
\`getMessages().mobileNav\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

export const Playground: Story = {
  render: () => <MobileNav items={items} />,
};
