# Slot 1 — Minimalista Premium · Contrato de Design

> Contrato visual canónico deste slot, a fidelidade Jeton. Autorado uma vez,
> reusado em todos os leads. O design system por lead (`leads/<slug>/design-systems.json`)
> só preenche os específicos da marca (paleta, fontes) dentro desta estrutura.
> Convenção: um ficheiro por slot em `design/slot-N.md`. O `DESIGN.md` é o índice.

## Tema
Light, quase monocromático. Canvas branco, tinta preta, **um** neutro frio. A cor
está quase ausente — o contraste vem de preto, branco e espaço. Sensação de
silêncio caro: poucos elementos, hierarquia impecável, nada a gritar.

## Melhor para
Clínicas, consultores, advogados, arquitetura, serviços profissionais, marcas que
precisam de parecer mais caras e mais confiáveis.

---

## CORES

### Brand
- **Ink** — `#0E0E0E` / `--color-ink`
  → Tipografia display e headings, fundo sólido do CTA primário, strokes de
  contraste máximo. É a "cor" dominante. Quase-preto, não preto puro — mais suave.
- **Canvas** — `#FFFFFF` / `--color-canvas`
  → Fundo principal de todas as secções. O branco é material, não vazio.

### Accent (disciplina monocromática)
- **Slate** — `#6B7280` / `--color-slate` → Texto secundário, labels, captions, metadados. O único tom frio.
- **Ink Soft** — `#3A3A3A` / `--color-ink-soft` → Texto de corpo quando o preto puro é duro demais em blocos longos.

> Sem cor de marca cromática. Se o lead exigir um toque de cor, usar **um** acento
> dessaturado e profundo, aplicado só em links/foco — nunca em fundos de secção.

### Neutros / Superfícies (por nível)
| Nível | Nome | Valor | Uso |
|---|---|---|---|
| 0 | Canvas | `#FFFFFF` | Fundo principal |
| 1 | Raised | `#FAFAF9` | Cards, breaks de secção, hover subtil |
| 2 | Sunken | `#F4F4F2` | Blocos em destaque, fundos de input passivos |
| — | Hairline | `#E8E8E5` | Bordas de 1px. **A profundidade vive aqui, não em sombra.** |

---

## TIPOGRAFIA

**Fonte:** Inter (workhorse fiável via Google Fonts). Aspiracional, se disponível:
Söhne, Neue Haas Grotesk, Geist.
**Fallback:** `-apple-system, system-ui, sans-serif`
**Pesos:** 400 (corpo), 500 (labels/subheads), 600 (headings). Três, não mais.
**Token CSS:** `--font-sans`

### Escala tipográfica
| Role | Tamanho | Line Height | Letter Spacing | Token |
|---|---|---|---|---|
| caption | 12px | 1.4 | 0 | `--text-caption` |
| body-sm | 14px | 1.5 | 0 | `--text-body-sm` |
| body | 16px | 1.6 | -0.005em | `--text-body` |
| lead | 20px | 1.5 | -0.01em | `--text-lead` |
| heading-sm | 28px | 1.2 | -0.02em | `--text-heading-sm` |
| heading | 40px | 1.15 | -0.025em | `--text-heading` |
| heading-lg | 56px | 1.05 | -0.03em | `--text-heading-lg` |
| display | 80px | 1.0 | -0.035em | `--text-display` |
| display-xl | 112px | 0.95 | -0.04em | `--text-display-xl` |

> Letter-spacing **negativo, e aperta com o tamanho** — display a -0.04em. O tipo
> fica preciso e moderno. É a assinatura tipográfica (e o oposto exato do Jeton).
> Contraste de peso forte: corpo a 400, headings a 600 — sem pesos intermédios a
> diluir a hierarquia.

---

## ESPAÇAMENTO

**Unidade base:** 4px | **Densidade:** generosa (o espaço é o material)

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
| `--space-160` | 160px |

---

## BORDER RADIUS

| Elemento | Valor | Token |
|---|---|---|
| inputs | 8px | `--radius-input` |
| buttons | 8px | `--radius-button` |
| cards | 12px | `--radius-card` |
| large-cards | 16px | `--radius-large` |
| tags/badges | 999px | `--radius-pill` |

> 8px é o padrão. Cripo, contido. **Sem pills de navegação gigantes** — isso é
> linguagem de outro slot. O pill 999px é só para tags pequenas.

---

## SOMBRAS / ELEVAÇÃO

A profundidade é **hairline + espaço**, não sombra. Por defeito, flat.

- **Subtil (elementos genuinamente flutuantes — menu, dropdown):** `rgba(0,0,0,0.04) 0px 1px 2px 0px, rgba(0,0,0,0.06) 0px 8px 24px -8px` / `--shadow-pop`
- **Cards:** sem sombra. Borda hairline de 1px `#E8E8E5`.

---

## LAYOUT

| Propriedade | Valor |
|---|---|
| Content max-width | 1120px |
| Wide max-width | 1280px |
| Section gap | 120px |
| Card padding | 32px |
| Element gap | 16px |

**Modelo:** Hero calmo (sem gradiente, muito branco) → secções largamente espaçadas,
poucas, cada uma com uma função clara.

---

## COMPONENTES

