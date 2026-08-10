import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
import { Button } from "../button/button";
import { Icon } from "../icon/icon";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  // No "autodocs" tag: dropdown-menu.mdx attaches a custom docs page via <Meta of={DropdownMenuStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Wraps Radix \`DropdownMenu\` — typeahead, roving focus, submenus, and focus
return on close all come from Radix. Use it for a command list triggered by
a click (a product card's overflow menu, a table row's actions); reach for
\`Select\` instead when the trigger represents a single chosen value.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-surface\`, \`--ui-color-danger\`, \`--ui-shadow-md\`.

**2. \`dropdownMenuContentVariants\` / \`dropdownMenuItemVariants\`** — exported publicly.

**3. \`className\`** — every part accepts one directly (no slot map needed since each part is
already its own component).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Product actions">
          <Icon name="more-horizontal" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Product</DropdownMenuLabel>
        <DropdownMenuItem>
          <Icon name="edit" size="sm" />
          Edit details
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="share" size="sm" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="tag" size="sm" />
            Move to collection
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>New arrivals</DropdownMenuItem>
            <DropdownMenuItem>Clearance</DropdownMenuItem>
            <DropdownMenuItem>Featured</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <Icon name="trash" size="sm" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const CheckboxAndRadioItems: Story = {
  render: () => {
    function Demo() {
      const [showSoldOut, setShowSoldOut] = React.useState(true);
      const [sort, setSort] = React.useState("popularity");
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Icon name="filter" size="sm" />
              View options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Visibility</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showSoldOut} onCheckedChange={setShowSoldOut}>
              Show sold out items
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="popularity">Popularity</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return <Demo />;
  },
};

export const OverrideClassNames: Story = {
  name: "3. className — reach a specific part",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Danger menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-danger">
        <DropdownMenuItem variant="danger">Delete account</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
