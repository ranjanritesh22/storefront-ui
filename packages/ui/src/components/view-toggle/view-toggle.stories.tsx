import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ViewToggle, type ViewMode } from "./view-toggle";

const meta: Meta<typeof ViewToggle> = {
  title: "Components/ViewToggle",
  component: ViewToggle,
  // No "autodocs" tag: view-toggle.mdx attaches a custom docs page via
  // <Meta of={ViewToggleStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A two-state segmented control for switching a PLP between grid and list view
— a hand-rolled \`role="radiogroup"\` of \`role="radio"\` buttons with roving
tabindex. A Client Component (owns the roving-tabindex focus state).

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-primary\`.

**2. \`viewToggleVariants\` / \`viewToggleButtonVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`button\`, \`icon\`).
        `,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    disabled: false,
    defaultValue: "grid",
  },
};

export default meta;
type Story = StoryObj<typeof ViewToggle>;

export const Playground: Story = {};

export const Controlled: Story = {
  render: (args) => {
    function ControlledViewToggle() {
      const [view, setView] = React.useState<ViewMode>("grid");
      return (
        <div className="flex flex-col items-start gap-2">
          <ViewToggle {...args} value={view} onValueChange={setView} />
          <p className="font-mono text-xs text-foreground-muted">view: {view}</p>
        </div>
      );
    }
    return <ControlledViewToggle />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const OverrideTokens: Story = {
  name: "1. Tokens — rebrand every view toggle at once",
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-foreground-muted">default</span>
        <ViewToggle {...args} />
      </div>
      <div data-theme="dark" className="flex flex-col items-start gap-2 rounded-md bg-surface p-3">
        <span className="font-mono text-xs text-foreground-muted">data-theme=&quot;dark&quot;</span>
        <ViewToggle {...args} />
      </div>
    </div>
  ),
};
