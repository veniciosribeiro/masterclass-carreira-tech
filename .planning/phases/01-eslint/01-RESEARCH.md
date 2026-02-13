# Phase 1: ESLint - Research

**Researched:** 2026-02-13
**Domain:** ESLint configuration for TypeScript monorepo
**Confidence:** HIGH

## Summary

ESLint 9.x with Flat Config is the current standard for 2026. The flat config format (`eslint.config.js`) replaced the legacy `.eslintrc*` format and is now the default in ESLint 9.0+. For this TypeScript monorepo with React frontend and Fastify backend, the recommended approach is:

1. **Single root config** with two separate configuration objects (one for frontend, one for backend)
2. **typescript-eslint v8** as the unified package (replaces old `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin` pattern)
3. **Shared configs as base**: ESLint's `recommended` + typescript-eslint's `recommended` (or `strict` for more opinionated rules)
4. **React plugin** for frontend JSX linting
5. **Import plugin** for module resolution and import organization (optional but highly recommended)

The key architectural decision is to use cascading config objects with `files` globs to apply different rules to frontend vs backend, while sharing common base rules. This avoids config duplication and respects the project's ESM + monorepo structure.

**Primary recommendation:** Use ESLint 9 flat config with `typescript-eslint` package, separate frontend/backend config objects, and start with `recommended` configs + manual rule customization for existing conventions.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Auto-fix first**: Rodar `eslint --fix` para corrigir automaticamente o que for possivel
- **Manual fixes second**: Corrigir manualmente os erros que restarem apos auto-fix
- **Zero erros obrigatorio**: Nenhum erro de lint pode permanecer — phase 1 entrega codebase limpo
- **Warnings aceitaveis**: Warnings podem existir temporariamente, apenas erros bloqueiam
- **Single commit**: Config + auto-fix + manual fixes em um unico commit atomico
- **Prioridade**: Se houver muitos erros manuais, focar primeiro em bugs potenciais (unused vars, no-undef, etc) antes de issues de estilo

### Claude's Discretion

- Escolha de plugins e extensoes (React, TypeScript, Node, Import, a11y, etc)
- Nivel de rigor das regras (moderado sugerido — erros em issues importantes, warnings no resto)
- Estrutura de configuracao (raiz vs separada, shared config vs independente)
- Quais regras especificas ativar/desativar para respeitar convencoes existentes

### Project Specifics

- O projeto usa ESM (`"type": "module"`) em ambos os pacotes
- Backend usa `moduleResolution: "NodeNext"` — imports devem ter extensao `.js`
- Frontend usa `moduleResolution: "bundler"` — imports sem extensao
- Convencoes existentes: semicolons, single quotes, 2 espacos, trailing commas, arrow params sempre com parenteses
- No linter currently — starting from scratch

</user_constraints>

## Standard Stack

### Core

| Library             | Version   | Purpose                          | Why Standard                                             |
| ------------------- | --------- | -------------------------------- | -------------------------------------------------------- |
| `eslint`            | `^9.0.0`  | Core linter                      | Current stable, flat config is default                   |
| `@eslint/js`        | `latest`  | ESLint recommended rules         | Provides `eslint.configs.recommended`                    |
| `typescript-eslint` | `^8.55.0` | TypeScript linting (unified pkg) | Official TypeScript support, replaces old split packages |
| `globals`           | `^15.0.0` | Environment globals definitions  | Required for browser/node globals in flat config         |

**Why typescript-eslint package**: As of v6+, the `typescript-eslint` package is the recommended import that re-exports `parser`, `plugin`, and `configs`. This simplifies installation (one package vs two) and is the pattern shown in official docs.

### Supporting (Highly Recommended)

| Library                     | Version   | Purpose                  | When to Use                              |
| --------------------------- | --------- | ------------------------ | ---------------------------------------- |
| `eslint-plugin-react`       | `^7.37.0` | React-specific rules     | For React 19 frontend with JSX           |
| `eslint-plugin-react-hooks` | `^7.0.0`  | React Hooks rules        | React 19 uses hooks extensively          |
| `eslint-plugin-import`      | `^2.32.0` | Import/export validation | Module resolution, auto-fix import order |

### Supporting (Optional)

