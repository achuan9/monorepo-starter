# Contributing to Monorepo Starter

Thank you for your interest in contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful and considerate of others.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/monorepo-starter.git
   cd monorepo-starter
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

## 🔧 Development Workflow

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 9.0.0

### Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Lint and auto-fix issues
- `pnpm test` - Run tests
- `pnpm format` - Format code
- `pnpm check-types` - Type-check all packages
- `pnpm spellcheck` - Check spelling
- `pnpm spellcheck:fix` - Fix spelling issues

### Making Changes

1. Make your changes in a feature branch
2. Ensure all tests pass: `pnpm test`
3. Ensure linting passes: `pnpm lint`
4. Ensure types are correct: `pnpm check-types`
5. Format your code: `pnpm format`
6. Create a changeset if needed: `pnpm changeset`

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `ci`: Changes to CI configuration files and scripts

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Examples

```bash
feat(ui): add button component
fix(utils): resolve date formatting issue
docs: update README with new features
```

## 🔀 Pull Request Process

1. **Update your branch**

   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Ensure all checks pass**
   - All tests pass
   - Linting passes
   - Type checking passes
   - Code is formatted
   - Spell check passes

3. **Create a Pull Request**
   - Use a clear and descriptive title
   - Fill out the PR template
   - Link related issues
   - Add screenshots if applicable

4. **Wait for Review**
   - Address any review comments
   - Keep your PR up to date with main

## 🎨 Code Style

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint rules
- Use Prettier for formatting
- Write self-documenting code with clear variable names

### Vue Components

- Use Composition API
- Follow Vue style guide
- Use TypeScript for component props and emits

### File Naming

- Components: PascalCase (e.g., `Button.vue`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Tests: `*.test.ts` or `*.spec.ts`

## 🧪 Testing

- Write tests for new features
- Ensure all tests pass before submitting
- Aim for good test coverage
- Use descriptive test names

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## 📦 Changesets

If your changes affect a package that will be published:

1. Create a changeset: `pnpm changeset`
2. Select the affected packages
3. Choose the version bump type
4. Write a clear description of the changes

## ❓ Questions?

- Open a discussion for questions
- Check existing issues and PRs
- Review the documentation

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute!
