# Arquitetura — Plano de construção para o Hermes

> Escrito por Claude Code como **plano**, não como código. A arquitetura interna
> definitiva é do **DeepSeek (arquiteto)**; o código é do **GPT-5.5 (autor)**.
> Trata isto como proposta + contratos a respeitar, não como imposição de estrutura.

## 1. Pipeline (uma passagem)

```
[Fase 1] Input          URL (principal) | texto livre (alternativa) + toggle Website/Web app
   │
[Fase 2] Extração       FireCrawl: markdown + imagens + pistas fracas de marca + screenshot do site antigo
   │                    → escreve em leads/<slug>/source/
   │
[Fase 3] Design systems Vista própria (separadores estilo Excel). Vitor aprova/ajusta 3 sistemas.
   │                    → grava leads/<slug>/design-systems.json  (um sistema por slot)
   │
[Fase 4] Geração        Para cada slot 1..3, em paralelo:
   │                       prompt = design-systems[N] + rules/global.md + rules/slots/slot-N.md + rules/skills/*.md
   │                       GLM-5.2 (via OpenCode Zen, API HTTP direta) → HTML
   │                    → leads/<slug>/versions/slot-N.html
   │
[Fase 5] Grid           3×1, creme, atalhos 1-3. Renderiza os 3 HTML.
   │
[Fase 6] Fotos          Onde as fotos do site antigo são fracas:
   │                       openai/gpt-image-2/edit (preferido, a partir das reais)
   │                       openai/gpt-image-2 (recurso, text-to-image)
   │                    → injeta nas versões. Golpe de vista, não 4K.
   │
[Fase 7] Dashboard      Screenshot do grid → leads/<slug>/grid.png. Lista de trabalhos recentes.
```

## 2. A montagem do prompt (o coração)

Cada janela recebe a **soma** das camadas de geração (PRD §4):

```
design system Montra do slot + regra global (rules/global.md) + regra do slot (rules/slots/slot-N.md) + skills do slot (rules/skills/*.md)
= prompt de geração da janela N
```

Regenerar uma janela (ajuste fino):
```
soma anterior + prompt do Vitor para a janela N  →  refaz SÓ slot-N.html
```
As outras 2 não tocam, não gastam tokens. O prompt do Vitor **soma-se** à regra do
slot (afina por cima), não a substitui.

**As regras são lidas do disco a cada geração.** Mudar um `.md` muda a geração
seguinte sem mexer no código (princípio agent-native, PRD §4).

`DESIGN.md` é o índice visual canónico dos três estilos. Usa o formato
`@google/design.md`: YAML para tokens e Markdown para racional. Na v1, as regras
`.md` continuam a ser lidas diretamente do disco; `DESIGN.md` serve como fonte
de verdade para nomes, paletas, tipografia, layout e critérios de cada slot.

Exportar uma janela devolve o bundle operacional desse slot: HTML gerado, design
system aprovado desse slot, contrato visual, regra global, regra de slot, prompt
específico e dados de origem disponíveis.

## 3. Contrato da pasta de lead

Ver `leads/_example/`. Resumo:

```
leads/<slug>/
├── source/
│   ├── screenshot.png      # site antigo (comparação)
│   └── content.md          # markdown da FireCrawl (opcional guardar)
├── design-systems.json     # 6 DS aprovados, um por slot
├── versions/
│   ├── slot-1.html ... slot-3.html
└── grid.png                # screenshot dos 3 (thumbnail do dashboard, leve)
```

`<slug>` derivado do domínio do lead (ex: `restaurante-x-pt`). A pasta é a fonte
de verdade — o dashboard lê os `grid.png` das pastas recentes, sem BD.

## 4. Integrações externas

| Serviço | Uso | Notas |
|---|---|---|
| FireCrawl | scrape → markdown + imagens + DS + screenshot | 1 crédito/scrape. `FIRECRAWL_API_KEY`. |
| GLM-5.2 | gera os 3 HTML | API HTTP direta do OpenCode Zen (`opencode.ai/zen`), key `OPENCODE_GO_API_KEY`. Não passa pelo Hermes. |
| fal · GPT Image 2 | melhora/gera fotos | `openai/gpt-image-2/edit` + `openai/gpt-image-2`. `FAL_KEY`. Qualidade média na v1. |

> As três integrações são APIs HTTP independentes, cada uma com a sua key. Nenhum
> agente está no caminho de runtime da app.

## 5. Frontend (clone do Recast)

> Alvo visual detalhado (a partir da screenshot do Recast): `docs/UI-REFERENCE.md`.

- Next.js. Grid 3×1, fundo creme, minimalista.
- Atalhos de teclado **1-3** para selecionar/inspecionar janela.
- Loading simples (três pontos / animação leve). **Sem streaming de código.**
- Vista de design system com separadores em baixo (referência: abas de Excel).
- Por janela: campo de prompt para regenerar só aquela.
- Por janela: botão de fotos chama fal, melhora até 3 imagens reais e atualiza o HTML do slot.

## 6. Runtime independente (sem delegation-gate)

A app não depende de nenhum agente em runtime. O GLM-5.2 é chamado diretamente
pela API HTTP do OpenCode Zen (`opencode.ai/zen`, compatível com OpenAI), com
`OPENCODE_GO_API_KEY`. Não passa pelo Hermes, logo **não há delegation-gate a
resolver** — o antigo pendente (PRD §8) está fechado.

O "Hermes" do projeto refere-se só a quem **escreve** o código (PRD §10), não ao
runtime. Os dois sentidos não se confundem.

## 7. Princípios de custo na v1 (PRD §7)

- Fotos em qualidade média (golpe de vista, não 4K).
- FireCrawl no free tier.
- Atenção ao volume de gerações GLM (o grosso do custo).
