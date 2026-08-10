import type { Meta, StoryObj } from "@storybook/react";
import { SkipLink } from "./skip-link";

const meta: Meta<typeof SkipLink> = {
  title: "Layout/SkipLink",
  component: SkipLink,
  parameters: {
    docs: {
      description: {
        component: `
The first focusable element on a page — invisible until keyboard focus lands
on it (press Tab in the canvas below), then jumps to \`href\`
(\`#main-content\` by default). No internal state, so it stays a Server
Component.

## Overriding this component

**1. \`skipLinkVariants\`** — exported publicly.

**2. \`className\`** — merged last.

**3. \`href\` / \`children\`** — target and label; the default label comes from
\`getMessages().skipLink.label\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Playground: Story = {
  render: () => (
    <div className="p-2">
      <p className="mb-2 text-xs text-foreground-muted">
        Press Tab to focus the skip link below.
      </p>
      <SkipLink />
      <main id="main-content" tabIndex={-1} className="mt-4 text-sm text-foreground">
        Main content landmark
      </main>
    </div>
  ),
};
