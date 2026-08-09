import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Button } from "../button/button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  // No "autodocs" tag: card.mdx attaches a custom docs page via <Meta of={CardStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A Server Component container with \`CardHeader\`, \`CardTitle\`, \`CardDescription\`,
\`CardContent\`, and \`CardFooter\` parts. No \`"use client"\` anywhere in this file —
Card renders fine deep in a Server Component tree.

## Overriding this component

**1. Tokens** — override \`--ui-color-surface\`, \`--ui-color-border\`, \`--ui-shadow-md\`.

**2. \`cardVariants\`** — exported publicly for styling a non-\`Card\` element.

**3. \`className\`** — merged last via \`cn()\` on every part.

**4. \`asChild\`** — every part supports swapping its rendered element.
        `,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["default", "outlined", "elevated"] },
  },
  args: {
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Wireless headphones</CardTitle>
        <CardDescription>Noise-cancelling, 30h battery life.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground-muted">Available in three colours.</p>
      </CardContent>
      <CardFooter>
        <Button fullWidth>Add to cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["default", "outlined", "elevated"] as const).map((variant) => (
        <Card key={variant} variant={variant} className="w-64">
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>Card variant example.</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
};

/**
 * "Overriding this component" demo stories — same Card, three override layers.
 * Referenced by card.mdx via <Canvas of={CardStories.OverrideXxx} />.
 */
export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every card at once",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Card variant="elevated" className="w-56">
          <CardHeader>
            <CardTitle>Headphones</CardTitle>
            <CardDescription>Noise-cancelling.</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div data-brand="acme" className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">data-brand=&quot;acme&quot;</span>
        <Card variant="elevated" className="w-56">
          <CardHeader>
            <CardTitle>Headphones</CardTitle>
            <CardDescription>Noise-cancelling.</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <Card variant="elevated" className="w-56">
          <CardHeader>
            <CardTitle>Headphones</CardTitle>
            <CardDescription>Noise-cancelling.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  ),
};

export const OverrideClassName: Story = {
  name: "3. className — tweak one instance",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <Card className="w-56">
          <CardHeader>
            <CardTitle>Headphones</CardTitle>
            <CardDescription>Noise-cancelling.</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          className=&quot;rounded-none border-2 border-primary&quot;
        </span>
        <Card className="w-56 rounded-none border-2 border-primary">
          <CardHeader>
            <CardTitle>Headphones</CardTitle>
            <CardDescription>Noise-cancelling.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  ),
};

export const OverrideStructural: Story = {
  name: "4. asChild — swap the rendered element",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">{"<div>"}</span>
        <Card className="w-56">
          <CardHeader>
            <CardTitle>Headphones</CardTitle>
            <CardDescription>Noise-cancelling.</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">
          {'asChild -> <a href="/products/headphones">'}
        </span>
        <Card asChild className="block w-56 no-underline">
          <a href="#headphones">
            <CardHeader>
              <CardTitle>Headphones</CardTitle>
              <CardDescription>Noise-cancelling.</CardDescription>
            </CardHeader>
          </a>
        </Card>
      </div>
    </div>
  ),
};
