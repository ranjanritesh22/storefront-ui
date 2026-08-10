import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RatingStars } from "./rating-stars";

const meta: Meta<typeof RatingStars> = {
  title: "Components/RatingStars",
  component: RatingStars,
  // No "autodocs" tag: rating-stars.mdx attaches a custom docs page via
  // <Meta of={RatingStarsStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A star rating supporting both a read-only display and an interactive
star-picker input (e.g. a review-submission form) — distinct from the
display-only \`Rating\` component used inside \`ProductCard\`, which this
component does not modify or replace. Interactive mode is a Client
Component (owns hover-preview state).

## Overriding this component

**1. Tokens** — \`--ui-color-warning\`, \`--ui-color-border\`, \`--ui-color-ring\`.

**2. \`ratingStarsVariants\` / \`ratingStarButtonVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`star\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    max: { control: "number" },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    max: 5,
    value: 3,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof RatingStars>;

function InteractiveRatingStars(props: React.ComponentProps<typeof RatingStars>) {
  const [value, setValue] = React.useState(props.value);
  return (
    <div className="flex flex-col items-start gap-2">
      <RatingStars {...props} value={value} onValueChange={setValue} />
      <p className="font-mono text-xs text-foreground-muted">value: {value}</p>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <InteractiveRatingStars {...args} />,
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 4.5 },
};

export const Disabled: Story = {
  args: { disabled: true, value: 2 },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every rating stars at once",
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <RatingStars value={4.5} readOnly />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <RatingStars value={4.5} readOnly />
      </div>
    </div>
  ),
};
