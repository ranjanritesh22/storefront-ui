import type { Meta, StoryObj } from "@storybook/react";
import { ErrorState } from "./error-state";

const meta: Meta<typeof ErrorState> = {
  title: "Components/ErrorState",
  component: ErrorState,
  // No "autodocs" tag: error-state.mdx attaches a custom docs page via <Meta of={ErrorStateStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A failed-to-load placeholder — a rejected fetch, a broken widget. Unlike \`EmptyState\`, an error
always means the same thing, so \`ErrorState\` owns default copy and icon (all overridable via
props / \`getMessages().errorState\`) instead of requiring every call site to supply them.

## Overriding this component

**1. Tokens** — \`--ui-color-danger\`.

**2. \`errorStateVariants\` / \`errorStateIconVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map for \`icon\`, \`title\`, \`description\`, \`retry\`.

**4. \`configureMessages({ errorState: {...} })\`** — reword the default title/description/retry
text for every \`ErrorState\` that doesn't pass its own.
        `,
      },
    },
  },
  args: {
    onRetry: () => console.log("retry clicked"),
  },
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Playground: Story = {};

export const CustomCopy: Story = {
  args: {
    title: "Couldn't load your recommendations",
    description: "This section will retry automatically, or you can try now.",
  },
};

export const NoRetry: Story = {
  args: { onRetry: undefined },
};

export const OverrideClassNames: Story = {
  name: "3. classNames — reach a specific part",
  args: {
    classNames: { title: "text-primary", description: "italic" },
  },
};
