# Monorepo Starter

A modern, production-ready monorepo template built with pnpm workspaces, Turborepo, and a comprehensive set of development tools.

## 🚀 Tech Stack

- **Package Management**: [pnpm](https://pnpm.io/) with workspaces
- **Build System**: [Turborepo](https://turbo.build/) for task orchestration
- **Versioning & Publishing**: [Changesets](https://github.com/changesets/changesets)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Code Quality**:
  - [ESLint](https://eslint.org/) - Linting
  - [Prettier](https://prettier.io/) - Code formatting
  - [Commitlint](https://commitlint.js.org/) - Commit message linting
  - [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit hooks
  - [cspell](https://cspell.org/) - Spell checking

## 📁 Project Structure

```
monorepo-starter/
├── apps/                    # Applications
│   └── storybook/          # Component documentation and showcase
├── meta/                   # Meta
│   └── repo-config.ts      # Repo config
├── packages/               # Shared packages
│   ├── ui/                 # Core UI component library
│   ├── configs/            # Shared configuration packages
│   │   ├── eslint-config/
│   │   └── typescript-config/
│   ├── utils/              # Utility packages
│   └── vite-plugins/       # Vite plugin packages
├── scripts/                # Build and utility scripts
│   ├── constants.ts        # Repository configuration
│   └── init-repo.ts        # Repository initialization script
├── package.json            # Root package.json
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── turbo.json              # Turborepo configuration
└── tsconfig.json           # Root TypeScript configuration
```

## 🏁 Quick Start

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 9.0.0

### Getting Started

1. **Clone the template repository**

   ```bash
   git clone <your-repo-url>
   cd monorepo-starter
   ```

2. **Configure the repository**

   Edit `scripts/constants.ts` and update the following configuration:

   ```typescript
   export const REPO_CONFIG: RepoConfig = {
     namespace: "@your-org", // Your organization namespace
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

3. **Plan your packages**

   Organize your packages in the `packages/` directory according to your needs:
   - `packages/ui/` - UI component library
   - `packages/configs/` - Shared configuration packages
   - `packages/utils/` - Utility function packages
   - `packages/vite-plugins/` - Custom Vite plugins

   Update `PACKAGES_CONFIG` and `APPS_CONFIG` in `scripts/constants.ts` to match your package structure.

4. **Install dependencies**

   ```bash
   pnpm install
   ```

   This will automatically:
   - Ensure only pnpm is used (via `only-allow`)
   - Run the repository initialization script to update all package.json files

5. **Start development**

   ```bash
   pnpm dev
   ```

## 📖 Template Usage Guide

### Step 1: Configure Repository Settings

The first thing you need to do after getting the template is to modify the configuration in `scripts/constants.ts`:

- **`REPO_CONFIG`**: Update namespace, author, homepage, repository URL, and other repository-level settings
- **`PACKAGES_CONFIG`**: Define your package structure and metadata
- **`APPS_CONFIG`**: Configure your applications (like Storybook)

### Step 2: Plan Your Packages

Organize your packages in the `packages/` directory:

- **UI Components**: Place your component library in `packages/ui/`
- **Configurations**: Shared configs (ESLint, TypeScript, etc.) in `packages/configs/`
- **Utilities**: Reusable utility functions in `packages/utils/`
- **Plugins**: Custom Vite plugins in `packages/vite-plugins/`

### Step 3: Install Dependencies

Run `pnpm install` to:

- Install all dependencies
- Automatically initialize the repository (updates all package.json files based on your configuration)

## 🛠️ Available Scripts

### Root Level Scripts

- `pnpm install` - Install dependencies and initialize repository
- `pnpm build` - Build all packages and apps
- `pnpm dev` - Start development servers for all apps
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Type-check all packages
- `pnpm spellcheck` - Check spelling in code
- `pnpm test` - Run tests across all packages
- `pnpm clean` - Clean build artifacts

### Package-Level Scripts

Each package can have its own scripts defined in its `package.json`. Common scripts include:

- `dev` - Start development mode
- `build` - Build the package
- `test` - Run tests
- `lint` - Lint the package

## 🧪 Testing

This template uses Vitest for testing. Write your tests alongside your code:

```typescript
// Example: packages/ui/src/components/button/__tests__/button.test.ts
import { describe, it, expect } from "vitest"

describe("Button", () => {
  it("should render correctly", () => {
    // Your test here
  })
})
```

## 📦 Versioning & Publishing

This template uses Changesets for version management and publishing:

1. **Create a changeset**: `pnpm changeset`
2. **Version packages**: `pnpm changeset version`
3. **Publish packages**: `pnpm changeset publish`

## 🔧 Development Workflow

1. **Create a new package**: Add it to `PACKAGES_CONFIG` in `scripts/constants.ts` and create the directory structure
2. **Add dependencies**: Use `pnpm add <package>` in the specific package directory
3. **Run tasks**: Use Turborepo to run tasks across packages: `pnpm turbo <task>`
4. **Format code**: Run `pnpm format` before committing
5. **Commit changes**: Follow conventional commits (enforced by Commitlint)

## 📝 Code Style

- **ESLint**: Configured for consistent code quality
- **Prettier**: Automatic code formatting
- **Commitlint**: Enforces conventional commit messages
- **lint-staged**: Runs linters on staged files before commit

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass and code is linted
4. Commit using conventional commit format
5. Create a pull request

## 📄 License

[Add your license here]

## 🔗 Links

- [Documentation](https://your-docs-url.com)
- [Changelog](./CHANGELOG.md)
- [Issues](https://github.com/your-org/your-repo/issues)
