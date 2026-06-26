# Custos — consciência de run

O Prisma dispara gerações pagas. Registo para vigilância (PRD §7).

## Por serviço

| Serviço | Unidade | Custo | Multiplicador |
|---|---|---|---|
| GLM-5.2 | por geração | (confirmar) | × 6 versões × nº leads → **o grosso do custo** |
| GPT Image 2 (fal) | por imagem | ~0,01 USD (1024×768, baixa) → ~0,41 USD (4K, alta) | × fotos/site × nº leads |
| FireCrawl | por scrape | 1 crédito | free tier 1.000 créditos one-time → chega p/ v1 |

## Conta rápida (estimativa por lead)

```
1 lead = 1 scrape FireCrawl (1 crédito)
       + 6 gerações GLM-5.2        (custo GLM × 6)
       + N fotos GPT Image 2       (~0,01–0,41 USD cada, qualidade média na v1)
```

Regenerar uma janela = +1 geração GLM (só dessa janela). As outras não custam.

## Princípio v1
- Qualidade **média** nas fotos (golpe de vista, não perfeição).
- A UI melhora até **3 fotos por slot** por clique. Para teste técnico, usar
  `quality: low` na API.
- FireCrawl no **free tier**.
- Vigiar o **volume de gerações GLM** — é onde o custo escala.

## A confirmar (PRD §12.4)
- [ ] Custo real por geração GLM-5.2.
- [ ] Custo/qualidade alvo das fotos por geração no fal.
