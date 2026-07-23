import type { Preview } from '@storybook/vue3-vite'
import { withTheme } from './decorators/withTheme'
import '../src/assets/index.css'
import '@fontsource-variable/inter'
import 'vue-sonner/style.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [withTheme],
}

export default preview
