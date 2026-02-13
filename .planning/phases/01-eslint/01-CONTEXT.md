# Phase 1: ESLint - Context

**Gathered:** 2026-02-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Configure ESLint for both frontend (React 19/TypeScript/Vite) and backend (Fastify 5/TypeScript/Node ESM) to provide immediate feedback on code quality issues. ESLint must understand TypeScript + React JSX in frontend, and TypeScript + Node/ESM in backend. Rules must respect existing conventions (semicolons, single quotes, 2 spaces, trailing commas).

</domain>

<decisions>
## Implementation Decisions

### Estrategia para codigo legado

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

</decisions>

<specifics>
## Specific Ideas

- O projeto usa ESM (`"type": "module"`) em ambos os pacotes
- Backend usa `moduleResolution: "NodeNext"` — imports devem ter extensao `.js`
- Frontend usa `moduleResolution: "bundler"` — imports sem extensao
- Convencoes existentes: semicolons, single quotes, 2 espacos, trailing commas, arrow params sempre com parenteses
- STATE.md menciona: "Existing code may have many lint violations — plan should address baseline cleanup strategy" ✓ (enderecado)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 01-eslint_
_Context gathered: 2026-02-13_
