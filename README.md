# Montra

Maquina de demos de redesign para outbound. Metes o URL de um site, devolve
**3 versoes redesenhadas**, cada uma num estilo diferente. Objetivo: o golpe de
vista, o lead para a primeira e pensa "e isto que eu quero".

Ferramenta interna da VVarelAI. Operador unico (Vitor). Corre no VPS Contabo
(headless), acesso via tunel Cloudflare.

> Uma entrada (URL), tres saidas (versoes). Alinha com Lume, Hermes, Atlas.

## Como funciona

```text
URL -> FireCrawl (conteudo + imagens + pistas fracas de marca + screenshot)
    -> Vista dos 3 design systems Montra (aprovar/ajustar)
    -> GLM-5.2 gera as 3 versoes [design system Montra + regra global + regra de slot + skills do slot]
    -> Grid 3x1 (atalhos 1-3)
    -> GPT Image 2 (fal) melhora as fotos
    -> Pasta por lead no disco + screenshot do grid no dashboard
```

O detalhe completo esta em [`docs/PRD.md`](docs/PRD.md). O plano de construcao
esta em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Contrato de design

[`DESIGN.md`](DESIGN.md) e o indice canonico dos 3 estilos. Usa o formato
`@google/design.md`: tokens em YAML no topo, racional em Markdown por baixo.
As regras em `rules/` continuam a ser a camada de prompt; `DESIGN.md` define o
vocabulario visual que essas regras devem respeitar.

## Estrutura do repo

| Pasta | O que e |
|---|---|
| `DESIGN.md` | Indice dos 3 estilos + tokens de UI da app. |
| `design/` | Contratos ricos por slot (`slot-1..3.md`), fidelidade alta. |
| `docs/` | PRD canonico, arquitetura, custos. |
| `rules/` | `global.md` + `slots/slot-1..3.md` + `skills/*.md` (+ `_parked/`). Ficheiros como interface. |
| `leads/` | Persistencia. Uma pasta por lead, runtime fora do git. |
| `app/` | Codigo da app, frontend e backend. |

## Divisao de trabalho

- **Claude Code:** estrutura, `.md`, plano.
- **Hermes:** codigo serio, GPT-5.5 autor, DeepSeek arquitetura.
- Regra mantida: nunca o mesmo modelo autor e revisor.

PT-PT em tudo.
