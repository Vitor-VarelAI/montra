# STATUS — Montra

> Cópia local. A fonte canónica de estado vive no Atlas vault, como os outros projetos.

**Fase atual:** scaffold criado. À espera de construção do código (Hermes).
**Última atualização:** 2026-06-26.

## Feito
- [x] PRD fechado (`docs/PRD.md`).
- [x] Esqueleto do repo (estrutura, `.md`, plano) — Claude Code.
- [x] Contrato da pasta de lead documentado (`leads/_example/`).
- [x] Plano de arquitetura para o Hermes (`docs/ARCHITECTURE.md`).
- [x] Regras v1 definidas (global + 3 slots).
- [x] `DESIGN.md` criado como contrato canónico (agora índice dos 3 estilos do trio, `@google/design.md`).
- [x] `DESIGN.md` ligado ao prompt de geração por slot.
- [x] UI de regras: regra global, regra por slot e prompt específico por janela.
- [x] Export por slot: HTML + design system + contrato visual + regras + prompt.
- [x] Fotos via fal/GPT Image 2: melhora fotos reais do slot, guarda assets e atualiza HTML.

## A seguir
- [ ] Hermes constrói a app (`app/`): GPT-5.5 autor, DeepSeek arquitetura.
- [ ] Frontend clone do Recast (grid 3×1, creme, atalhos 1-3).
- [ ] Pipeline completo em volume: FireCrawl → design system → GLM-5.2 → fal.
- [ ] Ajustar custo/qualidade alvo das fotos por lead.

## Pendentes antes de correr em volume (PRD §12)
1. [ ] Decidir comportamento perante o delegation-gate (PRD §8).
2. [ ] Confirmar qualidade/custo das fotos por geração (PRD §7).

## Decisões em aberto (não bloqueiam v1)
- ~~Delegation-gate~~ — resolvido: a app chama o OpenCode Zen direto, não passa pelo Hermes em runtime (PRD §8).
