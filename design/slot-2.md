# Slot 2 — Editorial de Marca · Contrato de Design

> Contrato visual canónico deste slot, a fidelidade Jeton. Autorado uma vez,
> reusado em todos os leads. O design system por lead preenche os específicos da
> marca dentro desta estrutura. Convenção: `design/slot-N.md`. Índice em `DESIGN.md`.

## Tema
Ritmo de revista. Paper-and-ink quente, tipografia expressiva, composição
assimétrica, sensação de marca com história. **A página conta uma história, não
enumera serviços** — o storytelling é a espinha deste slot.

## Melhor para
Restaurantes, hotelaria, barbearias, ateliers, produtos artesanais, marcas locais
com ambiente, fotografia forte ou história para contar.

---

## CORES

### Brand
- **Ink** — `#1A1714` / `--color-ink`
  → Tipografia display serif, texto de alto contraste, secção dramática full-bleed.
  Preto quente, não frio — combina com o paper.
- **Paper** — `#F6F1E9` / `--color-paper`
  → Canvas principal. Off-white quente, textura de papel, não branco clínico.

### Accent
- **Rust** — `#B23A2E` / `--color-rust` → Acento editorial: links, marcas de
  pull-quote, pequenos flourishes, números de secção. **Especiaria, não fundo
  dominante** — usado com parcimónia.

### Neutros / Superfícies (por nível)
| Nível | Nome | Valor | Uso |
|---|---|---|---|
| 0 | Paper | `#F6F1E9` | Fundo principal |
| 1 | Cream | `#FCF8F1` | Cards, blocos de leitura, breaks subtis |
| 2 | Ink (dark break) | `#1A1714` | **Uma** secção full-bleed escura para drama editorial |
| — | Ink Soft | `#45403A` | Texto de corpo (preto puro cansa em leitura longa) |
| — | Muted | `#8A7F73` | Legendas, metadados, datas — cinza quente |
| — | Hairline | `#E3DACB` | Bordas de 1px, divisores editoriais |

---

## TIPOGRAFIA

**Display/Headings:** Fraunces (serif de alto contraste, caráter editorial), via
Google Fonts. Fallback: Playfair Display, Georgia, serif.
**Corpo:** Inter (sans limpo). O **contraste serif × sans é a voz** deste slot.
**Token CSS:** `--font-serif`, `--font-sans`
**Pesos:** serif 400/500/600 · sans 400/500

### Escala tipográfica
| Role | Tamanho | Line Height | Letter Spacing | Família | Token |
|---|---|---|---|---|---|
| caption | 13px | 1.4 | +0.04em | sans | `--text-caption` |
| body-sm | 15px | 1.6 | 0 | sans | `--text-body-sm` |
| body | 18px | 1.7 | 0 | sans | `--text-body` |
| lead (standfirst) | 22px | 1.6 | 0 | sans | `--text-lead` |
| pull-quote | 30px | 1.3 | 0 | serif italic | `--text-pull` |
| heading-sm | 28px | 1.25 | -0.01em | serif | `--text-heading-sm` |
| heading | 42px | 1.15 | -0.015em | serif | `--text-heading` |
| heading-lg | 64px | 1.08 | -0.02em | serif | `--text-heading-lg` |
| display | 92px | 1.0 | -0.02em | serif | `--text-display` |
| display-xl | 128px | 0.96 | -0.02em | serif | `--text-display-xl` |

> Tracking serif **gentil** (máx -0.02em), nunca apertado como o slot-1 — as serifas
> querem ar. **Corpo grande (18px) e line-height 1.7** porque storytelling é leitura:
> o texto tem de ler-se confortável. Legendas (`caption`) em sans com tracking
> positivo — device editorial.

---

## ESPAÇAMENTO

**Unidade base:** 4px | **Densidade:** generosa, com ritmo assimétrico

| Token | Valor |
|---|---|
| `--space-4` | 4px |
| `--space-8` | 8px |
| `--space-12` | 12px |
| `--space-16` | 16px |
| `--space-24` | 24px |
| `--space-32` | 32px |
| `--space-48` | 48px |
| `--space-64` | 64px |
| `--space-96` | 96px |
| `--space-140` | 140px |

---

## BORDER RADIUS

| Elemento | Valor | Token |
|---|---|---|
| imagens | 0px | `--radius-image` |
| inputs | 6px | `--radius-input` |
| buttons | 6px | `--radius-button` |
| cards | 8px | `--radius-card` |
| tags | 999px | `--radius-pill` |

> **Imagens de canto vivo (0px)** — sensação de impressão/print, não de app. Resto
> crispo (6–8px). Nada de cards muito arredondados.

---

## SOMBRAS / ELEVAÇÃO

A profundidade vem de **camadas de media + tipografia**, não de sombra. Por defeito,
flat, com divisores hairline.

- **Subtil (só elementos genuinamente flutuantes):** `rgba(26,23,20,0.06) 0px 8px 28px -10px` / `--shadow-pop`
- Imagens e blocos editoriais: sem sombra. Sobreposição e escala criam a profundidade.

---

## LAYOUT

| Propriedade | Valor |
|---|---|
| Content max-width | 1200px |
| Reading measure | 680px |
| Section gap | 120px |
| Card padding | 32px |
| Element gap | 16px |

**Modelo:** grelha **assimétrica** de revista. Alternar imagem/texto, variar escala
(uma frase grande → corpo pequeno → imagem). A coluna de leitura nunca passa de
~680px para o texto respirar. Uma secção escura full-bleed para um momento dramático.

---

## ESTRUTURA NARRATIVA (storytelling — o coração deste slot)

A página segue um **arco**, não uma lista de features:

1. **Gancho** — display serif + standfirst (`lead`) que enquadra o negócio como
   história, não como catálogo. Uma frase que faz parar.
