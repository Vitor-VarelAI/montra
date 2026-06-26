# Referência de UI — ecrã de resultado (clone do Recast)

Capturado da screenshot do Recast fornecida pelo Vitor. É o alvo visual da Fase 5
(grid das 6). Fundo creme, minimalista.

## Layout do ecrã de resultado

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Recast · together.ai                                            start over │   ← topo
│                                                                            │
│ SIX REDESIGNS OF                                    TIME      TOTAL COST    │
│ A landing page for an invoicing app for...        209.6s      $0.309       │   ← header
│ Click any one to inspect it, then lock your winner. Keys 1 to 6.           │
│                                                                            │
│ ┌─ 01 Variation 01   11,150 tok  $0.046 ┐ ┌─ 02 ... ┐ ┌─ 03 ... ┐          │
│ │      [landing renderizada]            │ │         │ │         │          │   ← grid 3×2
│ └──────────────────────────────────────┘ └─────────┘ └─────────┘          │
│ ┌─ 04 ...                              ┐ ┌─ 05 ... ┐ ┌─ 06 ... ┐          │
│ │      [landing renderizada]            │ │ (dark)  │ │ (warm)  │          │
│ └──────────────────────────────────────┘ └─────────┘ └─────────┘          │
└──────────────────────────────────────────────────────────────────────────┘
```

## Elementos

**Topo**
- Esquerda: logótipo/wordmark (no nosso caso, Prisma · VVarelAI).
- Direita: `start over` (recomeçar, limpa e volta ao input).

**Header**
- Label pequeno em maiúsculas: `SIX REDESIGNS OF` → no nosso caso algo como
  `SEIS REDESIGNS DE`.
- Título: a descrição/prompt do lead, em tipografia grande (serifa no Recast).
- Subtexto-instrução: `Click any one to inspect it, then lock your winner. Keys 1 to 6.`
- Métricas à direita: **TIME** (tempo total da geração) e **TOTAL COST** (custo somado).

**Cada card (×6)**
- Cabeçalho do card: ponto colorido + `0N  Variation 0N`, e à direita `NN,NNN tok` + `$0.0NN`
  (tokens e custo **daquela** janela).
- Corpo: a versão renderizada (iframe/sandbox do HTML).
- Estados: hover → ações `Lock` / `open`; tecla `N` (1-6) seleciona/inspeciona.
  No Recast aparece `press 3`, `Lock`, `open` sobre o card focado.

## Notas para a nossa versão
- Grid **3×2**, fundo **creme**, atalhos **1-6** — fechado no PRD §5.
- O "TIME" + "TOTAL COST" no header e o `tok`/`$` por card encaixam na consciência
  de custo (PRD §7 / `COSTS.md`). Mantê-los é barato e útil para o operador.
- `start over` = volta à Fase 1 (input).
- `lock your winner` (escolher o vencedor) no Recast serve o fluxo deles; para nós
  o "escolher" é o Vitor decidir qual usar no outbound — pode ser só visual, sem
  ação a jusante (distribuição é à mão, PRD §9 fora-da-v1).
- Adaptar copy para **PT-PT**.

## Diferenças nossas vs Recast
- Antes do grid existe a **vista de design system** (Fase 3, separadores estilo Excel),
  que o Recast não tem. O grid é o passo seguinte ao DS aprovado.
- Por card temos **campo de prompt** para regenerar só aquela janela (PRD §4).
