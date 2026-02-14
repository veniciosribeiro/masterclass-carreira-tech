# Phase 4: CI Pipeline - Research

**Researched:** 2026-02-14
**Domain:** GitHub Actions CI for Node.js monorepo with ESLint and TypeScript validation
**Confidence:** HIGH

## Summary

GitHub Actions is the standard CI/CD platform for GitHub-hosted projects with first-class Node.js support. For this monorepo project, we need a workflow that validates code quality (ESLint) and type safety (TypeScript) across both frontend and backend packages on every push and pull request.

The project uses a monorepo structure with:

- **Root package**: Frontend (React + Vite, `moduleResolution: bundler`, no import extensions)
- **api/ package**: Backend (Fastify, `moduleResolution: NodeNext`, `.js` extensions required)
- **Unified ESLint config**: Single `eslint.config.js` at root with package-specific rules
- **Separate TypeScript configs**: Different compiler options for frontend vs backend

The CI pipeline must run both lint and type-check operations for both packages, fail fast with clear error messages, and cache dependencies for performance.

**Primary recommendation:** Create a single GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on push and pull_request events, sets up Node.js 20.x with npm caching, installs dependencies for both packages, and runs parallel lint and type-check jobs for clear failure reporting.

## Standard Stack

### Core

| Library               | Version | Purpose                        | Why Standard                                                                         |
| --------------------- | ------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| GitHub Actions        | Native  | CI/CD platform                 | Built into GitHub, zero configuration for GitHub-hosted repos, free for public repos |
| actions/checkout@v4   | v4      | Check out repository code      | Official GitHub action, required for all workflows                                   |
| actions/setup-node@v4 | v4      | Install Node.js and cache deps | Official GitHub action, handles version management and npm/yarn/pnpm caching         |

### Supporting

| Library              | Version | Purpose           | When to Use                                             |
| -------------------- | ------- | ----------------- | ------------------------------------------------------- |
| ubuntu-latest runner | Latest  | Linux environment | Default for Node.js CI, fastest and most cost-effective |
| Node.js 20.x         | 20.x    | Runtime version   | Matches project's Node.js v20.20.0 (see AGENTS.md)      |

### Alternatives Considered

| Instead of     | Could Use                    | Tradeoff                                                                                |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------- |
| GitHub Actions | CircleCI, GitLab CI, Travis  | GitHub Actions has better integration, simpler setup, free for public repos             |
| ubuntu-latest  | windows-latest, macos-latest | Only needed for platform-specific issues; Linux is faster and cheaper                   |
| Single job     | Matrix strategy              | Matrix useful for testing multiple Node versions; not needed here (single version 20.x) |

**Installation:**

```bash
# No npm packages to install - GitHub Actions is platform-native
# Workflow files live in .github/workflows/ directory
mkdir -p .github/workflows
```

## Architecture Patterns

### Recommended Project Structure

```
.github/
├── workflows/
│   └── ci.yml          # Main CI workflow
```

### Pattern 1: Monorepo Validation Workflow

**What:** Single workflow with multiple jobs running in parallel for each validation type
**When to use:** When you need fast feedback and clear separation of concerns (lint failures vs type errors)
**Example:**

```yaml
# Source: GitHub Actions official docs + Node.js monorepo best practices
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      - name: Install dependencies (root)
        run: npm ci
      - name: Install dependencies (api)
        run: npm ci --prefix api
      - name: Run ESLint
        run: npm run lint

  typecheck:
    name: TypeScript
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      - name: Install dependencies (root)
        run: npm ci
      - name: Install dependencies (api)
        run: npm ci --prefix api
      - name: Type-check frontend
        run: npx tsc --noEmit
      - name: Type-check backend
        run: npm run build --workspace=api
```

### Pattern 2: Trigger Events Configuration

**What:** Configure workflow to run on pushes to main branches and all pull requests
**When to use:** Standard CI pattern - catch issues before merge, validate all PRs
**Example:**

```yaml
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
```

### Pattern 3: Dependency Caching