| Library                  | Version   | Purpose                     | When to Use                     |
| ------------------------ | --------- | --------------------------- | ------------------------------- |
| `eslint-plugin-jsx-a11y` | `^6.10.0` | Accessibility rules for JSX | If accessibility is a priority  |
| `eslint-plugin-n`        | `^17.0.0` | Node.js best practices      | For backend-specific Node rules |

**Note on import plugin**: While optional, it's highly valuable for:

- Catching unresolved imports early
- Enforcing consistent import order
- Detecting unused imports
- Handling ESM `.js` extension requirement in backend

### Alternatives Considered

| Instead of             | Could Use              | Tradeoff                                            |
| ---------------------- | ---------------------- | --------------------------------------------------- |
| typescript-eslint v8   | v7 (or split packages) | v8 is current, v7 uses deprecated patterns          |
| Flat config            | Legacy `.eslintrc`     | Flat config is ESLint 9 default, better composition |
| Single root config     | Per-package configs    | Root config with cascading avoids duplication       |
| `eslint-plugin-import` | No import plugin       | Miss out on auto-fix, import validation             |

**Installation:**

```bash
# Root (frontend)
npm install --save-dev eslint @eslint/js typescript-eslint globals eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import

# Backend (api/)
npm install --save-dev eslint @eslint/js typescript-eslint globals eslint-plugin-import
```

## Architecture Patterns

### Recommended Project Structure

```
/
├── eslint.config.js           # Root flat config (ESM)
├── package.json               # Frontend deps + eslint
├── tsconfig.json              # Frontend TS config
├── components/                # React components
├── services/                  # API client
├── api/
│   ├── package.json           # Backend deps (eslint as devDep here too)
│   ├── tsconfig.json          # Backend TS config (strict mode)
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── plugins/
│   │   └── hooks/
│   └── prisma/
└── ...
```

**Key points:**

- Single `eslint.config.js` at root (not per-package)
- ESLint installed in both root and api/ (for editor support in both)
- Use cascading config objects with `files` patterns to differentiate frontend/backend

### Pattern 1: Flat Config with Cascading Objects

**What:** Use array of config objects where later objects cascade/override earlier ones. Use `files` globs to target specific parts of codebase.

**When to use:** Always, for flat config (ESLint 9+).

**Example:**

```typescript
// eslint.config.js (root)
// Source: ESLint official docs + typescript-eslint docs
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig(
  // 1. Global ignores (applies to all configs)
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.git/**'],
  },

  // 2. Base config for all files
  eslint.configs.recommended,

  // 3. Frontend-specific
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['api/**'], // Exclude backend
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    extends: [...tseslint.configs.recommended],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      // ... frontend-specific rules
    },
  },

  // 4. Backend-specific
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
      import: importPlugin,
    },
    extends: [...tseslint.configs.strictTypeChecked],
    rules: {
      // Backend uses strict TS, enforce `.js` extensions
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      // ... backend-specific rules
    },
  }
);
```

### Pattern 2: Respecting Module Resolution Differences

**What:** Configure import plugin to handle different module resolution strategies between frontend (bundler) and backend (NodeNext).

**When to use:** When using `eslint-plugin-import` in a monorepo with different `moduleResolution` settings.

**Example:**

```typescript
// Frontend config object
{
  files: ['**/*.{ts,tsx}'],
  ignores: ['api/**'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    // Frontend: no extension required (bundler resolution)
    'import/extensions': ['error', 'never', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
  },
}

// Backend config object
{
  files: ['api/**/*.ts'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './api/tsconfig.json',
      },
    },
  },
  rules: {
    // Backend: MUST use .js extension for ESM (NodeNext requirement)
    'import/extensions': ['error', 'always', {
      js: 'always',
      ts: 'never', // Source is .ts, import uses .js
      ignorePackages: true,
    }],
  },
}
```

**Note:** Backend NodeNext requires `.js` in imports even when source file is `.ts`. This is a TypeScript + Node ESM requirement, not an ESLint preference.

### Pattern 3: Existing Conventions Configuration

**What:** Configure rules to match project's existing code style (semicolons, single quotes, 2 spaces, etc).

**When to use:** Always, to avoid massive auto-fix churn and respect project decisions.

**Example:**

