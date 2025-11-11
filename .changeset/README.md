# Changesets 最佳实践指南

## 📋 目录

1. [核心工作流程](#核心工作流程)
2. [配合工具](#配合工具)
3. [CI/CD 集成](#cicd-集成)
4. [团队协作规范](#团队协作规范)
5. [常见问题](#常见问题)

## 🔄 核心工作流程

### 标准开发流程

1. **开发功能/修复 Bug**

   ```bash
   # 创建功能分支
   git checkout -b feat/add-button-component

   # 开发代码...
   ```

2. **创建 Changeset**

   ```bash
   # 在完成功能后，运行 changeset 命令
   pnpm changeset

   # 交互式选择：
   # - 选择要更新的包
   # - 选择版本类型（major/minor/patch）
   # - 编写变更描述
   ```

3. **提交代码**

   ```bash
   git add .
   git commit -m "feat(ui): add button component"
   git push
   ```

4. **创建 PR**
   - Changeset 文件会随 PR 一起提交
   - 团队成员审查代码和 changeset

5. **合并 PR**
   - 合并到 main 分支后，changeset 文件会被保留

6. **发布流程（通常在 CI 中自动执行）**

   ```bash
   # 1. 更新版本号和生成 CHANGELOG
   pnpm changeset:version

   # 2. 构建包
   pnpm build

   # 3. 发布到 npm
   pnpm changeset:publish
   ```

## 🛠️ 配合工具

### 1. Commitlint - 提交信息规范

**作用**：确保提交信息遵循 Conventional Commits 规范，便于自动生成 CHANGELOG。

**安装**：

```bash
pnpm add -D -w @commitlint/cli @commitlint/config-conventional
```

**配置**：创建 `commitlint.config.js`

```js
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档变更
        "style", // 代码格式（不影响代码运行）
        "refactor", // 重构
        "perf", // 性能优化
        "test", // 测试相关
        "chore", // 构建/工具变动
        "revert" // 回滚
      ]
    ]
  }
}
```

### 2. Husky - Git Hooks 管理

**作用**：在提交前自动运行 lint 和 commitlint 检查。

**安装**：

```bash
pnpm add -D -w husky
pnpm exec husky init
```

**配置**：`.husky/commit-msg`

```bash
#!/usr/bin/env sh
pnpm exec commitlint --edit $1
```

**配置**：`.husky/pre-commit`

```bash
#!/usr/bin/env sh
pnpm exec lint-staged
```

### 3. lint-staged - 暂存文件检查

**作用**：只对暂存的文件运行 lint 和格式化，提高效率。

**安装**：

```bash
pnpm add -D -w lint-staged
```

**配置**：在 `package.json` 中添加

```json
{
  "lint-staged": {
    "*.{js,ts,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### 4. Changeset Bot (GitHub App)

**作用**：自动检查 PR 中是否包含 changeset，如果没有会提醒。

**安装**：在 GitHub 上安装 [Changesets Bot](https://github.com/apps/changeset-bot)

**配置**：在 `.github/changeset-bot.yml` 中配置（可选）

## 🚀 CI/CD 集成

### GitHub Actions 工作流

创建 `.github/workflows/release.yml`：

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: "pnpm"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9.0.0

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm changeset:publish
          version: pnpm changeset:version
          commit: "chore: version packages"
          title: "chore: version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Build
        if: steps.changesets.outputs.published == 'true'
        run: pnpm build

      - name: Publish to npm
        if: steps.changesets.outputs.published == 'true'
        run: pnpm changeset:publish
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 工作流程说明

1. **PR 阶段**：
   - Changeset Bot 检查 PR 是否包含 changeset
   - 如果没有，会在 PR 中评论提醒

2. **合并到 main 后**：
   - CI 检测到 changeset 文件
   - 自动创建 "Version Packages" PR
   - 更新版本号和 CHANGELOG

3. **合并 Version Packages PR 后**：
   - 自动发布到 npm
   - 创建 Git Tag

## 👥 团队协作规范

### 1. Changeset 编写规范

**好的 Changeset**：

```markdown
---
"@monorepo-starter/ui": minor
---

Add Button component with variants (primary, secondary, outline)
```

**不好的 Changeset**：

```markdown
---
"@monorepo-starter/ui": patch
---

fix bug
```

### 2. 版本类型选择指南

- **Major (1.0.0 → 2.0.0)**：
  - 破坏性变更（Breaking Changes）
  - API 重大变更
  - 移除功能

- **Minor (1.0.0 → 1.1.0)**：
  - 新功能（向后兼容）
  - 新增 API
  - 功能增强

- **Patch (1.0.0 → 1.0.1)**：
  - Bug 修复
  - 性能优化
  - 文档更新

### 3. 多包协同更新

如果多个包需要同时更新版本（如 UI 组件库和依赖它的包），使用 `linked` 配置：

```json
{
  "linked": [["@monorepo-starter/ui", "@monorepo-starter/utils"]]
}
```

### 4. 固定版本发布

如果某些包需要同时发布相同版本，使用 `fixed` 配置：

```json
{
  "fixed": [["@monorepo-starter/ui", "@monorepo-starter/utils"]]
}
```

## ❓ 常见问题

### Q: 什么时候创建 changeset？

A: 在完成一个功能或修复后，提交 PR 之前创建。每个 PR 应该至少包含一个 changeset。

### Q: 如果忘记创建 changeset 怎么办？

A: 可以在 PR 中直接添加 changeset 文件，或者合并后创建新的 PR 添加 changeset。

### Q: 如何撤销一个 changeset？

A: 直接删除 `.changeset/` 目录下对应的 changeset 文件即可。

### Q: 如何查看待发布的 changeset？

A: 运行 `pnpm changeset status` 查看当前所有待发布的 changeset。

### Q: 如何测试发布流程？

A: 使用 snapshot 模式：

```bash
pnpm changeset version --snapshot
```

## 📚 参考资源

- [Changesets 官方文档](https://github.com/changesets/changesets)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Changesets Action](https://github.com/changesets/action)