**What:** Use `setup-node` built-in caching to avoid reinstalling dependencies on every run
**When to use:** Always - dramatically speeds up CI runs (2-5 minutes → 30 seconds)
**Example:**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm' # Automatically caches node_modules based on package-lock.json hash
```

### Anti-Patterns to Avoid

- **Manual caching with actions/cache:** `setup-node` has built-in caching support since v2; use `cache: 'npm'` instead
- **Installing devDependencies separately:** Use `npm ci` which installs all deps (including dev) from lockfile
- **Matrix testing single version:** Matrix strategy (`node: [18, 20, 22]`) is overkill when project uses single version
- **Combining lint + typecheck in one job:** Separate jobs provide clearer failure feedback and can run in parallel

## Don't Hand-Roll

| Problem                          | Don't Build                                      | Use Instead                             | Why                                                                                                             |
| -------------------------------- | ------------------------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Node.js installation             | Custom Node.js download script                   | `actions/setup-node@v4`                 | Handles version resolution, PATH setup, and caching; supports version files (.nvmrc, package.json engines)      |
| Dependency caching               | Custom cache key generation with `actions/cache` | `setup-node` with `cache: 'npm'`        | Automatically handles cache key from package-lock.json; understands npm/yarn/pnpm lockfiles                     |
| Monorepo dependency installation | Custom workspace installation script             | `npm ci` (root) + `npm ci --prefix api` | Standard npm commands handle lockfiles correctly; `npm ci` is faster and more reliable than `npm install`       |
| Failed step reporting            | Custom error formatting                          | Native GitHub Actions failure output    | GitHub Actions automatically annotates code with errors from ESLint and TypeScript; no custom formatting needed |

**Key insight:** GitHub Actions and setup-node are purpose-built for Node.js CI. They handle edge cases like lockfile changes, cache invalidation, and parallel job coordination automatically.

## Common Pitfalls

### Pitfall 1: Missing `npm ci --prefix api` for Backend Dependencies

**What goes wrong:** CI fails with "Cannot find module" errors from api/ package even though frontend works
**Why it happens:** Root `npm ci` only installs root package.json dependencies; api/ has its own package.json
**How to avoid:** Always run `npm ci` in root AND `npm ci --prefix api` (or `cd api && npm ci`)
**Warning signs:** Local dev works, CI fails; errors mention files/modules in api/src/

### Pitfall 2: Using `npm install` Instead of `npm ci`

**What goes wrong:** CI runs pass but lockfile gets modified; inconsistent dependency versions
**Why it happens:** `npm install` updates lockfile when package.json ranges allow; `npm ci` enforces exact lockfile versions
**How to avoid:** Always use `npm ci` in CI environments (faster, deterministic, fails if lockfile is out of sync)
**Warning signs:** Lockfile changes appear in commits without package.json changes; CI is slow

### Pitfall 3: Not Caching Dependencies

**What goes wrong:** Every CI run takes 2-5 minutes just installing dependencies
**Why it happens:** Forgetting to add `cache: 'npm'` to setup-node action
**How to avoid:** Always include `cache: 'npm'` in setup-node action; verify cache is working in Actions logs
**Warning signs:** "Installing dependencies" step takes >1 minute every run; no "Cache restored" message in logs

### Pitfall 4: Running TypeScript Build Instead of Type-Check

**What goes wrong:** CI runs `npm run build` which generates unnecessary output files; slower CI times
**Why it happens:** Confusion between "validating types" and "compiling TypeScript"
**How to avoid:** Use `tsc --noEmit` for frontend (no build step), `npm run build` for backend (needs compilation); understand project's tsconfig.json `noEmit` settings
**Warning signs:** CI artifacts contain dist/ folders; CI takes longer than necessary

### Pitfall 5: Forgetting Permissions for Checkout

**What goes wrong:** CI fails with "Permission denied" on git operations
**Why it happens:** Default GITHUB_TOKEN has read-only permissions in some org settings
**How to avoid:** Add `permissions: contents: read` to workflow or job level
**Warning signs:** "Error: Resource not accessible by integration" in checkout step

## Code Examples

Verified patterns from official sources:

### Complete Monorepo CI Workflow

```yaml
# Source: GitHub Actions official docs + Node.js tutorial
# File: .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

