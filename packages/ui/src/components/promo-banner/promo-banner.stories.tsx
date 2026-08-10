import type { Meta, StoryObj } from "@storybook/react";
import { PromoBanner } from "./promo-banner";
import { Button } from "../button/button";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='400'%3E%3Crect width='1200' height='400' fill='%23404040'/%3E%3C/svg%3E";

const meta: Meta<typeof PromoBanner> = {
  title: "Components/PromoBanner",
  component: PromoBanner,
  // No "autodocs" tag: promo-banner.mdx attaches a custom docs page via <Meta of={PromoBannerStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A marketing banner: heading, description, CTA, and an optional background
image — all through \`<Image>\`, never a raw \`<img>\`. \`tone="inverted"\` flips
the palette (foreground bg / surface text), the same documented pattern as
\`Tooltip\`'s inverted surface.

## Overriding this component

**1. Tokens** — everything the banner reads (\`--ui-color-surface-raised\`,
\`--ui-color-foreground\`, \`--ui-color-overlay\`, ...).

**2. \`promoBannerVariants\`** — the \`tone\` axis.

**3. \`classNames\`** — slot map: \`root\`, \`image\`, \`overlay\`, \`content\`,
\`heading\`, \`description\`, \`cta\`.

**4. \`slots\`** — replace the \`Image\` or \`Cta\` render while keeping the rest.
        `,
      },
    },
  },
  argTypes: {
    tone: { control: "select", options: ["default", "inverted"] },
  },
  args: {
    heading: "Summer sale — up to 40% off",
    description: "Shop new markdowns across shoes, apparel, and accessories while supplies last.",
    ctaLabel: "Shop the sale",
    tone: "default",
  },
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const Playground: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl">
      <PromoBanner {...args} />
    </div>
  ),
};

export const WithBackgroundImage: Story = {
  args: { imageSrc: PLACEHOLDER_IMAGE, imageAlt: "", tone: "inverted" },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <PromoBanner {...args} />
    </div>
  ),
};

export const AsLink: Story = {
  args: { href: "/sale" },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <PromoBanner {...args} />
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same PromoBanner, three override layers.
 * Referenced by promo-banner.mdx via <Canvas of={PromoBannerStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every banner at once",
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      <div className="flex w-full max-w-2xl flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <PromoBanner {...args} />
      </div>
      <div data-brand="acme" className="flex w-full max-w-2xl flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <PromoBanner {...args} />
      </div>
      <div data-theme="dark" className="flex w-full max-w-2xl flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <PromoBanner {...args} />
      </div>
    </div>
  ),
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      <div className="w-full max-w-2xl">
        <PromoBanner {...args} />
      </div>
      <div className="w-full max-w-2xl">
        <PromoBanner
          {...args}
          classNames={{ root: "rounded-none", heading: "uppercase tracking-wide" }}
        />
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. slots — replace the Cta render",
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      <div className="w-full max-w-2xl">
        <PromoBanner {...args} />
      </div>
      <div className="w-full max-w-2xl">
        <PromoBanner
          {...args}
          slots={{ Cta: (props) => <Button {...props} variant="danger" size="lg" /> }}
        />
      </div>
    </div>
  ),
};
