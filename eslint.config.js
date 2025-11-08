import { defineConfig } from "eslint/config"
import eslintConfig from "@monorepo-starter/eslint-config/base"

export default defineConfig([
  eslintConfig,
  {
    ignores: ["**/lib"]
  }
])
