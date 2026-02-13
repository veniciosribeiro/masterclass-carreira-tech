# Phase 2: Prettier + Integration - Research

**Researched:** 2026-02-13
**Domain:** Prettier configuration and ESLint integration for TypeScript monorepo
**Confidence:** HIGH

## Summary

Prettier v3 is the latest stable version for code formatting. The integration with ESLint 9 flat config is straightforward using `eslint-config-prettier`, which disables all ESLint rules that conflict with Prettier. For this monorepo with existing ESLint setup, the recommended approach is:

1. **Install Prettier v3** with exact version pinning
2. **Install eslint-config-prettier** to disable conflicting ESLint rules
3. **Single .prettierrc at root** to share configuration between frontend and backend
4. **Add format scripts** to both package.json files (root and api/)
5. **Match existing conventions** through Prettier options

**Primary recommendation:** Install Prettier v3, configure with project conventions, integrate with ESLint using eslint-config-prettier in flat config, add npm scripts for formatting.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `prettier` | `^3.x.x` | Code formatter | Current stable, opinionated formatting |
| `eslint-config-prettier` | `^9.1.0` | ESLint integration | Disables conflicting ESLint rules |

**Why Prettier v3**: Latest stable version with improved performance and ESM support. The project uses ESM (`"type": "module"`), making v3 the natural choice.

**Why eslint-config-prettier**: Official Prettier package to resolve conflicts. Works with ESLint 9 flat config.

### Installation

```bash
# Root (frontend)
npm install --save-dev --save-exact prettier eslint-config-prettier

# Backend (api/)
npm install --save-dev --save-exact prettier eslint-config-prettier
```

**Note on exact version**: Prettier recommends `--save-exact` to ensure consistent formatting across all developers and CI environments. Even minor version changes can alter formatting.

## Architecture Patterns

### Recommended Project Structure

```
/
├── .prettierrc                # Root config (shared by both packages)
├── .prettierignore            # Files to skip formatting
├── eslint.config.js           # Updated to include eslint-config-prettier
├── package.json               # Add format scripts
└── api/
    ├── package.json           # Add format scripts
    └── (inherits .prettierrc from root)
```

### Configuration Strategy

**Single shared config**: Place `.prettierrc` at project root. Both packages inherit this configuration automatically. This ensures consistent formatting across frontend and backend.

**Why shared config**: Both packages use the same conventions (semicolons, single quotes, 2 spaces, trailing commas). A shared config eliminates duplication and prevents drift.

### Prettier Options to Match Existing Conventions

Based on CONVENTIONS.md and Phase 01 ESLint setup, configure Prettier to match these conventions:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "always",
  "printWidth": 80,
  "endOfLine": "lf"
}
```

**Field explanations**:
- `"semi": true` — Always add semicolons (matches existing code)
- `"singleQuote": true` — Use single quotes for strings (matches existing code)
- `"tabWidth": 2` — 2-space indentation (matches existing code)
- `"trailingComma": "es5"` — Trailing commas where valid in ES5 (objects, arrays)
- `"arrowParens": "always"` — Always parenthesize arrow function params (matches existing code)
- `"printWidth": 80` — Max line length 80 characters (standard default)
- `"endOfLine": "lf"` — Unix-style line endings (standard for git repos)

### ESLint Integration (Flat Config)

Update `eslint.config.js` to disable conflicting rules:

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier'; // ADD THIS

export default [
  // ... existing frontend config ...
  // ... existing backend config ...
  prettierConfig, // ADD THIS at the end
];
```

**Why at the end**: `eslint-config-prettier` must come last in the config array to override all previous configs. It exports an object with `rules` that set conflicting rules to `"off"`.

### .prettierignore File

Create `.prettierignore` to exclude generated files and dependencies:

```
# Dependencies
node_modules/
api/node_modules/

# Build outputs
dist/
build/
coverage/
.next/

# Package files
package-lock.json
api/package-lock.json
yarn.lock
pnpm-lock.yaml

# Prisma (auto-generated)
api/prisma/migrations/

# Git
.git/

# IDE
.vscode/
.idea/
```

### NPM Scripts

Add format scripts to both `package.json` files:

**Root package.json**:
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:frontend": "prettier --write --ignore-path api/ .",
    "format:backend": "prettier --write api/"
  }
}
```

**api/package.json**:
```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

**Script explanations**:
- `format` — Format all files (auto-fix)
- `format:check` — Check if files are formatted (CI-friendly, exits with error if formatting needed)
- `format:frontend` — Format only frontend files
- `format:backend` — Format only backend files