2. **Origem** — de onde vem, quem, há quanto tempo, porquê. Bloco manifesto,
   `drop cap` opcional.
3. **Ofício / Processo** — o que torna o negócio o que é: materiais, método, mãos,
   ritual. Imagem-led.
4. **Prova / Voz** — pelo menos uma **pull-quote** (voz real do negócio ou cliente)
   em serif italic com marca rust. Reviews, galeria, sinais reais.
5. **Convite** — CTA enquadrado como **convite**, não venda dura. "Reservar mesa",
   "Visitar o atelier", "Conhecer a casa".

Regras de voz:
- **Legendas como voz:** a legenda italic dá personalidade, não só descreve a foto.
- Variação de escala obrigatória entre blocos — sem ritmo, deixa de ser editorial.
- **Grounded no real:** a história sai do conteúdo extraído (global.md). Nunca
  inventar origem, anos, prémios ou pessoas que não existam.

---

## COMPONENTES

### Abertura (Gancho)
Display serif (64–128px) + standfirst `lead` em sans. Muito ar. Pode ter uma
imagem editorial offset, não um banner centrado genérico.

### Bloco Manifesto
Texto narrativo em `body` 18px, coluna ≤680px, `drop cap` opcional na primeira
letra (serif, rust ou ink). Conta a origem.

### Pull-Quote
Serif italic 30px, recuada, com marca/aspas em **Rust**. Voz real, separada do
corpo. É o pico emocional da página.

### Imagem Editorial + Legenda
Imagem de canto vivo (radius 0), legenda em sans italic `muted` por baixo — a
legenda tem voz, não é alt-text.

### Dark Break
**Uma** secção full-bleed `Ink` com texto Paper — uma frase grande, uma assinatura,
um momento. Usado uma vez, para drama.

### Convite (CTA)
Botão editorial restrained — fundo Ink ou Rust, radius 6px, peso 500 — ou text-link
serif sublinhado. Tom de convite, nunca "COMPRA JÁ".

### Top Nav
Wordmark serif à esquerda, poucos links sans à direita. Transparente sobre paper.

---

## DO's & DON'Ts

**✅ Fazer:**
- Contraste **serif display × sans body** — é a voz do slot.
- Seguir o **arco narrativo** (Gancho → Origem → Ofício → Prova → Convite).
- Paper-and-ink quente; **Rust como especiaria**, não fundo dominante.
- Variar escala entre blocos; assimetria de revista.
- Imagens de canto vivo; legendas com voz.
- Pelo menos uma pull-quote real.
- Coluna de leitura ≤680px, corpo 18px / line-height 1.7.

**❌ Não fazer:**
- Layout corporativo ou grelha de cards todos iguais.
- Tracking apertado nas serifas (isso é o slot-1).
- Branco clínico frio — o paper é quente.
- CTA agressivo de afiliado/desconto (é o slot-3, não este).
- Inventar história, origem, anos ou citações.
- Rust como fundo de secção inteira (vira ruído).
- Visual de blog antigo ou template de casamento.

---

## CSS CUSTOM PROPERTIES (Quick Start)

```css
:root {
  /* Colors */
  --color-ink: #1A1714;
  --color-ink-soft: #45403A;
  --color-paper: #F6F1E9;
  --color-rust: #B23A2E;
  --color-muted: #8A7F73;
  --surface-paper: #F6F1E9;
  --surface-cream: #FCF8F1;
  --surface-dark: #1A1714;
  --border-hairline: #E3DACB;

  /* Typography */
  --font-serif: 'Fraunces', 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;

  /* Type Scale */
  --text-caption: 13px;     --leading-caption: 1.4;     --tracking-caption: 0.04em;
  --text-body-sm: 15px;     --leading-body-sm: 1.6;     --tracking-body-sm: 0;
  --text-body: 18px;        --leading-body: 1.7;        --tracking-body: 0;
  --text-lead: 22px;        --leading-lead: 1.6;        --tracking-lead: 0;
  --text-pull: 30px;        --leading-pull: 1.3;        --tracking-pull: 0;
  --text-heading-sm: 28px;  --leading-heading-sm: 1.25; --tracking-heading-sm: -0.01em;
  --text-heading: 42px;     --leading-heading: 1.15;    --tracking-heading: -0.015em;
  --text-heading-lg: 64px;  --leading-heading-lg: 1.08; --tracking-heading-lg: -0.02em;
  --text-display: 92px;     --leading-display: 1;       --tracking-display: -0.02em;
  --text-display-xl: 128px; --leading-display-xl: 0.96; --tracking-display-xl: -0.02em;

  /* Spacing */
  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px;
  --space-24: 24px; --space-32: 32px; --space-48: 48px; --space-64: 64px;
  --space-96: 96px; --space-140: 140px;

  /* Layout */
  --content-max-width: 1200px;
  --reading-measure: 680px;
  --section-gap: 120px;
  --card-padding: 32px;
  --element-gap: 16px;

  /* Border Radius */
  --radius-image: 0px; --radius-input: 6px; --radius-button: 6px;
  --radius-card: 8px; --radius-pill: 999px;

  /* Shadows (raros; default é flat + camadas) */
  --shadow-pop: rgba(26,23,20,0.06) 0px 8px 28px -10px;
}
```

---

**3 escolhas de assinatura deste sistema:**
1. **Serif display × sans body** — o contraste tipográfico é a voz editorial (o oposto do mono-sans do slot-1).
2. **Paper-and-ink quente com um acento Rust** — usado como especiaria (links, pull-quotes, números), nunca como fundo de secção.
3. **Arco narrativo** — a página conta uma história (Gancho → Origem → Ofício → Prova → Convite) em vez de enumerar features. É o storytelling, governado, não decorativo.