```typescript
{
  rules: {
    // Punctuation
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],

    // Spacing
    'indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/indent': ['error', 2],

    // Arrow functions
    'arrow-parens': ['error', 'always'],

    // React-specific (if using React)
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
  },
}
```

### Anti-Patterns to Avoid

- **Multiple config files per package**: Leads to duplication and inconsistency. Use one root config with cascading.
- **Type-checked rules without proper setup**: Will cause performance issues. Backend can use `strictTypeChecked` because it has `strict: true` in tsconfig; frontend should stick to `recommended` (non-type-checked).
- **Ignoring NodeNext import requirements**: Backend MUST use `.js` extensions in imports when using `moduleResolution: "NodeNext"`. This is not optional.
- **Installing plugins globally**: Always install as project devDependencies for reproducibility.
- **Mixing legacy and flat config**: Stick to flat config only (ESLint 9+ default).

## Don't Hand-Roll

| Problem              | Don't Build            | Use Instead                                     | Why                                                                  |
| -------------------- | ---------------------- | ----------------------------------------------- | -------------------------------------------------------------------- |
| TypeScript parsing   | Custom TS parser       | `typescript-eslint` package                     | Official parser, maintained by TS community, handles all TS features |
| React JSX validation | Custom JSX rules       | `eslint-plugin-react` + `react-hooks`           | Hundreds of edge cases handled, maintained by React community        |
| Import resolution    | Custom resolver        | `eslint-plugin-import` with typescript resolver | Handles webpack aliases, monorepos, tsconfig paths                   |
| Code formatting      | ESLint stylistic rules | Prettier (or no formatter)                      | ESLint docs explicitly recommend against using ESLint for formatting |
| Config composition   | Manual object merging  | Flat config cascading                           | Built into ESLint 9, handles precedence automatically                |

**Key insight:** ESLint ecosystem has mature, well-tested solutions for every common problem. Building custom solutions introduces bugs and maintenance burden. The only custom work should be rule configuration, not rule/parser/plugin implementation.

## Common Pitfalls

### Pitfall 1: Installing Wrong typescript-eslint Packages

**What goes wrong:** Developers install `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` separately, which is the old pattern from v5 and earlier.

**Why it happens:** Outdated tutorials and Stack Overflow answers from pre-2023 era.

**How to avoid:** Use `typescript-eslint` (unified package) as shown in official docs since v6+. This package re-exports `parser`, `plugin`, and `configs`.

**Warning signs:**

- Seeing `extends: ['plugin:@typescript-eslint/recommended']` in flat config (wrong syntax)
- Two separate packages in `package.json`
- Import statements like `import parser from '@typescript-eslint/parser'`

**Correct pattern:**

```typescript
import tseslint from 'typescript-eslint';
// Not: import parser from '@typescript-eslint/parser'
```

### Pitfall 2: Missing File Extensions in Backend Imports

**What goes wrong:** Backend imports fail to resolve or cause TS errors because `.js` extension is missing from relative imports.

**Why it happens:** Frontend doesn't require extensions with bundler resolution, developers copy pattern to backend.

**How to avoid:** Configure `import/extensions` rule specifically for backend files to require `.js` extension.

**Warning signs:**

- TypeScript compiler errors about module resolution in backend
- Backend imports like `import { foo } from './utils'` (should be `'./utils.js'`)
- ESLint not catching missing extensions

**Correct pattern:**

```typescript
// Backend (api/) with NodeNext resolution
import { foo } from './utils.js'; // ✓ Required
import { bar } from './types.js'; // ✓ Required
// NOT: import { foo } from './utils'  // ✗ Will fail at runtime
```

### Pitfall 3: Type-Checked Rules Without tsconfig.json Reference

**What goes wrong:** Type-checked rules (those requiring type information) silently fail or report false positives/negatives.

**Why it happens:** Enabling `strictTypeChecked` or individual type-aware rules without providing `parserOptions.project`.

**How to avoid:**

1. Only use type-checked configs where you can provide valid tsconfig path
2. Backend can use `strictTypeChecked` (has strict mode enabled)
3. Frontend should stick to `recommended` (non-type-checked) unless willing to add `project` option

**Warning signs:**

- Rules like `@typescript-eslint/no-unsafe-*` not reporting obvious issues
- Console warnings about missing type information
- Very slow linting times (scanning entire project)

