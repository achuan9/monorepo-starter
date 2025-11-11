import path from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import packageJson from "./package.json" with { type: "json" }
import { REPO_CONFIG } from "../../meta/repo-config"

const packageName = packageJson.name.replace(`${REPO_CONFIG.namespace}/`, "")

export default defineConfig({
  build: {
    outDir: "./lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: packageName,
      // formats: formats as LibraryFormats[],
      fileName: format => `index.${format}.js`,
      cssFileName: "index"
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      rollupTypes: true
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
