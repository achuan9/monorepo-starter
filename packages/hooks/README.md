# @monorepo-starter/hooks

monorepo-starter Vue3 Composables 和 Hooks 库

## 安装

```bash
pnpm add @monorepo-starter/hooks
```

## 使用

### 按需引入（自动 Tree Shaking）

本库已优化支持 **Tree Shaking**，你可以按需引入需要的 hooks，未使用的代码会被自动移除，实现极致的体积优化。

```ts
// ✅ 推荐：按需引入，只打包使用的代码
// 当你只引入 useToggle 时，useCounter 和 useLocalStorage 的代码会被自动移除
import { useToggle } from "@monorepo-starter/hooks"

// 也可以同时引入多个 hooks
import { useToggle, useCounter } from "@monorepo-starter/hooks"
```

### useToggle

切换布尔值的 composable

```ts
import { useToggle } from "@monorepo-starter/hooks"

const { value, toggle, setTrue, setFalse } = useToggle(false)

// 切换值
toggle()

// 设置为 true
setTrue()

// 设置为 false
setFalse()
```

### useCounter

计数器的 composable

```ts
import { useCounter } from "@monorepo-starter/hooks"

const { count, inc, dec, set, reset } = useCounter(0, { min: 0, max: 10 })

// 增加
inc(1)

// 减少
dec(1)

// 设置值
set(5)

// 重置
reset()
```

### useLocalStorage

本地存储的 composable

```ts
import { useLocalStorage } from "@monorepo-starter/hooks"

const { value } = useLocalStorage("my-key", "default-value")

// value 会自动同步到 localStorage
value.value = "new-value"
```

## 开发

```bash
# 开发模式（监听文件变化）
pnpm dev

# 构建
pnpm build

# 测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm check-types
```

## License

MIT
