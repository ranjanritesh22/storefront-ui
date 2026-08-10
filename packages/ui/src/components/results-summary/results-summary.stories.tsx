import type { Meta, StoryObj } from "@storybook/react";
import { ResultsSummary } from "./results-summary";

const meta: Meta<typeof ResultsSummary> = {
  title: "Components/ResultsSummary",
  component: ResultsSummary,
  // No "autodocs" tag: results-summary.mdx attaches a custom docs page via
  // <Meta of={ResultsSummaryStories} />.
  parameters: {
    docs: {
      description: {
        component: `
Presentational "Showing 1–12 of 240" text for a PLP toolbar. Pure data-in/
text-out, no internal state — a Server Component.

## Overriding this component

**1. Tokens** — \`--ui-color-foreground-muted\`.

**2. \`resultsSummaryVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`text\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    start: { control: "number" },
    end: { control: "number" },
    total: { control: "number" },
  },
  args: {
    size: "md",
    start: 1,
    end: 12,
    total: 240,
  },
};

export default meta;
type Story = StoryObj<typeof ResultsSummary>;

export const Playground: Story = {};

export const NoResults: Story = {
  args: { start: 0, end: 0, total: 0 },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every results summary at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <ResultsSummary {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <ResultsSummary {...args} />
      </div>
    </div>
  ),
};
