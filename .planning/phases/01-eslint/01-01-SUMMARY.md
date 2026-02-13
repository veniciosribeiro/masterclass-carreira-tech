---
phase: 01-eslint
plan: 01
subsystem: tooling
tags: [eslint, typescript-eslint, linting, code-quality, monorepo]

# Dependency graph
requires:
  - phase: none
    provides: Existing TypeScript monorepo structure
provides:
  - ESLint 9 flat config infrastructure
  - Lint scripts in both root and api packages
  - TypeScript + React linting rules for frontend
  - TypeScript + Node linting rules for backend
  - Import extension validation (bundler vs NodeNext)
affects: [02-prettier, 03-git-hooks, 04-ci]

# Tech tracking
tech-stack:
  added: [eslint@^9.39.2, typescript-eslint@^8.55.0, eslint-plugin-react@^7.37.5, eslint-plugin-react-hooks@^5.2.0, eslint-plugin-import@^2.32.0, eslint-import-resolver-typescript@^3.10.1, globals@^15.15.0]
  patterns: [ESLint flat config, cascading monorepo configuration, module resolution aware linting]

key-files:
  created: [eslint.config.js]
  modified: [package.json, api/package.json, package-lock.json, api/package-lock.json]

key-decisions:
  - "Used ESLint 9 flat config format (single root eslint.config.js) instead of legacy .eslintrc"
  - "Installed ESLint binary in both packages for editor support while using unified config"
  - "Frontend: no import extensions (moduleResolution: bundler)"
  - "Backend: .js extensions required (moduleResolution: NodeNext)"
  - "Backend uses stricter rules (no-explicit-any: error vs warn)"

patterns-established:
  - "Cascading monorepo config: single root config with frontend/backend objects"
  - "Module resolution awareness: different import/extensions rules for bundler vs NodeNext"
  - "Workspace-level and package-level lint scripts for flexibility"

# Metrics
duration: 8 min
completed: 2026-02-13
---

# Phase 01 Plan 01: ESLint Setup Summary

**ESLint 9 flat config with TypeScript support for React frontend and Fastify backend, enforcing existing code conventions and handling module resolution differences**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-13T14:53:00Z
- **Completed:** 2026-02-13T15:01:53Z
- **Tasks:** 3
- **Files modified:** 5

## Accomplishments

- Installed ESLint 9 and all required plugins in both root and api packages
- Created unified flat config that handles frontend React/JSX and backend Node/ESM
- Added lint scripts to enable `npm run lint` from either package
- Configured frontend with no import extensions (bundler) and backend with .js extensions (NodeNext)
- Enforced existing conventions: semicolons, single quotes, 2-space indent, trailing commas, arrow parens

## Task Commits

Each task was committed atomically:

1. **Task 1: Install ESLint dependencies in both packages** - `b6d9cac` (chore)
2. **Task 2: Create root eslint.config.js with cascading monorepo config** - `5b2240e` (feat)
3. **Task 3: Add lint scripts to package.json files** - `2d2f2e1` (feat)

## Files Created/Modified

- `eslint.config.js` - ESLint 9 flat config with separate frontend/backend rules
- `package.json` - Added ESLint dependencies and lint scripts (lint, lint:fix, lint:frontend, lint:backend)
- `api/package.json` - Added ESLint dependencies and lint scripts (lint, lint:fix)
- `package-lock.json` - Updated with 330 new packages
- `api/package-lock.json` - Created with 227 new packages

## Decisions Made

**ESLint 9 flat config format:** Chose modern flat config (eslint.config.js) over legacy .eslintrc format. Flat config is the future-proof standard as of ESLint 9 and provides better TypeScript integration.

**Dual ESLint installation:** Installed ESLint binary in both root and api packages (not just root) to ensure editor integrations work correctly when editing files in either location. Config remains unified at root.

**Module resolution split:** Frontend uses `import/extensions: never` (Vite bundler with moduleResolution: bundler) while backend uses `import/extensions: always` for .js (Node ESM with moduleResolution: NodeNext). This matches the existing TypeScript configuration and prevents false positives.

**Stricter backend rules:** Backend uses `no-explicit-any: error` instead of `warn` because backend code benefits from strict typing for API contracts and database interactions.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all dependencies installed successfully, config loads without errors, scripts execute correctly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

ESLint infrastructure is complete and operational. The codebase currently has lint violations (as expected for brownfield setup):
- Missing trailing commas in some files
- Missing .js extensions in backend imports
- Other code style inconsistencies

**Ready for 01-02:** The next plan will address these violations through auto-fixing and manual corrections.

## Self-Check: PASSED

✓ `eslint.config.js` exists and loads successfully
✓ `node_modules/eslint` present in root
✓ `api/node_modules/eslint` present in backend
✓ Commits verified: b6d9cac, 5b2240e, 2d2f2e1
✓ `npm run lint` executes ESLint and reports violations
✓ Frontend and backend rules correctly separated in config

---
*Phase: 01-eslint*
*Completed: 2026-02-13*
