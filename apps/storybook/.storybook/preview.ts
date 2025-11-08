import type { Preview } from "@storybook/vue3-vite"
import "@monorepo-starter/ui/styles"
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
