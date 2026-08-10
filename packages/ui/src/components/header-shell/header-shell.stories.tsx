import type { Meta, StoryObj } from "@storybook/react";
import { HeaderShell } from "./header-shell";
import { Icon } from "../icon/icon";
import { NavMenu, NavMenuList, NavMenuItem, NavMenuLink } from "../nav-menu/nav-menu";

const meta: Meta<typeof HeaderShell> = {
  title: "Navigation/HeaderShell",
  component: HeaderShell,
  parameters: {
    docs: {
      description: {
        component: `
Pure slot container for the site header — it owns responsive layout only
(logo shrink-to-fit, nav hidden below \`lg\`, search grows to fill remaining
space, actions pinned to the end). No default logo, nav shape or action set:
every region is a named prop the consumer fills. No internal state, so it
stays a Server Component.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-z-sticky\`.

**2. \`headerShellVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`utilityBar\`, \`inner\`, \`logo\`, \`search\`, \`nav\`,
\`mobileNav\`, \`actions\`).

**4. Slot props** — \`logo\` / \`search\` / \`nav\` / \`mobileNav\` / \`actions\` /
\`utilityBar\` each accept any \`ReactNode\`, so the whole region is a
structural replacement, not a styling override.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderShell>;

export const Playground: Story = {
  render: () => (
    <HeaderShell
      utilityBar={
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-1.5">
          Free delivery on orders over $75
        </div>
      }
      logo={
        <a href="/" className="font-sans text-lg font-bold text-foreground">
          ACME
        </a>
      }
      nav={
        <NavMenu className="static justify-start">
          <NavMenuList>
            <NavMenuItem>
              <NavMenuLink href="/men">Men</NavMenuLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavMenuLink href="/women">Women</NavMenuLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavMenuLink href="/sale">Sale</NavMenuLink>
            </NavMenuItem>
          </NavMenuList>
        </NavMenu>
      }
      search={
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
        />
      }
      actions={
        <>
          <button type="button" aria-label="Account" className="rounded-md p-2 hover:bg-surface-raised">
            <Icon name="user" />
          </button>
          <button type="button" aria-label="Wishlist" className="rounded-md p-2 hover:bg-surface-raised">
            <Icon name="heart" />
          </button>
          <button type="button" aria-label="Cart" className="rounded-md p-2 hover:bg-surface-raised">
            <Icon name="cart" />
          </button>
        </>
      }
    />
  ),
};
