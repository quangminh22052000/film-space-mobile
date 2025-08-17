const js = require("@eslint/js")
const prettier = require("eslint-config-prettier")
const importPlugin = require("eslint-plugin-import")
const tseslint = require("typescript-eslint")

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  // ✅ Ignore các thư mục/file không cần lint
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/ios/build/**",
      "**/android/app/build/**",
      "**/*.bundle",
      "**/.expo/**", // Ignore Expo generated files
      "**/babel.config.js",
      "**/metro.config.js",
      "**/jest.config.cjs",
      "**/jest.setup.cjs",
    ],
  },

  // ✅ Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ Cấu hình cho file ESLint config
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "writable",
        __dirname: "readonly",
        process: "readonly",
      },
    },
  },

  // ✅ Cấu hình môi trường cho các file cấu hình Node
  {
    files: ["app.config.js", "babel.config.js", "metro.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // vẫn giữ ESM
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "writable", // nếu cần CommonJS
        require: "readonly",
      },
    },
  },

  // ✅ Cấu hình cho source code - cập nhật để bao gồm tất cả source code
  {
    files: ["**/*.{ts,tsx,js,jsx}"], // lint tất cả source code
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        ecmaVersion: "latest",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // 🧠 Quy tắc nhóm và thứ tự import
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // React, NodeJS
            "external", // Thư viện ngoài
            "internal", // alias nội bộ như @/
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // ⚠️ Rule khác
      "no-unused-vars": "off",
      "import/no-unresolved": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // ✅ Prettier cuối cùng để override style
  {
    rules: {
      ...prettier.rules,
    },
  },
]

module.exports = config