permissions:
  contents: read

jobs:
  lint:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install root dependencies
        run: npm ci

      - name: Install API dependencies
        run: npm ci --prefix api

      - name: Run ESLint on all files
        run: npm run lint

  typecheck:
    name: TypeScript Type-Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install root dependencies
        run: npm ci

      - name: Install API dependencies
        run: npm ci --prefix api

      - name: Type-check frontend
        run: npx tsc --noEmit

      - name: Type-check backend (with build)
        run: npm run build --workspace=api
```

### Minimal Workflow (Combined Validation)

```yaml
# Source: GitHub Actions Node.js quickstart
# Alternative: Single job if parallel execution not needed
name: CI

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      - run: npm ci
      - run: npm ci --prefix api
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build --workspace=api
```

## State of the Art

| Old Approach                    | Current Approach             | When Changed           | Impact                                                                           |
| ------------------------------- | ---------------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| actions/setup-node@v2           | actions/setup-node@v4        | v3 (2022), v4 (2023)   | v3+ has built-in caching; v4 adds Node 16+ support and better lockfile detection |
| Manual cache with actions/cache | `cache: 'npm'` in setup-node | 2022 (v3)              | Simpler config, automatic cache key generation                                   |
| npm install                     | npm ci                       | Always (best practice) | CI-specific command; faster, deterministic, fails on lockfile mismatch           |
| Matrix strategy for monorepos   | Separate jobs per package    | Ongoing                | Better error visibility; matrix better for multi-version testing                 |

**Deprecated/outdated:**

- **actions/setup-node@v1-v2**: Use v4 (v1-v2 lack built-in caching)
- **Manual Node.js installation**: Always use setup-node action
- **ubuntu-18.04 runner**: Deprecated; use ubuntu-latest (currently 22.04)

## Open Questions

1. **Should we add a build verification step for frontend?**
   - What we know: Frontend has `npm run build` script; backend build is part of type-check
   - What's unclear: Whether frontend build should be validated in CI (currently no build artifacts used)
   - Recommendation: Add `npm run build` for frontend if build artifacts are deployed; skip if only dev server is used

2. **Should we separate frontend and backend validation into separate jobs?**
   - What we know: Current workflow has lint + typecheck jobs; could further split by package
   - What's unclear: Whether granular job separation provides enough value vs complexity
   - Recommendation: Start with lint/typecheck separation (clearer failure types); consider package separation if frontend/backend teams work independently

3. **Should we add status badge to README?**
   - What we know: GitHub Actions supports status badges showing CI pass/fail
   - What's unclear: Whether project wants visible CI status
   - Recommendation: Add badge after first successful CI run; format: `[![CI](https://github.com/USER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/USER/REPO/actions/workflows/ci.yml)`

## Sources

### Primary (HIGH confidence)

- GitHub Actions Quickstart - https://docs.github.com/en/actions/get-started/quickstart (Official docs, 2026)
- Workflow syntax for GitHub Actions - https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax (Official docs, 2026)
- Building and testing Node.js - https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs (Official tutorial, 2026)
- actions/setup-node - https://github.com/actions/setup-node (Official action README, latest v4.2.0 released Jan 2026)

### Secondary (MEDIUM confidence)

- Project AGENTS.md - confirms Node.js v20.20.0, monorepo structure, script names
- Project package.json files - confirms npm scripts, dependencies, ESLint configuration
- Project tsconfig.json files - confirms TypeScript compiler options, noEmit settings

### Tertiary (LOW confidence)

- None - all findings verified with official GitHub documentation

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - GitHub Actions is official GitHub CI/CD; setup-node is official action
- Architecture: HIGH - Patterns verified in official GitHub docs and tutorials
- Pitfalls: HIGH - Based on official documentation warnings + common Node.js CI issues

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days - GitHub Actions is stable; Node.js ecosystem is mature)
