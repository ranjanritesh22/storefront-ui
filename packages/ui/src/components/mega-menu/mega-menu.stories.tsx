import type { Meta, StoryObj } from "@storybook/react";
import { MegaMenu, type MegaMenuItem } from "./mega-menu";

const items: MegaMenuItem[] = [
  { label: "New Arrivals", href: "/new" },
  {
    label: "Men",
    sections: [
      {
        heading: "Footwear",
        links: [
          { label: "Running", href: "/men/running" },
          { label: "Basketball", href: "/men/basketball" },
          { label: "Lifestyle", href: "/men/lifestyle" },
        ],
      },
      {
        heading: "Apparel",
        links: [
          { label: "Jackets", href: "/men/jackets" },
          { label: "T-Shirts", href: "/men/tshirts" },
        ],
      },
    ],
    featured: { title: "Winter running collection", href: "/men/featured" },
  },
  {
    label: "Women",
    sections: [
      {
        heading: "Footwear",
        links: [
          { label: "Running", href: "/women/running" },
          { label: "Training", href: "/women/training" },
        ],
      },
    ],
  },
  { label: "Sale", href: "/sale" },
];

const meta: Meta<typeof MegaMenu> = {
  title: "Navigation/MegaMenu",
  component: MegaMenu,
  parameters: {
    docs: {
      description: {
        component: `
Multi-column disclosure navigation, data-driven from \`items\`. Built on
\`@radix-ui/react-navigation-menu\`: roving keyboard navigation (arrow keys
move between top-level items; Enter/Space or hover opens a panel; Escape
closes it and returns focus to the trigger), and a shared, size-animated
\`Viewport\` so a wider or taller panel never shifts page layout.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`, \`--ui-z-dropdown\`.

**2. \`megaMenuTriggerVariants\` / \`megaMenuLinkVariants\` / \`megaMenuContentVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`list\`, \`item\`, \`trigger\`, \`content\`, \`section\`,
\`sectionHeading\`, \`link\`, \`featured\`).

**4. \`slots.Link\`** — swap every rendered anchor for \`next/link\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MegaMenu>;

export const Playground: Story = {
  render: () => (
    <div className="pb-64">
      <MegaMenu items={items} className="static justify-start" />
    </div>
  ),
};
