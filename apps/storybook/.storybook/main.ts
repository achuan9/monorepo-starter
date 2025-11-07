import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    {
      directory: '../src',
      files: '*.@(mdx|stories.@(mdx|js|jsx|mjs|ts|tsx))',
      titlePrefix: 'Guide',
    },
    {
      directory: '../src/ui/components',
      files: '**/*.@(mdx|stories.@(mdx|js|jsx|mjs|ts|tsx))',
      titlePrefix: 'Components',
    },
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {
      docgen: 'vue-component-meta',
    }
  }
};
export default config;