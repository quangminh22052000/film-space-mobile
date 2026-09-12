import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import tseslint from "typescript-eslint"

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
    ],
  },

  // ✅ Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ✅ Cấu hình môi trường cho các file cấu hình Node
  {
    files: [
      "app.config.js",
      "babel.config.js",
      "metro.config.js",
      "metro.config.cjs",
    ],
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

  // ✅ Cấu hình cho source code
  {
    files: [
      "app/**/*.{ts,tsx,js,jsx}",
      "libs/**/*.{ts,tsx,js,jsx}",
      "screens/**/*.{ts,tsx,js,jsx}",
      "__tests__/**/*.{ts,tsx,js,jsx}",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module",
        ecmaVersion: "latest",
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

export default config
