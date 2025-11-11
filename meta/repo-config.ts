export interface RepoConfig {
  namespace: string
  homepage: string
  repository: string
  author: {
    name: string
    email: string
  }
  bugs: {
    url: string
  }
  packageManager: string
  engines: {
    node: string
  }
}

export const REPO_CONFIG: RepoConfig = {
  namespace: "@monorepo-starter",
  author: {
    name: "@monorepo-starter Team",
    email: "team@monorepo-starter.com"
  },
  homepage: "https://xxx.com",
  repository: "https://github.com/xxx/xxx.git",
  bugs: {
    url: "https://issues.monorepo-starter.com"
  },
  packageManager: "pnpm@9.0.0",
  engines: {
    node: ">=24.0.0"
  }
}

export interface PackageConfig {
  /** The name of the package */
  packageName: string
  /** The path of the package */
  packagePath: string
  /** The package.json of the package */
  packageJson: {
    description: string
    keywords: string[]
    dependencies?: Record<string, string>
  }
}

export const PACKAGES_CONFIG: PackageConfig[] = [
  {
    packageName: "ui",
    packagePath: "packages/ui",
    packageJson: {
      description: "@monorepo-starter Component Framework",
      keywords: []
    }
  },
  {
    packageName: "hooks",
    packagePath: "packages/hooks",
    packageJson: {
      description: "@monorepo-starter Hooks",
      keywords: []
    }
  },
  {
    packageName: "prettier-config",
    packagePath: "packages/configs/prettier-config",
    packageJson: {
      description: "@monorepo-starter Prettier Config",
      keywords: []
    }
  },
  {
    packageName: "eslint-config",
    packagePath: "packages/configs/eslint-config",
    packageJson: {
      description: "@monorepo-starter ESLint Config",
      keywords: []
    }
  },
  {
    packageName: "typescript-config",
    packagePath: "packages/configs/typescript-config",
    packageJson: {
      description: "@monorepo-starter TypeScript Config",
      keywords: []
    }
  },
  {
    packageName: "vite-plugin-xxx",
    packagePath: "packages/vite-plugins/vite-plugin-xxx",
    packageJson: {
      description: "@monorepo-starter Vite Plugin Example",
      keywords: ["vite", "vite-plugin"]
    }
  },
  {
    packageName: "shared-utils",
    packagePath: "packages/utils/shared-utils",
    packageJson: {
      description: "@monorepo-starter Shared Utilities",
      keywords: ["utils", "utilities", "helpers"]
    }
  }
]

export const APPS_DEPS = (() => {
  const deps: Record<string, string> = {}
  PACKAGES_CONFIG.forEach(({ packageName }) => {
    deps[`${REPO_CONFIG.namespace}/${packageName}`] = "workspace:*"
  })
  return deps
})()

export const APPS_CONFIG: PackageConfig[] = [
  {
    packageName: "storybook",
    packagePath: "apps/storybook",
    packageJson: {
      description: "Storybook for @monorepo-starter",
      keywords: [],
      dependencies: APPS_DEPS
    }
  }
]
