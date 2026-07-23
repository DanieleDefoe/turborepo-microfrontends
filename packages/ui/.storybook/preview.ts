import type { Preview } from "@storybook/vue3-vite";
import { withTheme } from "./decorators/withTheme";
import "../src/assets/index.css";
import "@fontsource-variable/inter";
import "vue-sonner/style.css";

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    a11y: {
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
