import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LanguageCurrencySelector } from "./language-currency-selector";

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

const currencies = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
];

const meta: Meta<typeof LanguageCurrencySelector> = {
  title: "Navigation/LanguageCurrencySelector",
  component: LanguageCurrencySelector,
  parameters: {
    docs: {
      description: {
        component: `
A single header trigger that opens a panel for picking both language and
currency — composes the already-accessible \`Select\` (twice) inside a
\`Popover\` rather than reinventing listbox behaviour.

## Overriding this component

**1. Tokens** — \`--ui-color-border\`.

**2. \`languageCurrencySelectorTriggerVariants\` / \`...ContentVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`trigger\`, \`content\`, \`field\`).

**4. i18n** — the default trigger \`aria-label\` and the \`Language\`/\`Currency\`
field labels come from \`getMessages().languageCurrencySelector\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LanguageCurrencySelector>;

export const Playground: Story = {
  render: () => {
    function Demo() {
      const [language, setLanguage] = useState("en");
      const [currency, setCurrency] = useState("usd");
      return (
        <LanguageCurrencySelector
          languages={languages}
          currencies={currencies}
          language={language}
          currency={currency}
          onLanguageChange={setLanguage}
          onCurrencyChange={setCurrency}
        />
      );
    }
    return <Demo />;
  },
};
