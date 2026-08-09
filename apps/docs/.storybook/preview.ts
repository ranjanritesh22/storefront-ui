import type { Preview } from "@storybook/react";
import "@storefront/tokens/styles.css";
import "@storefront/ui/styles.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
