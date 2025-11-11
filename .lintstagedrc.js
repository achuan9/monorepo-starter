export default {
  "*.{js,ts,tsx,vue}": [
    "eslint --fix",
    "prettier --write",
    "cspell --no-must-find-files"
  ],
  "*.{json,md,mdx}": ["prettier --write", "cspell --no-must-find-files"]
}
