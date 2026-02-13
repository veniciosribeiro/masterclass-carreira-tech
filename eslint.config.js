// eslint.config.js
// ESLint 9 flat config for TypeScript monorepo
// Frontend: React + TypeScript (moduleResolution: bundler, no extensions)
// Backend: Fastify + TypeScript (moduleResolution: NodeNext, .js extensions required)

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.git/**',
      '**/build/**',
      '**/coverage/**',
      '**/.cache/**',
    ],
  },

  // Base ESLint recommended config
  eslint.configs.recommended,

  // Frontend: React + TypeScript
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['api/**'],
    
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'import': importPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      // Existing conventions - match project style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'arrow-parens': ['error', 'always'],

      // TypeScript
      'no-undef': 'off', // TypeScript handles this better
      'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React
      'react/prop-types': 'off', // Using TypeScript for props validation
      'react/react-in-jsx-scope': 'off', // React 17+ JSX transform
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import - no extensions for bundler moduleResolution
      'import/extensions': ['error', 'never', {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      }],
      'import/order': 'off', // Disabled - false positives with sibling imports
      'import/no-unresolved': 'off', // TypeScript compiler and Vite handle this
    },
  },

  // Backend: Fastify + TypeScript (strict)
  {
    files: ['api/**/*.{js,ts}'],
    
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './api/tsconfig.json',
      },
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import': importPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './api/tsconfig.json',
        },
      },
    },

    rules: {
      // Existing conventions - match project style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'arrow-parens': ['error', 'always'],

      // TypeScript strict mode (backend is stricter)
      'no-undef': 'off', // TypeScript handles this better
      'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'error', // Error in backend (stricter)

      // Import with .js extension requirement for NodeNext
      // Source files are .ts, but imports must use .js (NodeNext/ESM requirement)
      // TypeScript compiler enforces this, so we disable the ESLint rule
      'import/extensions': 'off',
      'import/order': 'off', // Disabled - false positives with sibling imports
      'import/no-unresolved': 'off', // TypeScript compiler handles this
    },
  },
];
