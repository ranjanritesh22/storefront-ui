import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `
Wraps \`@radix-ui/react-tabs\` — roving-tabindex keyboard navigation (arrow
keys move focus and selection), correct \`role="tablist"/"tab"/"tabpanel"\`
wiring, and \`data-state="active"\` for styling. A PDP's Details / Reviews /
Shipping panel is the canonical use.

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`.

**2. \`tabsListVariants\` / \`tabsTriggerVariants\` / \`tabsContentVariants\`** — exported publicly.

**3. \`className\`** — merged last, on \`TabsList\` / \`TabsTrigger\` / \`TabsContent\` individually.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: () => (
    <Tabs defaultValue="details" className="w-96">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews (128)</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="text-sm text-foreground">
        Full-grain leather upper, cushioned midsole, recycled rubber outsole.
      </TabsContent>
      <TabsContent value="reviews" className="text-sm text-foreground">
        4.6 out of 5 stars, based on 128 reviews.
      </TabsContent>
      <TabsContent value="shipping" className="text-sm text-foreground">
        Free delivery on orders over $75. Ships in 1–2 business days.
      </TabsContent>
    </Tabs>
  ),
};
