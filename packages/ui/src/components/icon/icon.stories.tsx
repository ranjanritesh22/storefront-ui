import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";
import { defaultIcons, type IconName } from "./icon-registry";

const iconNames = Object.keys(defaultIcons) as IconName[];

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
The primitive every catalog icon in this package renders through. ~40 built-in
glyphs, looked up by \`name\`, sized via the \`size\` variant, coloured via
\`currentColor\` (so it inherits text colour / tokens automatically).

## Overriding this component

**1. Swap one instance** — pass any SVG-shaped component via a component's
\`slots\` prop where offered, or just render your own icon instead of \`<Icon>\`.

**2. Swap the whole set** — call \`configureIcons()\` once, e.g. at the top of
\`app/layout.tsx\`. Every built-in usage of \`<Icon name="...">\` inside this
package (Dialog's close button, Select's chevron, ProductCard's wishlist
heart, ...) picks up the replacement:

\`\`\`ts
import { configureIcons } from "@storefront/ui";
import { ShoppingCart, Heart, Search } from "lucide-react";

configureIcons({ cart: ShoppingCart, heart: Heart, search: Search });
\`\`\`

Any component whose props satisfy \`React.SVGProps<SVGSVGElement>\` works here —
lucide-react, Heroicons, or your own SVGs.
        `,
      },
    },
  },
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    label: { control: "text" },
  },
  args: {
    name: "cart",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

export const Catalog: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 text-foreground sm:grid-cols-8">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-1.5 rounded-md p-2 text-center">
          <Icon name={name} size="lg" />
          <span className="font-mono text-[10px] text-foreground-muted">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4 text-foreground">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};
