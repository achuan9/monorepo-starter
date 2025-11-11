# Changesets Best Practices Guide

## 📋 Table of Contents

1. [Core Workflow](#core-workflow)
2. [Supporting Tools](#supporting-tools)
3. [CI/CD Integration](#cicd-integration)
4. [Team Collaboration Guidelines](#team-collaboration-guidelines)
5. [FAQ](#faq)

## 🔄 Core Workflow

### Standard Development Process

1. **Develop Feature/Fix Bug**

   ```bash
   # Create feature branch
   git checkout -b feat/add-button-component

   # Develop code...
   ```

2. **Create Changeset**

   ```bash
   # After completing the feature, run changeset command
   pnpm changeset

   # Interactive selection:
   # - Select packages to update
   # - Choose version type (major/minor/patch)
   # - Write change description
   ```

3. **Commit Code**

   ```bash
   git add .
   git commit -m "feat(ui): add button component"
   git push
   ```

4. **Create PR**
   - Changeset file will be submitted with PR
   - Team members review code and changeset

5. **Merge PR**
   - After merging to main branch, changeset file will be retained

6. **Release Process (usually executed automatically in CI)**

   ```bash
   # 1. Update version numbers and generate CHANGELOG
   pnpm changeset:version

   # 2. Build packages
   pnpm build

   # 3. Publish to npm
   pnpm changeset:publish
   ```

## 🛠️ Supporting Tools

### 1. Commitlint - Commit Message Standards

**Purpose**: Ensure commit messages follow Conventional Commits specification for automatic CHANGELOG generation.

**Installation**:

```bash
pnpm add -D -w @commitlint/cli @commitlint/config-conventional
```

**Configuration**: Create `commitlint.config.js`

```js
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code style (doesn't affect code execution)
        "refactor", // Refactoring
        "perf", // Performance optimization
        "test", // Test related
        "chore", // Build/tool changes
        "revert" // Revert
      ]
    ]
  }
}
```

### 2. Husky - Git Hooks Management

**Purpose**: Automatically run lint and commitlint checks before commit.

**Installation**:

```bash
pnpm add -D -w husky
pnpm exec husky install
```

**Note**: Add `prepare` script in `package.json` for automatic initialization:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

**Configuration**: `.husky/commit-msg`

```bash
pnpm exec commitlint --edit $1
```

**Configuration**: `.husky/pre-commit`

```bash
pnpm exec lint-staged
```

**Note**: Husky v9.1.1+ no longer requires `#!/usr/bin/env sh` and `husky.sh` reference. Write commands directly.

### 3. lint-staged - Staged Files Check

**Purpose**: Run lint and formatting only on staged files for better efficiency.

**Installation**:

```bash
pnpm add -D -w lint-staged
```

**Configuration**: Create `.lintstagedrc.js` file

```js
export default {
  "*.{js,ts,tsx,vue}": [
    "eslint --fix",
    "prettier --write",
    "cspell --no-must-find-files"
  ],
  "*.{json,md,mdx}": ["prettier --write", "cspell --no-must-find-files"]
}
```

### 4. Changeset Bot (GitHub App)

**Purpose**: Automatically check if PR contains changeset, and remind if not.

**Installation**: Install [Changesets Bot](https://github.com/apps/changeset-bot) on GitHub

**Configuration**: Configure in `.github/changeset-bot.yml` (optional)

## 🚀 CI/CD Integration

### GitHub Actions Workflow

Create `.github/workflows/release.yml`:

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

### Workflow Explanation

1. **PR Phase**:
   - Changeset Bot checks if PR contains changeset
   - If not, it will comment in PR to remind

2. **After Merging to Main**:
   - CI detects changeset files
   - Automatically creates "Version Packages" PR
   - Updates version numbers and CHANGELOG

3. **After Merging Version Packages PR**:
   - Automatically publishes to npm
   - Creates Git Tag

## 👥 Team Collaboration Guidelines

### 1. Changeset Writing Standards

**Good Changeset**:

```markdown
---
"@monorepo-starter/ui": minor
---

Add Button component with variants (primary, secondary, outline)
```

**Bad Changeset**:

```markdown
---
"@monorepo-starter/ui": patch
---

fix bug
```

### 2. Version Type Selection Guide

- **Major (1.0.0 → 2.0.0)**:
  - Breaking changes
  - Major API changes
  - Feature removal

- **Minor (1.0.0 → 1.1.0)**:
  - New features (backward compatible)
  - New APIs
  - Feature enhancements

- **Patch (1.0.0 → 1.0.1)**:
  - Bug fixes
  - Performance optimizations
  - Documentation updates

### 3. Multi-Package Coordinated Updates

If multiple packages need to update versions simultaneously (e.g., UI component library and packages that depend on it), use `linked` configuration:

```json
{
  "linked": [["@monorepo-starter/ui", "@monorepo-starter/utils"]]
}
```

### 4. Fixed Version Publishing

If certain packages need to be published with the same version, use `fixed` configuration:

```json
{
  "fixed": [["@monorepo-starter/ui", "@monorepo-starter/utils"]]
}
```

## ❓ FAQ

### Q: When should I create a changeset?

A: After completing a feature or fix, before submitting PR. Each PR should contain at least one changeset.

### Q: What if I forget to create a changeset?

A: You can add a changeset file directly in the PR, or create a new PR to add changeset after merging.

### Q: How to undo a changeset?

A: Simply delete the corresponding changeset file in the `.changeset/` directory.

### Q: How to view pending changesets?

A: Run `pnpm changeset status` to view all pending changesets.

### Q: How to test the release process?

A: Use snapshot mode:

```bash
pnpm changeset version --snapshot
```

## 📚 Reference Resources

- [Changesets Official Documentation](https://github.com/changesets/changesets)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Changesets Action](https://github.com/changesets/action)
