import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
