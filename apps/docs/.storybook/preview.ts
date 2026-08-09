import type { Preview } from "@storybook/react";
import "@storefront/tokens/tokens.css";
import "@storefront/ui/styles.css";
// Loaded (not applied globally) so per-component "Overriding this component" docs pages can
// demo a token override by scoping [data-brand="acme"] / [data-theme="dark"] to a wrapper div.
import "@storefront/tokens/themes/dark.css";
import "@storefront/tokens/themes/acme.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
