import type { Meta, StoryObj } from "@storybook/react";
import { CategoryCard } from "./category-card";
import { Button } from "../button/button";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e5e5'/%3E%3C/svg%3E";

const meta: Meta<typeof CategoryCard> = {
  title: "Components/CategoryCard",
  component: CategoryCard,
  // No "autodocs" tag: category-card.mdx attaches a custom docs page via <Meta of={CategoryCardStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Follows \`ProductCard\`'s recipe for a landing/PLP category tile: composes our
own \`Card\`, \`Image\` and \`Button\` by default, swappable via \`slots\`, reachable
via \`classNames\`. Props are domain-agnostic (\`title\`, \`imageSrc\`, \`href\`,
\`productCount\`) — no commerce API types.

## Overriding this component

**1. Tokens** — everything \`Card\`/\`Button\` already read.

**2. \`categoryCardVariants\`** — controls the image aspect ratio.

**3. \`classNames\`** — slot map: \`root\`, \`image\`, \`body\`, \`title\`, \`count\`, \`cta\`.

**4. \`slots\`** — replace any part while keeping the rest.
        `,
      },
    },
  },
  argTypes: {
    aspect: { control: "select", options: ["square", "portrait", "landscape"] },
  },
  args: {
    title: "Running Shoes",
    imageSrc: PLACEHOLDER_IMAGE,
    imageAlt: "Running shoes category",
    productCount: 128,
    aspect: "landscape",
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-72">
      <CategoryCard {...args} />
    </div>
  ),
};

export const AsLinkCard: Story = {
  args: { href: "/categories/running-shoes" },
  render: (args) => (
    <div className="w-72">
      <CategoryCard {...args} />
    </div>
  ),
};

export const WithoutProductCount: Story = {
  args: { productCount: undefined },
  render: (args) => (
    <div className="w-72">
      <CategoryCard {...args} />
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same CategoryCard, three override layers.
 * Referenced by category-card.mdx via <Canvas of={CategoryCardStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every card at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <div className="w-56">
          <CategoryCard {...args} />
        </div>
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <div className="w-56">
          <CategoryCard {...args} />
        </div>
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <div className="w-56">
          <CategoryCard {...args} />
        </div>
      </div>
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <div className="w-56">
          <CategoryCard {...args} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'classNames={{ title: "text-lg", cta: "rounded-full" }}'}
        </span>
        <div className="w-56">
          <CategoryCard {...args} classNames={{ title: "text-lg", cta: "rounded-full" }} />
        </div>
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace one part, keep the rest",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default CTA</span>
        <div className="w-56">
          <CategoryCard {...args} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'slots={{ Cta: (props) => <Button {...props} variant="primary" /> }}'}
        </span>
        <div className="w-56">
          <CategoryCard
            {...args}
            slots={{ Cta: (props) => <Button {...props} variant="primary" /> }}
          />
        </div>
      </div>
    </div>
  ),
};
