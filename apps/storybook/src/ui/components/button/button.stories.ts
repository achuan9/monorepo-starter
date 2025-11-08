import type { Meta, StoryObj } from "@storybook/vue3-vite"

// import VvButton from './button.vue';
import { VvButton } from "@monorepo-starter/ui"

const meta = {
  component: VvButton
} satisfies Meta<typeof VvButton>

//👇 This default export determines where your story goes in the story list
export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary = {
  render: (args: Story["args"]) => ({
    components: { VvButton },
    setup() {
      return { args }
    },
    template: '<VvButton v-bind="args" >Button</VvButton>'
  }),
  args: {
    type: "primary",
    size: "medium",
    disabled: false
  }
} satisfies Story
