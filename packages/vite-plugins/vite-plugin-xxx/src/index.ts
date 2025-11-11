import type { Plugin } from "vite"

export interface VitePluginXxxOptions {
  /** A prefix to add to console logs */
  prefix?: string
  /** Whether to enable the plugin */
  enabled?: boolean
}

/**
 * A simple example Vite plugin that adds a prefix to console logs
 *
 * @param options - Plugin options
 * @returns Vite plugin
 *
 * @example
 * ```ts
 * import { vitePluginXxx } from '@monorepo-starter/vite-plugin-xxx'
 *
 * export default defineConfig({
 *   plugins: [
 *     vitePluginXxx({ prefix: '[MyApp]' })
 *   ]
 * })
 * ```
 */
export function vitePluginXxx(options: VitePluginXxxOptions = {}): Plugin {
  const { prefix = "[Vite]", enabled = true } = options

  if (!enabled) {
    return {
      name: "vite-plugin-xxx",
      enforce: "pre"
    }
  }

  return {
    name: "vite-plugin-xxx",
    enforce: "pre",
    buildStart() {
      console.log(`${prefix} Plugin started`)
    },
    transform(code, id) {
      // Example: Add a comment to the top of each file
      if (id.endsWith(".ts") || id.endsWith(".js")) {
        return {
          code: `// Processed by vite-plugin-xxx\n${code}`,
          map: null
        }
      }
      return null
    },
    buildEnd() {
      console.log(`${prefix} Plugin finished`)
    }
  }
}

export default vitePluginXxx
