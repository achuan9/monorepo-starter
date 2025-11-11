import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { vitePluginXxx } from "../index"

describe("vitePluginXxx", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should create a plugin with default options", () => {
    const plugin = vitePluginXxx()
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe("vite-plugin-xxx")
    expect(plugin.enforce).toBe("pre")
  })

  it("should create a plugin with custom prefix", () => {
    const plugin = vitePluginXxx({ prefix: "[Custom]" })
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe("vite-plugin-xxx")
  })

  it("should return a no-op plugin when disabled", () => {
    const plugin = vitePluginXxx({ enabled: false })
    expect(plugin).toBeDefined()
    expect(plugin.name).toBe("vite-plugin-xxx")
    expect(plugin.buildStart).toBeUndefined()
    expect(plugin.transform).toBeUndefined()
  })

  it("should call buildStart hook", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const plugin = vitePluginXxx({ prefix: "[Test]" })

    if (plugin.buildStart && typeof plugin.buildStart === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugin.buildStart.call({} as any, {} as any)
    } else if (plugin.buildStart && "handler" in plugin.buildStart) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugin.buildStart.handler.call({} as any, {} as any)
    }

    expect(consoleSpy).toHaveBeenCalledWith("[Test] Plugin started")
    consoleSpy.mockRestore()
  })

  it("should transform TypeScript files", () => {
    const plugin = vitePluginXxx()
    const code = "const x = 1;"

    if (plugin.transform) {
      const transformFn =
        typeof plugin.transform === "function"
          ? plugin.transform
          : plugin.transform.handler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = transformFn.call({} as any, code, "/path/to/file.ts", {})
      expect(result).toBeDefined()
      if (result && typeof result === "object" && "code" in result) {
        expect(result.code).toContain("// Processed by vite-plugin-xxx")
        expect(result.code).toContain(code)
      }
    }
  })

  it("should transform JavaScript files", () => {
    const plugin = vitePluginXxx()
    const code = "const x = 1;"

    if (plugin.transform) {
      const transformFn =
        typeof plugin.transform === "function"
          ? plugin.transform
          : plugin.transform.handler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = transformFn.call({} as any, code, "/path/to/file.js", {})
      expect(result).toBeDefined()
      if (result && typeof result === "object" && "code" in result) {
        expect(result.code).toContain("// Processed by vite-plugin-xxx")
      }
    }
  })

  it("should not transform non-JS/TS files", () => {
    const plugin = vitePluginXxx()
    const code = ".css { color: red; }"

    if (plugin.transform) {
      const transformFn =
        typeof plugin.transform === "function"
          ? plugin.transform
          : plugin.transform.handler
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = transformFn.call({} as any, code, "/path/to/file.css", {})
      expect(result).toBeNull()
    }
  })

  it("should call buildEnd hook", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const plugin = vitePluginXxx({ prefix: "[Test]" })

    if (plugin.buildEnd) {
      if (typeof plugin.buildEnd === "function") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugin.buildEnd.call({} as any, {} as any)
      } else if ("handler" in plugin.buildEnd) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        plugin.buildEnd.handler.call({} as any, {} as any)
      }
    }

    expect(consoleSpy).toHaveBeenCalledWith("[Test] Plugin finished")
    consoleSpy.mockRestore()
  })
})
