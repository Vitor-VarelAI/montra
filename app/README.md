# app/ — código da aplicação

Vazio de propósito. O **código a sério é construído pelo Hermes**
(GPT-5.5 autor, DeepSeek arquitetura) — PRD §10. Claude Code entregou só a
estrutura, os `.md` e o plano.

A estrutura interna desta pasta (frontend Next.js + backend/pipeline) é decisão
do **arquiteto (DeepSeek)**. Construir a partir de:

- `docs/ARCHITECTURE.md` — pipeline, contratos, integrações.
- `docs/PRD.md` — produto e escopo.
- `rules/` — regras que alimentam a geração (lidas do disco em runtime).

Contratos a respeitar (não negociáveis, vêm do PRD):
- Frontend clone do Recast: grid 3×1, creme, atalhos 1-3, loading simples, sem streaming.
- Geração por janela = design system + `rules/global.md` + `rules/slots/slot-N.md` + `rules/skills/*.md` (+ prompt do Vitor ao regenerar uma).
- Persistência = pasta por lead (`leads/<slug>/`, ver `leads/_example/`).
