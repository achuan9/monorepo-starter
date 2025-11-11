import path from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
export default defineConfig({
  build: {
    outDir: "./dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"]
    },
    sourcemap: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        // 保持 ES 模块格式，确保 tree shaking 正常工作
        format: "es",
        // 保留模块结构，让打包工具能够精确地进行 tree shaking
        preserveModules: true,
        preserveModulesRoot: "src",
        // 确保代码可以被 tree shake
        exports: "named",
        // 主入口文件使用固定名称，其他文件保持原文件名
        entryFileNames: chunkInfo => {
          // 主入口文件命名为 index.es.js
          if (chunkInfo.isEntry && chunkInfo.name === "index") {
            return "index.es.js"
          }
          // 其他模块保持相对路径结构
          return "[name].js"
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      entryRoot: "src",
      outDir: "dist",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/__tests__/**"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
