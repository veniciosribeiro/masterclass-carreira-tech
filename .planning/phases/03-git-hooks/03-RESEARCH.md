# Research: Phase 3 - Git Hooks

**Goal:** Implement automated code quality enforcement using Git hooks (Husky + lint-staged).

## Analysis

### Requirements

- **DX-05**: Husky installed with pre-commit hook.
- **DX-06**: lint-staged configured for modified files.
- **Constraints**:
  - Must work in monorepo structure (root + api).
  - Must use exiting ESLint/Prettier configs.
  - Must not block valid commits (flaky checks).

### Implementation Details

- **Husky v9**:
  - Simplified config (no `.huskyrc`).
  - `npx husky init` creates `.husky` dir and adds `prepare` script.
  - Hook path: `.husky/pre-commit`.
- **lint-staged**:
  - Config in `package.json` is simplest.
  - Pattern: `*.{js,jsx,ts,tsx}` -> `eslint --fix`, `prettier --write`.
  - Pattern: `*.{json,md,yml,css}` -> `prettier --write`.

### Potential Pitfalls

- **Monorepo paths**: `lint-staged` runs from root. ESLint config at root is set up to handle this (cascading config), so `eslint .` works. checking specific files passed by lint-staged should also work.
- **CI environment**: Husky install should not break in CI if not needed, but `npm install` usually runs `prepare`. In CI we might want to disable hooks or ensure they run fast. For now, standard install is fine.

### Plan Strategy

1. Install dependencies (Husky, lint-staged).
2. Configure `lint-staged` in `package.json`.
3. Set up `pre-commit` hook to run `npx lint-staged`.
4. Verify by attempting a commit (simulated in verification).
