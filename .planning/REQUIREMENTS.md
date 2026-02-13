# Requirements: TechCareer Test Drive

**Defined:** 2026-02-13
**Core Value:** Usuarios autorizados completam o teste vocacional e recebem um perfil tech personalizado com relatorio PDF

## v1 Requirements

Requirements para a proxima milestone. Cada um mapeia a fases do roadmap.

### Developer Experience

- [ ] **DX-01**: Projeto tem ESLint configurado no frontend com regras TypeScript e React
- [ ] **DX-02**: Projeto tem ESLint configurado no backend com regras TypeScript e Node/ESM
- [ ] **DX-03**: Prettier configurado para formatacao automatica consistente em ambos os pacotes
- [ ] **DX-04**: ESLint e Prettier integrados (sem conflitos entre regras)
- [ ] **DX-05**: Husky instalado com pre-commit hook que roda lint-staged
- [ ] **DX-06**: lint-staged configurado para rodar ESLint e Prettier nos arquivos modificados
- [ ] **DX-07**: Scripts npm `lint` e `format` disponiveis na raiz e em api/

### CI/CD

- [ ] **CI-01**: Pipeline CI roda lint em todos os arquivos a cada push/PR
- [ ] **CI-02**: Pipeline CI roda type-check (tsc --noEmit) em ambos os pacotes
- [ ] **CI-03**: Pipeline CI falha e reporta erros de forma clara

### Email

- [ ] **EMAIL-01**: Usuario recebe email com resultados do teste apos completar
- [ ] **EMAIL-02**: Email contem resumo do perfil tech identificado
- [ ] **EMAIL-03**: Email contem link para acessar relatorio completo

## v2 Requirements

Deferidos para release futuro.

### Testing

- **TEST-01**: Vitest configurado no frontend com suporte a React Testing Library
- **TEST-02**: Vitest configurado no backend com suporte a testes de integracao
- **TEST-03**: Pipeline CI roda testes automaticamente

### Admin

- **ADMIN-01**: Painel administrativo para visualizar resultados de todos os usuarios
- **ADMIN-02**: Dashboard com metricas agregadas dos testes

## Out of Scope

| Feature | Reason |
|---------|--------|
| Mobile app nativo | Web-first, sem necessidade atual |
| Internacionalizacao | UI apenas em pt-BR, publico brasileiro |
| Novas landing pages | Foco atual em DX e funcionalidades |
| Novos tipos de pergunta | Teste atual funciona bem |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DX-01 | - | Pending |
| DX-02 | - | Pending |
| DX-03 | - | Pending |
| DX-04 | - | Pending |
| DX-05 | - | Pending |
| DX-06 | - | Pending |
| DX-07 | - | Pending |
| CI-01 | - | Pending |
| CI-02 | - | Pending |
| CI-03 | - | Pending |
| EMAIL-01 | - | Pending |
| EMAIL-02 | - | Pending |
| EMAIL-03 | - | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 0
- Unmapped: 13

---
*Requirements defined: 2026-02-13*
*Last updated: 2026-02-13 after initial definition*
