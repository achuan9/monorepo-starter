import type { Meta, StoryObj } from '@storybook/vue3-vite';

// import VvButton from './button.vue';
import { VvInput } from '@monorepo-starter/ui';

const meta = {
  component: VvInput,
} satisfies Meta<typeof VvInput>;

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary = {
  render: (args: Story['args']) => ({
    components: { VvInput },
    setup() {
      return { args };
    },
    template: '<VvInput v-bind="args" />',
  }),
  args: {
    size: 'medium',
    disabled: false,
    placeholder: "Input",
  },
} satisfies Story;