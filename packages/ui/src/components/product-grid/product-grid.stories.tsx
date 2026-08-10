import type { Meta, StoryObj } from "@storybook/react";
import { ProductGrid } from "./product-grid";
import { Button } from "../button/button";
import type { ProductSummary } from "../../types/product";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5e5e5'/%3E%3C/svg%3E";

const items: ProductSummary[] = Array.from({ length: 8 }, (_, index) => ({
  id: `sku-${index}`,
  name: `Product ${index + 1}`,
  price: 19.99 + index,
  image: { src: PLACEHOLDER_IMAGE, alt: `Product ${index + 1}` },
  rating: index % 2 === 0 ? { value: 4.5, count: 120 } : undefined,
}));

const meta: Meta<typeof ProductGrid> = {
  title: "Components/ProductGrid",
  component: ProductGrid,
  parameters: {
    docs: {
      description: {
        component: `
A responsive \`Grid\` of \`ProductCard\`s, driven entirely by \`items: ProductSummary[]\` — the
PLP/category/search-results grid. Handles its own loading (\`ProductCardSkeleton\` placeholders)
and empty (\`EmptyState\`) states so a consumer never has to branch on those themselves.

## Overriding this component

**1. Tokens / 2. \`Grid\`'s own variants** — column counts (\`cols\`, \`colsSm\`, \`colsMd\`,
\`colsLg\`, \`colsXl\`) and \`gap\` pass straight through to the underlying \`Grid\`.

**3. \`classNames\`** — \`root\`, \`grid\`, \`item\`, \`empty\`.

**4. \`slots\`** — \`Item\` replaces the per-product renderer (defaults to \`ProductCard\`); e.g.
swap in \`ProductListItem\` to render the same \`items\` as rows instead of cards (see
\`ViewToggle\`).
        `,
      },
    },
  },
  args: {
    items,
    cols: 2,
    colsMd: 3,
    colsLg: 4,
  },
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const Playground: Story = {};

export const Loading: Story = {
  args: { loading: true, loadingCount: 8 },
};

export const Empty: Story = {
  args: { items: [] },
};

export const EmptyWithAction: Story = {
  args: { items: [], emptyAction: <Button onClick={() => {}}>Clear filters</Button> },
};
