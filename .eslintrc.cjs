// ALL_PACKAGES
const allPackages = [
  'viewer'
]

const createPattern = () => [
  {
    group: ['**/dist', '**/dist/**'],
    message: 'Don not import from dist',
    allowTypeImports: false
  },
  {
    group: ['**/src', '**/src/**'],
    message: 'Don not import from src',
    allowTypeImports: false
  }
]

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: [
    'packages/viewer/dist/*'
  ],
  overrides: [
    {
      plugins: ['react', '@typescript-eslint'],
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'react/react-in-jsx-scope': 'off'
      }
    },
    ...allPackages.map(pkg => ({
      files: [`packages/${pkg}/src/*.ts`],
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            patterns: createPattern(pkg)
          }
        ]
      }
    }))
  ],
  settings: {
    react: {
      version: '18'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false }
    ],
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/dist', '**/dist/**'],
            message: 'Don not import from dist',
            allowTypeImports: false
          },
          {
            group: ['**/src', '**/src/**'],
            message: 'Don not import from src',
            allowTypeImports: false
          }
        ]
      }
    ]
  }
}