### Hero Calmo
Sem gradiente, sem elemento decorativo. Headline display (72–112px) em Ink com
tracking apertado, subtítulo `lead` em Slate, **um** CTA primário sólido (+ ghost
opcional) e **um** sinal de prova discreto. Margens generosas em todos os lados.

### Botão CTA Primário (filled)
Fundo sólido **Ink** `#0E0E0E`, texto branco, radius 8px, peso 500, padding
`12px 24px`. Hover: opacidade 90% ou Ink puro `#000`. **Sólido, não outlined** —
o preto sobre branco é o gesto premium-minimal clássico.

### Botão Secundário (ghost)
Fundo transparente, borda hairline 1px `#E8E8E5`, texto Ink, radius 8px. Hover:
fundo `--surface-raised`.

### Section Label
Caption 12px, **maiúsculas**, tracking **positivo** `0.08em`, cor Slate, acima do
heading da secção. É o único sítio onde o tracking é positivo — device editorial
para abrir um rótulo pequeno.

### Card
Fundo `#FFFFFF` ou `#FAFAF9`, borda hairline 1px, **sem sombra**, radius 12px,
padding 32px. Conteúdo respira; nunca denso.

### Top Nav
Barra minimal. Wordmark à esquerda em peso 600 / 16px, 3–4 links em Slate à
direita. Transparente; ao fazer scroll ganha borda hairline inferior. **Sem pill
flutuante.**

### Input
Fundo `#FFFFFF`, borda hairline 1px, radius 8px, padding `10px 14px`. Foco: borda
Ink 1px (sem glow colorido).

---

## DO's & DON'Ts

**✅ Fazer:**
- Manter quase-monocromático: preto, branco, **um** Slate. A cor é a exceção, não a regra.
- CTA primário **sólido Ink** sobre branco.
- Tracking **negativo** nos headings, a apertar com o tamanho.
- Contraste de peso forte (400 vs 600), saltando o intermédio.
- Profundidade por **borda hairline 1px + section gaps largos** (96–160px).
- Section labels em maiúsculas com tracking positivo — o único positivo.

**❌ Não fazer:**
- Gradientes decorativos de qualquer tipo.
- Mais do que ~2–3 tons num ecrã.
- Sombras pesadas ou coloridas — a elevação é hairline.
- Pills de navegação gigantes ou cards muito arredondados (radius > 16px).
- Grelhas de cards idênticas sem ritmo nem ar.
- Copy longa, ícones genéricos, efeitos chamativos.
- Tracking positivo em display (só labels o usam).

---

## CSS CUSTOM PROPERTIES (Quick Start)

```css
:root {
  /* Colors */
  --color-ink: #0E0E0E;
  --color-ink-soft: #3A3A3A;
  --color-canvas: #FFFFFF;
  --color-slate: #6B7280;
  --surface-canvas: #FFFFFF;
  --surface-raised: #FAFAF9;
  --surface-sunken: #F4F4F2;
  --border-hairline: #E8E8E5;

  /* Typography */
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;

  /* Type Scale */
  --text-caption: 12px;     --leading-caption: 1.4;     --tracking-caption: 0;
  --text-body-sm: 14px;     --leading-body-sm: 1.5;     --tracking-body-sm: 0;
  --text-body: 16px;        --leading-body: 1.6;        --tracking-body: -0.005em;
  --text-lead: 20px;        --leading-lead: 1.5;        --tracking-lead: -0.01em;
  --text-heading-sm: 28px;  --leading-heading-sm: 1.2;  --tracking-heading-sm: -0.02em;
  --text-heading: 40px;     --leading-heading: 1.15;    --tracking-heading: -0.025em;
  --text-heading-lg: 56px;  --leading-heading-lg: 1.05; --tracking-heading-lg: -0.03em;
  --text-display: 80px;     --leading-display: 1;       --tracking-display: -0.035em;
  --text-display-xl: 112px; --leading-display-xl: 0.95; --tracking-display-xl: -0.04em;

  /* Spacing */
  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px;
  --space-24: 24px; --space-32: 32px; --space-48: 48px; --space-64: 64px;
  --space-96: 96px; --space-160: 160px;

  /* Layout */
  --content-max-width: 1120px;
  --wide-max-width: 1280px;
  --section-gap: 120px;
  --card-padding: 32px;
  --element-gap: 16px;

  /* Border Radius */
  --radius-input: 8px; --radius-button: 8px;
  --radius-card: 12px; --radius-large: 16px; --radius-pill: 999px;

  /* Shadows (used sparingly; default is flat + hairline) */
  --shadow-pop: rgba(0,0,0,0.04) 0px 1px 2px 0px, rgba(0,0,0,0.06) 0px 8px 24px -8px;
}
```

---

**3 escolhas de assinatura deste sistema:**
1. **Monocromático com CTA sólido Ink** — a cor é quase ausente; o contraste vem de preto/branco/espaço, e o botão primário é preto sólido (o oposto do outlined do Jeton).
2. **Tracking negativo que aperta com o tamanho** — display a -0.04em; o tipo fica preciso e moderno (oposto do tracking positivo do Jeton).
3. **Profundidade por hairline + espaço, não por sombra** — bordas de 1px e section gaps de 96–160px substituem a elevação.
