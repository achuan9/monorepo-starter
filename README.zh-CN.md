# Monorepo 启动模板

一个现代化的、生产就绪的 monorepo 模板，基于 pnpm workspaces、Turborepo 和一套完整的开发工具构建。

## 🚀 技术栈

- **包管理**: [pnpm](https://pnpm.io/) workspaces
- **构建系统**: [Turborepo](https://turbo.build/) 任务编排
- **版本管理与发布**: [Changesets](https://github.com/changesets/changesets)
- **构建工具**: [Vite](https://vitejs.dev/)
- **测试框架**: [Vitest](https://vitest.dev/)
- **代码质量工具**:
  - [ESLint](https://eslint.org/) - 代码检查
  - [Prettier](https://prettier.io/) - 代码格式化
  - [Commitlint](https://commitlint.js.org/) - 提交信息规范检查
  - [lint-staged](https://github.com/okonet/lint-staged) - 提交前钩子

## 📁 项目结构

```
monorepo-starter/
├── apps/                    # 应用程序
│   └── storybook/          # 组件文档和展示
├── packages/               # 共享包
│   ├── ui/                 # 核心 UI 组件库
│   ├── configs/            # 共享配置包
│   │   ├── eslint-config/
│   │   └── typescript-config/
│   ├── utils/              # 工具函数包
│   └── vite-plugins/       # Vite 插件包
├── scripts/                # 构建和工具脚本
│   ├── constants.ts        # 仓库配置
│   └── init-repo.ts        # 仓库初始化脚本
├── package.json            # 根 package.json
├── pnpm-workspace.yaml     # pnpm workspace 配置
├── turbo.json              # Turborepo 配置
└── tsconfig.json           # 根 TypeScript 配置
```

## 🏁 快速开始

### 前置要求

- Node.js >= 24.0.0
- pnpm >= 9.0.0

### 开始使用

1. **克隆模板仓库**

   ```bash
   git clone <your-repo-url>
   cd monorepo-starter
   ```

2. **配置仓库信息**

   编辑 `scripts/constants.ts` 并更新以下配置：

   ```typescript
   export const REPO_CONFIG: RepoConfig = {
     namespace: "@your-org", // 你的组织命名空间
     author: {
       name: "Your Name",
       email: "your-email@example.com"
     },
     homepage: "https://your-website.com",
     repository: "https://github.com/your-org/your-repo.git",
     bugs: {
       url: "https://github.com/your-org/your-repo/issues"
     },
     packageManager: "pnpm@9.0.0",
     engines: {
       node: ">=24.0.0"
     }
   }
   ```

3. **规划你的包结构**

   根据你的需求在 `packages/` 目录下组织你的包：
   - `packages/ui/` - UI 组件库
   - `packages/configs/` - 共享配置包
   - `packages/utils/` - 工具函数包
   - `packages/vite-plugins/` - 自定义 Vite 插件

   更新 `scripts/constants.ts` 中的 `PACKAGES_CONFIG` 和 `APPS_CONFIG` 以匹配你的包结构。

4. **安装依赖**

   ```bash
   pnpm install
   ```

   这将自动：
   - 确保只使用 pnpm（通过 `only-allow`）
   - 运行仓库初始化脚本以更新所有 package.json 文件

5. **开始开发**

   ```bash
   pnpm dev
   ```

## 📖 模板使用指南

### 步骤 1: 配置仓库设置

拿到模板后，首先需要修改 `scripts/constants.ts` 中的配置：

- **`REPO_CONFIG`**: 更新命名空间、作者、主页、仓库 URL 等仓库级别的设置
- **`PACKAGES_CONFIG`**: 定义你的包结构和元数据
- **`APPS_CONFIG`**: 配置你的应用程序（如 Storybook）

### 步骤 2: 规划你的包

在 `packages/` 目录下组织你的包：

- **UI 组件**: 将组件库放在 `packages/ui/`
- **配置包**: 共享配置（ESLint、TypeScript 等）放在 `packages/configs/`
- **工具包**: 可复用的工具函数放在 `packages/utils/`
- **插件包**: 自定义 Vite 插件放在 `packages/vite-plugins/`

### 步骤 3: 安装依赖

运行 `pnpm install` 来：

- 安装所有依赖
- 自动初始化仓库（根据你的配置更新所有 package.json 文件）

## 🛠️ 可用脚本

### 根级别脚本

- `pnpm install` - 安装依赖并初始化仓库
- `pnpm build` - 构建所有包和应用
- `pnpm dev` - 启动所有应用的开发服务器
- `pnpm lint` - 检查所有包的代码
- `pnpm format` - 使用 Prettier 格式化代码
- `pnpm check-types` - 类型检查所有包

### 包级别脚本

每个包可以在其 `package.json` 中定义自己的脚本。常见的脚本包括：

- `dev` - 启动开发模式
- `build` - 构建包
- `test` - 运行测试
- `lint` - 检查包的代码

## 🧪 测试

本模板使用 Vitest 进行测试。在代码旁边编写测试：

```typescript
// 示例: packages/ui/src/components/button/__tests__/button.test.ts
import { describe, it, expect } from "vitest"

describe("Button", () => {
  it("应该正确渲染", () => {
    // 你的测试代码
  })
})
```

## 📦 版本管理与发布

本模板使用 Changesets 进行版本管理和发布：

1. **创建变更集**: `pnpm changeset`
2. **版本更新**: `pnpm changeset version`
3. **发布包**: `pnpm changeset publish`

## 🔧 开发工作流

1. **创建新包**: 在 `scripts/constants.ts` 的 `PACKAGES_CONFIG` 中添加，并创建目录结构
2. **添加依赖**: 在特定包目录中使用 `pnpm add <package>`
3. **运行任务**: 使用 Turborepo 跨包运行任务: `pnpm turbo <task>`
4. **格式化代码**: 提交前运行 `pnpm format`
5. **提交更改**: 遵循约定式提交（由 Commitlint 强制执行）

## 📝 代码风格

- **ESLint**: 配置用于保持一致的代码质量
- **Prettier**: 自动代码格式化
- **Commitlint**: 强制执行约定式提交消息
- **lint-staged**: 在提交前对暂存文件运行检查器

## 🤝 贡献

1. 创建功能分支
2. 进行你的更改
3. 确保所有测试通过且代码已检查
4. 使用约定式提交格式提交
5. 创建拉取请求

## 📄 许可证

[在此添加你的许可证]

## 🔗 相关链接

- [文档](https://your-docs-url.com)
- [更新日志](./CHANGELOG.md)
- [问题反馈](https://github.com/your-org/your-repo/issues)
