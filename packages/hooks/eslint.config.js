import { defineConfig } from "eslint/config"
import eslintConfig from "@monorepo-starter/eslint-config/vue"

export default defineConfig([
  eslintConfig,
  {
    ignores: ["dist"]
  }
])
