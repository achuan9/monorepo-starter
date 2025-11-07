import { PACKAGES_CONFIG, APPS_CONFIG, REPO_CONFIG, PackageConfig } from "./constants";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

function initPackageJson(packageConfig: PackageConfig) {
  const packageJsonPath = path.resolve(
    rootDir,
    packageConfig.packagePath,
    "package.json"
  );

  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  文件不存在，跳过: ${packageJsonPath}`);
    return;
  }

  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);
    const { description, keywords, dependencies } = packageConfig.packageJson;

    packageJson.name = `${REPO_CONFIG.namespace}/${packageConfig.packageName}`;
    packageJson.description = description;
    packageJson.keywords = keywords;
    packageJson.author = REPO_CONFIG.author;
    packageJson.homepage = REPO_CONFIG.homepage;
    packageJson.repository = {
      type: "git",
      url: REPO_CONFIG.repository,
      directory: packageConfig.packagePath,
    };

    packageJson.bugs = REPO_CONFIG.bugs;
    packageJson.packageManager = REPO_CONFIG.packageManager;
    packageJson.engines = REPO_CONFIG.engines;
    if (dependencies) {
      packageJson.dependencies = {
        ...dependencies,
        ...(packageJson.dependencies || {}),
      };
    }

    // 写回文件
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + "\n",
      "utf8"
    );

    console.log(`✅ 已更新: ${packageJsonPath}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ 处理文件失败 ${packageJsonPath}:`, error.message);
    } else {
      console.error(`❌ 处理文件失败 ${packageJsonPath}:`, error);
    }
    throw error;
  }
}

// 根据配置修改各个包的 package.json 中的字段
console.log("📦 开始初始化包配置...\n");

PACKAGES_CONFIG.forEach((config: PackageConfig) => {
  initPackageJson(config);
});

APPS_CONFIG.forEach((config: PackageConfig) => {
  initPackageJson(config);
});

// 初始化根目录的 package.json
initPackageJson({
  packageName: "root",
  packagePath: ".",
  packageJson: {
    description: "Monorepo Starter",
    keywords: []
  },
});

console.log("\n✨ 初始化完成！");
