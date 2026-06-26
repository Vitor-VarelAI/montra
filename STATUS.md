# STATUS - Montra

> Copia local. A fonte canonica de estado vive no Atlas vault, como nos outros projetos.

## Feito

- PRD fechado em `docs/PRD.md`.
- Esqueleto do repo criado com docs, regras e plano inicial.
- Contrato da pasta de lead documentado em `leads/_example/`.
- Arquitetura documentada em `docs/ARCHITECTURE.md`.
- Trio fixo de slots definido:
  1. Minimalista Premium.
  2. Editorial de Marca.
  3. Conversao Direta.
- `DESIGN.md` criado como indice canonico dos 3 estilos (`@google/design.md`).
- Contratos ricos por slot criados em `design/slot-1.md`, `design/slot-2.md`, `design/slot-3.md`.
- Regras v1 definidas em `rules/global.md` e `rules/slots/slot-1..3.md`.
- Referencias antigas estacionadas em `rules/slots/_parked/`.
- UI de regras implementada: regra global, regra por slot e prompt especifico por janela.
- Export por slot inclui HTML, design system, contrato visual, regras, skills, prompt e assets.
- Fotos via fal/GPT Image 2 implementadas para melhorar fotos reais por slot.
- Skills de prompt por slot implementadas:
  - slot 2 usa `storybrand`.
  - slot 3 usa `copywriter`.
- Design systems ja nao copiam o site original. O URL serve para conteudo, imagens e pistas fracas de marca; o trio Montra manda na direcao visual.
- Leads existentes migrados em runtime para 3 design systems distintos.
- Cloudflare quick tunnel ativo para preview:
  `https://investigation-cottage-classes-suggest.trycloudflare.com`

## A Seguir

- Testar novas geracoes/regeneracoes depois da mudanca de design systems.
- Afinar receitas de foto por slot, inspiradas em referencias tipo Nano Banana, sem deixar a foto fugir do negocio real.
- Se o quick tunnel cair, recriar tunnel para `http://localhost:3010`.
- Commit/push desta leva fecha a mudanca de skills por slot e design systems Montra-first.
