import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  parameters: {
    docs: {
      description: {
        component: `
The image primitive every picture in this package renders through
(\`ProductCard\`'s media, gallery thumbnails, banners). Defaults to a plain
\`<img>\`; a consumer on Next.js swaps in \`next/image\` **once**, globally, and
every image in the library gets that runtime's optimization — without this
package depending on Next.js or pinning a Next version.

## Overriding this component

\`\`\`ts
// app/images.ts — imported once for its side effect, e.g. app/layout.tsx
import { configureImageComponent } from "@storefront/ui";
import NextImage from "next/image";

configureImageComponent(NextImage);
\`\`\`

Any component satisfying \`{ src, alt, width?, height?, fill?, sizes?, loading?, priority?,
className? }\` works — that's \`next/image\`'s shape, minus what's Next-specific, so no
adapter is needed for the common case.
        `,
      },
    },
  },
  argTypes: {
    objectFit: { control: "select", options: ["cover", "contain"] },
  },
  args: {
    src: "https://placehold.co/400x400",
    alt: "Placeholder product photo",
    width: 200,
    height: 200,
    objectFit: "cover",
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Playground: Story = {};

export const Fill: Story = {
  render: (args) => (
    <div className="relative h-48 w-48 overflow-hidden rounded-md bg-surface-raised">
      <Image {...args} fill sizes="192px" />
    </div>
  ),
};
