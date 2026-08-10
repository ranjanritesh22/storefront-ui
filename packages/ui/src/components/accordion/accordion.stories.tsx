import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Navigation/Accordion",
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `
Wraps \`@radix-ui/react-accordion\` — correct disclosure semantics
(\`aria-expanded\`, \`aria-controls\`, a heading-wrapped trigger), keyboard
support, and an animated open/close height driven by
\`--radix-accordion-content-height\` (respects \`prefers-reduced-motion\` via
\`motion-safe:\`). PDP "Details / Shipping / Returns" and PLP filter groups are
the canonical uses.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-primary\`.

**2. \`accordionItemVariants\` / \`accordionTriggerVariants\` / \`accordionContentVariants\`** — exported publicly.

**3. \`className\`** — merged last, on each part individually.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping &amp; delivery</AccordionTrigger>
        <AccordionContent>Free delivery on orders over $75. Ships in 1–2 business days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>30-day returns on unworn items with original packaging.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="materials">
        <AccordionTrigger>Materials</AccordionTrigger>
        <AccordionContent>Full-grain leather upper, recycled rubber outsole.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: "type=\"multiple\" — several panels open at once",
  render: () => (
    <Accordion type="multiple" className="w-96" defaultValue={["size", "color"]}>
      <AccordionItem value="size">
        <AccordionTrigger>Size</AccordionTrigger>
        <AccordionContent>US 7, 8, 9, 10, 11</AccordionContent>
      </AccordionItem>
      <AccordionItem value="color">
        <AccordionTrigger>Color</AccordionTrigger>
        <AccordionContent>Black, White, Sand</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