**Correct pattern:**

```typescript
// Backend config object
{
  files: ['api/**/*.ts'],
  languageOptions: {
    parserOptions: {
      project: './api/tsconfig.json', // Required for type-checked rules
    },
  },
  extends: [
    ...tseslint.configs.strictTypeChecked, // OK: project is specified
  ],
}
```

### Pitfall 4: Config Execution Context Confusion

**What goes wrong:** Config file uses Node.js features (like `__dirname`) or assumes CJS when it's ESM.

**Why it happens:** Both root and api/ packages specify `"type": "module"`, so `eslint.config.js` is parsed as ESM, not CommonJS.

**How to avoid:**

- Use ESM syntax (`import`/`export default`, not `require`/`module.exports`)
- Avoid `__dirname` (use `import.meta.url` + `fileURLToPath` if needed)
- No `.cjs` extension needed since ESM is working

**Warning signs:**

- `require is not defined` error
- `__dirname is not defined` error
- Config file not loading

**Correct pattern:**

```typescript
// eslint.config.js (ESM, not CJS)
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // config objects
]);

// NOT: module.exports = [ ... ]
```

### Pitfall 5: Overriding Rules Too Early

**What goes wrong:** Developer overrides or disables rules before understanding what they're catching, missing real bugs.

**Why it happens:** Auto-fix leaves errors that require thought to fix; quickest path is to disable rule.

**How to avoid:**

1. Run `eslint --fix` first (auto-fixes easy stuff)
2. Review remaining errors one by one
3. Only disable rules that genuinely conflict with project decisions
4. Prioritize potential bugs (no-undef, no-unused-vars) over style issues

**Warning signs:**

- Config has many `'rule-name': 'off'` entries
- Disabling rules like `no-unused-vars` or `no-undef` (usually indicates real issues)
- Changing rule severity to 'warn' for everything

**Correct approach:**

1. Start with `recommended` configs
2. Run auto-fix
3. Manually fix real issues (unused vars, type errors)
4. Only then consider rule adjustments
5. Prefer configuring rule options over disabling rules entirely

### Pitfall 6: Not Installing ESLint in Both Packages

**What goes wrong:** Editor ESLint extension doesn't work in backend directory because eslint isn't in `api/package.json`.

**Why it happens:** Assumption that root installation is sufficient for monorepo.

**How to avoid:** Install eslint as devDependency in both root and `api/` packages. Config stays at root, but binary must be available in each package for editor tooling.

**Warning signs:**

- ESLint works in root files but not in `api/` files
- Editor shows "ESLint not found" warnings in `api/` directory

**Correct approach:**

```bash
# Install at root
npm install --save-dev eslint

# Install in backend too
npm install --save-dev eslint -w api
```

## Code Examples

Verified patterns from official sources:

### Complete Flat Config Example (Root)

```typescript
// eslint.config.js
// Source: ESLint docs + typescript-eslint docs + project requirements
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default defineConfig(
  // Global ignores
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.git/**', '**/build/**'],
  },

  // Base recommended config
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
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },

    extends: [
      ...tseslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'], // React 17+ JSX transform
    ],

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
      // Existing conventions
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],
      'arrow-parens': ['error', 'always'],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React
      'react/prop-types': 'off', // Using TypeScript
      'react/react-in-jsx-scope': 'off', // React 17+
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import
      'import/extensions': [
        'error',
        'never',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
        },
      ],
      'import/no-unresolved': 'error',
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
      import: importPlugin,
    },

    extends: [...tseslint.configs.strictTypeChecked],

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './api/tsconfig.json',
        },
      },
    },

    rules: {
      // Existing conventions
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],
      'arrow-parens': ['error', 'always'],

      // TypeScript strict mode
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // Stricter in backend

      // Import with .js extension requirement (NodeNext)
      'import/extensions': [
        'error',
        'always',
        {
          js: 'always',
          ts: 'never', // Source is .ts, import uses .js
          ignorePackages: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
        },
      ],
      'import/no-unresolved': 'error',
    },
  }
);
```

### Running ESLint Commands

```bash
# Check all files
npx eslint .

# Auto-fix what's possible
npx eslint . --fix

# Check specific directory
npx eslint api/

# Check specific file
npx eslint src/services/apiClient.ts

# Output to file for review
npx eslint . --output-file eslint-report.txt
```

