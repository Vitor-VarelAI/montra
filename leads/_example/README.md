# Contrato da pasta de lead

Cada lead = **uma pasta** em `leads/<slug>/`. A pasta é a fonte de verdade
(sem base de dados). `<slug>` deriva do domínio (ex: `restaurante-x-pt`).

Esta pasta `_example/` documenta a estrutura. As pastas reais de leads são
ignoradas pelo git (`.gitignore`) — vivem só no disco do VPS.

```
leads/<slug>/
├── source/
│   ├── screenshot.png      # screenshot do site antigo (comparação)
│   └── content.md          # markdown extraído pela FireCrawl (opcional guardar)
├── design-system.json      # o design system APROVADO que governou as 6 versões
├── versions/
│   ├── slot-1.html
│   ├── slot-2.html
│   ├── slot-3.html
│   ├── slot-4.html
│   ├── slot-5.html
│   └── slot-6.html
└── grid.png                # screenshot dos 6 em grid (thumbnail do dashboard, leve)
```

## Notas
- **Reaproveitamento:** para um lead parecido (ex: outro canalizador), parte-se de
  uma pasta existente em vez de regenerar do zero.
- **Dashboard:** lê os `grid.png` das pastas recentes. Clicar abre a pasta do lead.
- **Regenerar uma janela** sobrescreve só o `slot-N.html` respetivo; os outros 5
  ficam intactos.
- `design-system.json`: guardar o DS aprovado (cores, tipografia, espaçamento) para
  reuso e para registar o que governou aquela geração.
