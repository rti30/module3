module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-empty-function": "off",
    "no-empty-pattern": "off",
    "prettier/prettier": ["error",
        {
            "singleQuote": true,
            "useTabs": true,
            "semi": true,
            "trailingComma": "all",
            "bracketSpacing": true,
            "printWidth": 100,
            "endOfLine": "auto"
        }
    ],
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-empty-function": [
        "off"
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off"
  },
};
