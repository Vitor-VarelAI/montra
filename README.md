# Prisma

Maquina de demos de redesign para outbound. Metes o URL de um site, devolve
**6 versoes redesenhadas**, cada uma num estilo diferente. Objetivo: o golpe de
vista, o lead para a primeira e pensa "e isto que eu quero".

Ferramenta interna da VVarelAI. Operador unico (Vitor). Corre no VPS Contabo
(headless), acesso via tunel Cloudflare.

> Uma entrada (URL), seis saidas (versoes). Alinha com Lume, Hermes, Atlas.

## Como funciona

```text
URL -> FireCrawl (conteudo + imagens + design system + screenshot)
    -> Vista de design system (aprovar/ajustar)
    -> GLM-5.2 gera as 6 versoes [design system + regra global + regra de slot]
    -> Grid 3x2 (atalhos 1-6)
    -> GPT Image 2 (fal) melhora as fotos
    -> Pasta por lead no disco + screenshot do grid no dashboard
```

O detalhe completo esta em [`docs/PRD.md`](docs/PRD.md). O plano de construcao
esta em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Contrato de design

[`DESIGN.md`](DESIGN.md) e o contrato canonico dos 6 estilos. Usa o formato
`@google/design.md`: tokens em YAML no topo, racional em Markdown por baixo.
As regras em `rules/` continuam a ser a camada de prompt; `DESIGN.md` define o
vocabulario visual que essas regras devem respeitar.

## Estrutura do repo

| Pasta | O que e |
|---|---|
| `DESIGN.md` | Contrato visual dos 6 estilos e tokens de UI. |
| `docs/` | PRD canonico, arquitetura, custos. |
| `rules/` | `global.md` + `slots/slot-1..6.md`. Ficheiros como interface. |
| `leads/` | Persistencia. Uma pasta por lead, runtime fora do git. |
| `app/` | Codigo da app, frontend e backend. |

## Divisao de trabalho

- **Claude Code:** estrutura, `.md`, plano.
- **Hermes:** codigo serio, GPT-5.5 autor, DeepSeek arquitetura.
- Regra mantida: nunca o mesmo modelo autor e revisor.

PT-PT em tudo.
