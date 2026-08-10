import type { Meta, StoryObj } from "@storybook/react";
import {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
} from "./nav-menu";

const meta: Meta<typeof NavMenu> = {
  title: "Navigation/NavMenu",
  component: NavMenu,
  parameters: {
    docs: {
      description: {
        component: `
Flat top-level site navigation — plain links plus the occasional single
dropdown panel. Wraps \`@radix-ui/react-navigation-menu\`: roving keyboard
navigation, hover-intent open/close timing, and a shared animated
\`Viewport\` so panels resize without layout shift. For a true multi-column
mega menu, use \`MegaMenu\`.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`, \`--ui-z-dropdown\`.

**2. \`navMenuTriggerVariants\` / \`navMenuLinkVariants\` / \`navMenuContentVariants\`** — exported publicly.

**3. \`className\`** — merged last, on each part individually.

**4. i18n** — the \`<nav>\`'s default \`aria-label\` comes from \`getMessages().navMenu.nav\`;
an explicit \`aria-label\` prop wins.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

export const Playground: Story = {
  render: () => (
    <NavMenu className="static justify-start">
      <NavMenuList>
        <NavMenuItem>
          <NavMenuLink href="/new">New Arrivals</NavMenuLink>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuTrigger>Men</NavMenuTrigger>
          <NavMenuContent>
            <div className="flex flex-col gap-1">
              <NavMenuLink href="/men/shoes">Shoes</NavMenuLink>
              <NavMenuLink href="/men/apparel">Apparel</NavMenuLink>
              <NavMenuLink href="/men/accessories">Accessories</NavMenuLink>
            </div>
          </NavMenuContent>
        </NavMenuItem>
        <NavMenuItem>
          <NavMenuLink href="/sale">Sale</NavMenuLink>
        </NavMenuItem>
      </NavMenuList>
    </NavMenu>
  ),
};