### package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:frontend": "eslint --ignore-pattern 'api/**' .",
    "lint:backend": "eslint api/"
  }
}
```

## State of the Art

| Old Approach                                                                      | Current Approach                                          | When Changed                       | Impact                                                          |
| --------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------- |
| `.eslintrc.js` legacy config                                                      | `eslint.config.js` flat config                            | ESLint 9.0 (2024)                  | Simpler composition, better type safety, required for ESLint 9+ |
| Split packages (`@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin`) | Unified `typescript-eslint` package                       | typescript-eslint v6 (2023)        | Single import, easier setup, still works but deprecated         |
| `extends` with string references                                                  | Direct config object arrays with `extends` array property | ESLint 9.0                         | More explicit, better IDE support                               |
| Per-package eslint configs                                                        | Root config with cascading                                | Emerging best practice (2024+)     | Less duplication, consistent rules                              |
| Formatting rules in ESLint                                                        | No formatter or Prettier                                  | ESLint 8.53+ officially recommends | Faster linting, separation of concerns                          |

**Deprecated/outdated:**

- `.eslintrc` files: Use `eslint.config.js` flat config (ESLint 9+)
- `@typescript-eslint/parser` separate package: Use `typescript-eslint` unified package (v6+)
- `plugin:@typescript-eslint/recommended` in extends: Use config object arrays in flat config
- CommonJS config syntax: Use ESM when package.json specifies `"type": "module"`

## Open Questions

1. **Use strict vs recommended for frontend?**
   - What we know: Backend uses strict TS mode, frontend doesn't
   - What's unclear: Whether frontend should adopt stricter linting despite looser TS config
   - Recommendation: Start with `recommended` for frontend; can upgrade to `strict` later if team wants more rigor

2. **Include jsx-a11y plugin?**
   - What we know: Frontend is a user-facing test interface
   - What's unclear: Accessibility priority level for this project
   - Recommendation: Skip for Phase 1 (can add later if needed); focus on core linting first

3. **Use import plugin's TypeScript resolver?**
   - What we know: Project uses path aliases and monorepo structure
   - What's unclear: Whether `eslint-import-resolver-typescript` is needed or if default works
   - Recommendation: Include it; small dependency, solves TS path resolution issues

## Sources

### Primary (HIGH confidence)

- [ESLint official docs - Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files) - Flat config format, configuration objects
- [ESLint official docs - Getting Started](https://eslint.org/docs/latest/use/getting-started) - Installation, basic setup
- [typescript-eslint docs - Getting Started](https://typescript-eslint.io/getting-started/) - Unified package usage, recommended configs
- [typescript-eslint docs - typescript-eslint package](https://typescript-eslint.io/packages/typescript-eslint) - Package structure, exports, examples
- [typescript-eslint docs - FAQs](https://typescript-eslint.io/troubleshooting/faqs/general) - Common issues, best practices

### Secondary (MEDIUM confidence)

- [eslint-plugin-react GitHub](https://github.com/jsx-eslint/eslint-plugin-react) - React plugin usage, flat config support
- [eslint-plugin-react-hooks npm](https://www.npmjs.com/package/eslint-plugin-react-hooks) - React Hooks plugin, current version
- [eslint-plugin-import GitHub](https://github.com/import-js/eslint-plugin-import) - Import plugin usage, resolvers

### Tertiary (LOW confidence)

- None - all research verified through official docs

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - All information from official docs (ESLint, typescript-eslint, React plugin maintainers)
- Architecture: HIGH - Flat config patterns documented in ESLint 9 official docs, typescript-eslint provides clear examples
- Pitfalls: HIGH - Based on official troubleshooting docs and common GitHub issues

**Research date:** 2026-02-13
**Valid until:** 90 days (ESLint/typescript-eslint are stable; major changes unlikely in 3 months)

**Key findings verified:**

- ✅ ESLint 9 uses flat config as default
- ✅ typescript-eslint unified package is current standard
- ✅ Flat config supports cascading with `files` globs
- ✅ NodeNext requires `.js` extensions in imports
- ✅ React 17+ uses jsx-runtime (no React import needed)
- ✅ Both packages need ESLint installed for editor support
