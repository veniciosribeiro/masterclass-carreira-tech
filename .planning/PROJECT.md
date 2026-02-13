# TechCareer Test Drive

## What This Is

Plataforma web de teste vocacional para carreiras em tecnologia. Um SPA React com backend Fastify que autentica usuarios por email (whitelist), aplica um teste de aptidao avaliando 3 pilares (Areas Tecnicas, Comportamental) para determinar 1 de 7 perfis tech, e gera um relatorio PDF com os resultados.

## Core Value

Usuarios autorizados completam o teste vocacional e recebem um perfil tech personalizado com relatorio PDF — esse fluxo deve funcionar de ponta a ponta sem friccao.

## Requirements

### Validated

- ✓ Autenticacao por email whitelist com JWT — existing
- ✓ Fluxo completo de teste vocacional (welcome → questoes → resultados) — existing
- ✓ Dois tipos de questoes: multipla escolha e ordenacao — existing
- ✓ Calculo de score por 3 pilares (Areas Tecnicas 70%, Comportamental 30%) — existing
- ✓ Determinacao de 1 de 7 perfis tech baseado nos scores — existing
- ✓ Geracao de relatorio PDF client-side com jsPDF — existing
- ✓ Persistencia de sessao e respostas no PostgreSQL via Prisma — existing
- ✓ Landing pages V1 e V2 com lazy loading — existing
- ✓ Deploy containerizado com Docker Compose + Nginx — existing
- ✓ API com validacao TypeBox e rotas protegidas por JWT — existing

### Active

(Nenhum novo requisito definido ainda — projeto em fase de melhorias de DX)

### Out of Scope

- Testes automatizados (framework nao configurado ainda)
- Mobile app nativo
- Internacionalizacao (UI apenas em pt-BR)

## Context

- Projeto brownfield funcional em producao
- Monorepo com frontend React 19 / Vite 6 / Tailwind v4 na raiz e backend Fastify 5 em `api/`
- Ambos usam ESM (`"type": "module"`)
- Backend usa `moduleResolution: "NodeNext"` (extensoes `.js` obrigatorias)
- Frontend usa `moduleResolution: "bundler"` (sem extensoes)
- Nenhum linter ou formatter configurado — dependendo de defaults de IDE
- Convencoes de codigo existentes: semicolons, single quotes, 2 espacos, trailing commas

## Constraints

- **Stack**: React 19, Fastify 5, Prisma 6, Vite 6, Tailwind v4 — manter stack existente
- **Idioma UI**: Portugues brasileiro
- **Modulos**: ESM em ambos os pacotes
- **DB**: PostgreSQL acessado apenas pelo backend

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Monorepo sem workspaces npm | Simplicidade — frontend na raiz, backend em api/ | — Pending |
| ESM everywhere | Alinhamento com Node.js moderno | ✓ Good |
| Sem framework de testes | Velocidade inicial de entrega | ⚠️ Revisit |
| Sem linter/formatter | Velocidade inicial, agora precisa ser adicionado | ⚠️ Revisit |

---
*Last updated: 2026-02-13 after initialization*
