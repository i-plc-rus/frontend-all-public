module.exports = {
  plugins: ['prettier', 'jsx-a11y'],
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
    'eslint-config-prettier',
  ]
    .map(require.resolve)
    .concat(['plugin:jsx-a11y/strict']),
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
  globals: {
    JSX: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', 'vite-env.d.ts', 'old/'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'eslint-comments/no-unused-disable': 'off',
    'react/prop-types': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'off',
    // Ignore unused variables that starts with `_`, for example `.map((_el, idx) => idx))`
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'all', argsIgnorePattern: '^_' }],
    'no-undef': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/react-in-jsx-scope': 'off',
    'explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],

    'eslint-comments/require-description': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'no-console': ['warn'],
    '@typescript-eslint/no-misused-promises': ['off'],
  },
};
