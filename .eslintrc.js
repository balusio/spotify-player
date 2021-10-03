module.exports = {
  extends: ['airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    projectFolderIgnoreList: ['/node_modules/'],
  },
  rules: {
    // turn on errors for missing imports
    "import/no-unresolved": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-one-expression-per-line": 0, 
    "import/no-extraneous-dependencies": ["warn", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": true}],
    "react/no-unused-prop-types": 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/button-has-type' : 0,
    'import/no-cycle': 0,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true, 
        project: './tsconfig.json',
      }
    }
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  ignorePatterns:[
    "server/**/*.ts",
    ".eslintrc.js",
    "webpack.config.js",
    "webpack.prod.config.js",
  ],
};