## Common Pitfalls

### Pitfall 1: Prettier and ESLint Fighting

**Problem**: If `eslint-config-prettier` is not added or is not last in the config array, ESLint rules like `quotes`, `semi`, `indent` will conflict with Prettier.

**Solution**: Always place `prettierConfig` last in `eslint.config.js`. Verify with CLI helper: `npx eslint-config-prettier path/to/file.js`

### Pitfall 2: Non-Exact Prettier Version

**Problem**: If Prettier version is not pinned (using `^3.x.x` instead of exact `3.x.x`), different developers or CI environments might use different Prettier versions, causing formatting to change and triggering unnecessary git diffs.

**Solution**: Use `--save-exact` flag during installation. This pins to exact version (e.g., `"prettier": "3.4.2"` instead of `"prettier": "^3.4.2"`).

### Pitfall 3: Formatting Generated Files

**Problem**: Running Prettier on generated files (like `prisma/migrations`, `dist/`, `node_modules/`) is wasteful and can cause issues.

**Solution**: Create comprehensive `.prettierignore` file to exclude generated files.

### Pitfall 4: Not Running Prettier Before Linting

**Problem**: If you run `npm run lint` before formatting, ESLint might report style issues that Prettier would fix automatically. This creates unnecessary noise.

**Solution**: Format code first (`npm run format`), then lint (`npm run lint`). Or run both in sequence: `npm run format && npm run lint`.

### Pitfall 5: Forgetting to Format New Files

**Problem**: New files added to the codebase might not be formatted consistently.

**Solution**: Add pre-commit hooks in Phase 3 (Husky + lint-staged) to automatically format staged files before commit.

## Don't Hand-Roll

**DON'T** write custom formatting rules in ESLint to replace Prettier. Prettier is purpose-built for formatting and does it better.

**DON'T** try to customize Prettier extensively. Prettier is intentionally opinionated with minimal options. The default options are well-thought-out. Only customize to match existing conventions.

**DON'T** configure Prettier differently for frontend vs backend (unless there's a compelling reason). Consistent formatting across the monorepo is valuable.

## Testing Strategy

After setup, verify integration:

1. **Format all files**: `npm run format` (should format all `.ts`, `.tsx`, `.js`, `.json` files)
2. **Check formatting**: `npm run format:check` (should pass if all files formatted)
3. **Verify ESLint integration**: `npx eslint-config-prettier eslint.config.js` (should report no conflicts)
4. **Test from api directory**: `cd api && npm run format` (should work)
5. **Verify git diff**: `git diff` (should show only formatting changes, no functional changes)

## Edge Cases

### TypeScript Import Extensions

Prettier does NOT add or remove `.js` extensions on imports. It preserves them as-written. This means:
- Backend imports still need `.js` extensions (per `moduleResolution: "NodeNext"`)
- Frontend imports remain without extensions (per `moduleResolution: "bundler"`)

Prettier will format the import statement, but won't change the extension:

```ts
// Before Prettier
import { foo } from './bar.js'

// After Prettier (reformatted, extension preserved)
import { foo } from './bar.js';
```

### JSX and TSX Files

Prettier has excellent React/JSX support out of the box. No special configuration needed. It will:
- Format JSX attributes consistently
- Break long JSX expressions across multiple lines
- Preserve React fragments and other JSX syntax

### JSON Files

Prettier formats `.json` files by default. This includes:
- `package.json`
- `tsconfig.json`
- `.prettierrc` itself (if using JSON format)

This is generally good, but be aware that comments in JSON files (like `tsconfig.json`) will be **removed** since JSON doesn't officially support comments.

**Solution**: Use `jsonc` parser for files that need comments:
```json
{
  "overrides": [
    {
      "files": ["tsconfig.json", "tsconfig.*.json"],
      "options": {
        "parser": "jsonc"
      }
    }
  ]
}
```

## Verification Checklist

After Phase 2 completion, verify:

- [ ] `prettier` and `eslint-config-prettier` installed in both packages with exact versions
- [ ] `.prettierrc` exists at root with correct options matching conventions
- [ ] `.prettierignore` exists and excludes generated files
- [ ] `eslint.config.js` includes `prettierConfig` at the end
- [ ] Format scripts work: `npm run format` formats all files
- [ ] Format scripts work from api: `cd api && npm run format`
- [ ] `npx eslint-config-prettier eslint.config.js` reports no conflicts
- [ ] Running `npm run lint` after `npm run format` shows no style-related errors
- [ ] All files formatted consistently (check with `npm run format:check`)

---

**Research complete:** Ready for planning phase
