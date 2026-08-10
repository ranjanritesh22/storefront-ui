import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  // No "autodocs" tag: skeleton.mdx attaches a custom docs page via <Meta of={SkeletonStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Three shapes (\`text\` / \`circle\` / \`rect\`) sized via plain Tailwind utilities on \`className\` —
there's no package-wide default width/height to bake in, since a skeleton's size always mirrors
specific real content. \`aria-hidden\` by default (purely decorative).

## Overriding this component

**1. Tokens** — \`--ui-color-surface-raised\`.

**2. \`skeletonVariants\`** — exported publicly.

**3. Composition** — stack \`Skeleton\` primitives in the shape of the real content; see
"Building a per-component skeleton" below.
        `,
      },
    },
  },
  argTypes: {
    shape: { control: "select", options: ["text", "circle", "rect"] },
  },
  args: {
    shape: "rect",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Skeleton shape="text" className="w-40" />
      <Skeleton shape="circle" />
      <Skeleton shape="rect" className="h-24 w-40" />
    </div>
  ),
};

export const Text: Story = {
  render: () => <SkeletonText className="w-80" />,
};

/**
 * The composable pattern: stack `Skeleton` primitives in the shape of a
 * real component instead of shipping a `ProductCardSkeleton` component.
 */
export const ComposedProductCardSkeleton: Story = {
  name: "Building a per-component skeleton",
  render: () => (
    <div className="w-64 rounded-lg border border-border p-3">
      <Skeleton shape="rect" className="h-40 w-full" />
      <div className="mt-3 flex flex-col gap-2">
        <Skeleton shape="text" className="w-3/4" />
        <Skeleton shape="text" className="w-1/2" />
        <div className="mt-1 flex items-center gap-2">
          <Skeleton shape="circle" className="size-6" />
          <Skeleton shape="text" className="h-3 w-16" />
        </div>
      </div>
    </div>
  ),
};
