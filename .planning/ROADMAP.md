# Roadmap: TechCareer Test Drive

## Overview

This milestone transforms TechCareer Test Drive from a functional-but-fragile brownfield app into a professionally-tooled project with automated quality gates and a key user-facing feature. The first four phases establish developer experience infrastructure (linting, formatting, git hooks, CI), each building on the previous. The final phase delivers email notifications so users receive their test results without friction.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: ESLint** - Lint rules configured for both frontend and backend
- [ ] **Phase 2: Prettier + Integration** - Auto-formatting and lint/format scripts without conflicts
- [ ] **Phase 3: Git Hooks** - Pre-commit enforcement via Husky and lint-staged
- [ ] **Phase 4: CI Pipeline** - Automated lint and type-check on every push/PR
- [ ] **Phase 5: Email Results** - Users receive test results via email after completing the test

## Phase Details

### Phase 1: ESLint

**Goal**: Developers get immediate feedback on code quality issues in both frontend and backend
**Depends on**: Nothing (first phase)
**Requirements**: DX-01, DX-02
**Success Criteria** (what must be TRUE):

1. Running ESLint on the frontend codebase reports real issues or passes clean (no config errors)
2. Running ESLint on the backend codebase reports real issues or passes clean (no config errors)
3. ESLint rules respect existing conventions (semicolons, single quotes, 2 spaces)
4. ESLint understands TypeScript and React JSX in frontend, TypeScript and Node/ESM in backend
   **Plans**: 3 plans in 1 wave

Plans:

- [x] 01-01-PLAN.md — Install ESLint 9 dependencies and create root flat config for monorepo
- [x] 01-02-PLAN.md — Auto-fix violations and manually resolve remaining errors to achieve zero
- [ ] 01-03-PLAN.md — Fix backend tsconfig path for CWD-independent linting (gap closure)

### Phase 2: Prettier + Integration

**Goal**: Code formatting is automated and consistent, with no conflicts between linter and formatter
**Depends on**: Phase 1
**Requirements**: DX-03, DX-04, DX-07
**Success Criteria** (what must be TRUE):

1. Running Prettier formats files according to project conventions (semicolons, single quotes, 2 spaces, trailing commas)
2. ESLint and Prettier never disagree on the same file — no conflicting rules
3. `npm run lint` and `npm run format` scripts work from root and from api/ directory
   **Plans**: 1 plan in 1 wave

Plans:

- [ ] 02-01-PLAN.md — Install Prettier, configure, integrate with ESLint, format codebase

### Phase 3: Git Hooks

**Goal**: Code quality is enforced automatically before every commit — no bad code reaches the repo
**Depends on**: Phase 2
**Requirements**: DX-05, DX-06
**Success Criteria** (what must be TRUE):

1. Committing triggers a pre-commit hook that runs lint and format checks
2. Only staged/modified files are checked (not the entire codebase)
3. A commit with lint errors is blocked until errors are fixed
   **Plans**: TBD

Plans:

- [ ] 03-01: Install Husky and configure lint-staged

### Phase 4: CI Pipeline

**Goal**: Every push and pull request is automatically validated — broken code cannot be merged silently
**Depends on**: Phase 3
**Requirements**: CI-01, CI-02, CI-03
**Success Criteria** (what must be TRUE):

1. Pushing to any branch or opening a PR triggers a CI pipeline
2. CI runs ESLint on all files in both frontend and backend
3. CI runs TypeScript type-check (tsc --noEmit) on both frontend and backend
4. When lint or type-check fails, the CI run fails with clear error output showing what's wrong
   **Plans**: 1 plan in 1 wave

Plans:

- [ ] 04-01-PLAN.md — Create GitHub Actions CI workflow with lint and type-check jobs

### Phase 5: Email Results

**Goal**: Users receive their test results via email immediately after completing the vocational test
**Depends on**: Phase 1 (linting/CI are DX concerns, email is independent feature — only needs working codebase)
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03
**Success Criteria** (what must be TRUE):

1. After completing the test, the user receives an email at the address they authenticated with
2. The email contains a summary of their identified tech profile (e.g., "Fullstack Developer")
3. The email contains a clickable link that takes them to their full results report
   **Plans**: TBD

Plans:

- [ ] 05-01: Implement email sending infrastructure on backend
- [ ] 05-02: Build email template and integrate with test completion flow

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase                     | Plans Complete | Status      | Completed |
| ------------------------- | -------------- | ----------- | --------- |
| 1. ESLint                 | 1/2            | In progress | -         |
| 2. Prettier + Integration | 0/1            | Not started | -         |
| 3. Git Hooks              | 0/1            | Not started | -         |
| 4. CI Pipeline            | 0/1            | Not started | -         |
| 5. Email Results          | 0/2            | Not started | -         |

### Phase 6: Adicionar botão de Receber por E-mail na página de resultados de testes

**Goal:** Botão de resultados dispara envio por e-mail sem erro de rota (POST /api/send-results/:sessionId)
**Depends on:** Phase 5
**Plans:** 2 plans

Plans:

- [x] 06-01-PLAN.md — Adicionar botão "Receber por E-mail" na tela de resultados e integrar com endpoint existente
- [ ] 06-02-PLAN.md — Corrigir mismatch de rota no backend (remover segmento duplicado /send-results)
