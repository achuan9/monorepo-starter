# @monorepo-starter/vite-plugin-xxx

A simple example Vite plugin for the monorepo starter template.

## Installation

```bash
pnpm add -D @monorepo-starter/vite-plugin-xxx
```

## Usage

```ts
import { defineConfig } from "vite"
import { vitePluginXxx } from "@monorepo-starter/vite-plugin-xxx"

export default defineConfig({
  plugins: [
    vitePluginXxx({
      prefix: "[MyApp]",
      enabled: true
    })
  ]
})
```

## Options

- `prefix` (string, default: `'[Vite]'`): A prefix to add to console logs
- `enabled` (boolean, default: `true`): Whether to enable the plugin

## Example

This plugin demonstrates:

- Basic Vite plugin structure
- Plugin hooks (buildStart, transform, buildEnd)
- Options handling
- TypeScript support

## Testing

```bash
pnpm test
```
