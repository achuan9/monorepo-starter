import globals from "globals"
import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginVue from "eslint-plugin-vue"
import tseslint from "typescript-eslint"

/**
 * A custom ESLint configuration for libraries that use Vue.
 *
 * 请确保将eslint-config-prettier添加到配置数组中的最后，这样它将覆盖其他对象
 *
 * @type {import("eslint").Linter.Config[]} */
export default [
  {
    // 这句是为了保证在vue里边校验规则ts文件一致。
    // 因为typescript-eslint这个库tseslint.configs.recommended继承了tseslint.configs.eslintRecommended(修改一些eslint的规则)
    // 但是tseslint.configs.eslintRecommended定义了files:["**/*.ts","**/*.tsx","**/*.mts","**/*.cts"],
    // 所以校验Vue文件,tseslint.configs.eslintRecommended中的规则会被忽略，所以需要手动添加上。
    ...tseslint.configs.eslintRecommended,
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      },
      parserOptions: {
        // @link https://github.com/vuejs/vue-eslint-parser#readme
        parser: {
          // Script parser for `<script>`
          js: "espree",

          // Script parser for `<script lang="ts">`
          ts: "@typescript-eslint/parser",

          // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
          // and vue interpolations (e.g. `{{variable}}`).
          // If not specified, the parser determined by `<script lang ="...">` is used.
          "<template>": "espree"
        },
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/strongly-recommended"],
  eslintConfigPrettier
]
