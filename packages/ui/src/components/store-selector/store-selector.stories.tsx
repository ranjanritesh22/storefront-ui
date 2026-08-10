import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StoreSelector } from "./store-selector";

const stores = [
  { id: "downtown", name: "Downtown", address: "123 Main St, Springfield", distance: "0.5 mi" },
  { id: "uptown", name: "Uptown", address: "456 Oak Ave, Springfield", distance: "3.1 mi" },
  { id: "westside", name: "Westside Mall", address: "789 West Blvd, Springfield", distance: "5.8 mi" },
];

const meta: Meta<typeof StoreSelector> = {
  title: "Navigation/StoreSelector",
  component: StoreSelector,
  parameters: {
    docs: {
      description: {
        component: `
Pick-a-nearby-store control for "buy online, pick up in store" flows.
Composes \`RadioGroup\`/\`Radio\` (roving-tabindex, arrow-key selection) inside
a \`Popover\` rather than hand-rolling single-choice list semantics again.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`, \`--ui-color-primary\`.

**2. \`storeSelectorTriggerVariants\` / \`storeSelectorContentVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`trigger\`, \`content\`, \`group\`).

**4. i18n** — the default trigger \`aria-label\` comes from
\`getMessages().storeSelector.trigger\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StoreSelector>;

export const Playground: Story = {
  render: () => {
    function Demo() {
      const [selectedStoreId, setSelectedStoreId] = useState("downtown");
      return (
        <StoreSelector
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectedStoreIdChange={setSelectedStoreId}
        />
      );
    }
    return <Demo />;
  },
};
