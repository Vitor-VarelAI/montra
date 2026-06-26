# Slot 3 — Conversão Direta · Contrato de Design

> Contrato visual canónico deste slot, a fidelidade Jeton. Autorado uma vez,
> reusado em todos os leads. O design system por lead preenche os específicos da
> marca dentro desta estrutura. Convenção: `design/slot-N.md`. Índice em `DESIGN.md`.

## Tema
Comercial, rápido, orientado à ação. Cor confiante usada **a sério**, contraste
forte, secções curtas e escaneáveis, CTA sempre à vista. O objetivo é um só:
**fazer o lead agir agora** — ligar, reservar, pedir orçamento.

## Melhor para
Serviços locais que precisam de leads: reparações, estética, cursos, consultas,
reservas, campanhas e ofertas sazonais. Negócios onde a ação rápida é o que vende.

---

## CORES

### Brand
- **Action** — `#F2611B` / `--color-action`
  → A cor quente, usada **a fundo**: fundos sólidos de CTA, badges, destaques,
  números-chave. É a protagonista. Aqui a cor **preenche** — ao contrário do slot-1
  (ausente) e do slot-2 (especiaria).
- **Ink** — `#18212E` / `--color-ink`
  → Tipografia, texto de alto contraste. Azul-tinta confiante, comercial.

### Accent funcional
- **Go** — `#1FA871` / `--color-go` → Ticks de benefício, "incluído", sinais de
  confiança. Verde de confirmação, toque funcional.

### Neutros / Superfícies (por nível)
| Nível | Nome | Valor | Uso |
|---|---|---|---|
| 0 | Canvas | `#FFFDF9` | Fundo principal. Branco quente, friendly. |
| 1 | Action Tint | `#FFF3EC` | Blocos de destaque, faixas de oferta |
| 2 | Sunken | `#F4F1EC` | Cards passivos, fundos de secção neutra |
| — | Ink Soft | `#3A4654` | Texto de corpo |
| — | Muted | `#5B6573` | Metadados, texto secundário |
| — | Hairline | `#E7E2DA` | Bordas de 1px |

---

## TIPOGRAFIA

**Fonte:** Inter (workhorse, pesos pesados para impacto), via Google Fonts.
Aspiracional: Geist, Satoshi.
**Fallback:** `-apple-system, system-ui, sans-serif`
**Pesos:** 400/500 (corpo) · **700/800 (headlines)** — contraste de peso forte.
**Token CSS:** `--font-sans`

### Escala tipográfica
| Role | Tamanho | Line Height | Letter Spacing | Peso | Token |
|---|---|---|---|---|---|
| caption | 12px | 1.4 | +0.04em | 600 | `--text-caption` |
| body-sm | 14px | 1.5 | 0 | 400 | `--text-body-sm` |
| body | 17px | 1.55 | -0.005em | 400 | `--text-body` |
| lead | 20px | 1.5 | -0.01em | 500 | `--text-lead` |
| heading-sm | 26px | 1.2 | -0.02em | 700 | `--text-heading-sm` |
| heading | 38px | 1.12 | -0.025em | 700 | `--text-heading` |
| heading-lg | 54px | 1.05 | -0.03em | 800 | `--text-heading-lg` |
| display | 76px | 1.0 | -0.035em | 800 | `--text-display` |
| display-xl | 104px | 0.95 | -0.04em | 800 | `--text-display-xl` |

> Sans **pesado** (700–800) nas headlines, tracking apertado — punch moderno.
> Corpo a 400 com line-height 1.55: **escaneável, não leitura longa** (o slot-2 é
> que é leitura). O olho salta de benefício em benefício até ao CTA.

---

## ESPAÇAMENTO

**Unidade base:** 4px | **Densidade:** secções curtas (mais CTA no ecrã)

| Token | Valor |
|---|---|
| `--space-4` | 4px |
| `--space-8` | 8px |
| `--space-12` | 12px |
| `--space-16` | 16px |
| `--space-20` | 20px |
| `--space-24` | 24px |
| `--space-32` | 32px |
| `--space-48` | 48px |
| `--space-64` | 64px |
| `--space-96` | 96px |

---

## BORDER RADIUS

| Elemento | Valor | Token |
|---|---|---|
| inputs | 10px | `--radius-input` |
| buttons | 12px | `--radius-button` |
| cards | 16px | `--radius-card` |
| badges/pills | 999px | `--radius-pill` |

> Radius **friendly/tappable** (10–16px) — botões proeminentes, fáceis de clicar.
> Nem cripo de print (slot-2) nem mínimo (slot-1): aqui o botão convida ao toque.

---

## SOMBRAS / ELEVAÇÃO

A profundidade **conduz à ação** — o CTA salta da página. (Oposto do flat do slot-1.)

- **CTA primário:** `rgba(242,97,27,0.25) 0px 6px 18px -4px` / `--shadow-cta`
  → sombra com tint Action, faz o botão pop.
- **Cards:** `rgba(24,33,46,0.06) 0px 4px 16px -2px` / `--shadow-card`
  → lift subtil para separar do fundo.

---

## LAYOUT

| Propriedade | Valor |
|---|---|
| Page max-width | 1080px |
| Section gap | 88px |
| Card padding | 28px |
| Element gap | 12px |

**Modelo:** oferta primeiro → benefícios escaneáveis → prova junto ao CTA → CTA
repetido em pontos lógicos → contacto sempre alcançável. Largura focada (landing).

---

## HIERARQUIA DE CONVERSÃO (a espinha deste slot)

A página é um funil, não uma montra. Ordem governada:

1. **Oferta** — hero com proposta clara + CTA imediato (Action sólido, com sombra)
   + um sinal de prova à vista (rating, nº de clientes, "resposta em 24h").
2. **Benefício** — em linguagem simples, blocos curtos, com ticks **Go**.
3. **Prova** — reviews, números, garantias, localidade — **colada ao CTA**.
4. **Ação repetida** — o CTA reaparece em pontos lógicos, não só no topo.
5. **Contacto visível** — telefone, horário, localização, mapa: nunca escondidos.

Regras:
- **CTAs com verbo+objeto:** "Pedir orçamento", "Marcar consulta", "Reservar mesa".
- Mobile: barra de CTA/contacto **sticky** alcançável a qualquer scroll.
- **Urgência só se real.** Nada de contadores falsos, descontos inventados,
  garantias inexistentes (respeita `global.md`).

---

## COMPONENTES

### Hero de Oferta
Headline `display`/`heading-lg` peso 800 + subhead `lead` + CTA primário Action +
secundário ghost + um sinal de prova. Badge opcional (Action ou Go) tipo
"Resposta em 24h".

### Botão CTA Primário (filled + shadow)
Fundo **Action** `#F2611B`, texto branco, radius 12px, peso 600, padding
`14px 26px`, `--shadow-cta`. Hover: Action Dark `#D44E0E` + lift. **Sólido e com
sombra** — tem de saltar.

### Botão Secundário
Ghost com borda Ink 1.5px, ou texto Ink sublinhado. Nunca compete com o primário.

### Bloco de Benefícios
Lista curta escaneável, cada item com tick **Go** `#1FA871`. Frases de benefício,
não de feature.

### Card de Prova
Fundo Canvas/Sunken, `--shadow-card`, radius 16px, padding 28px. Review, número ou
garantia. Colocado perto de um CTA.

### Sticky CTA (mobile)
Barra inferior fixa com CTA/contacto. Sempre alcançável.

### Badge / Pill
Action ou Go, caption maiúsculas 12px peso 600. "Novo", "Grátis", "Incluído".

### Bloco de Contacto
Telefone, horário, localização, mapa. Visível, com CTA de contacto direto.

---

## DO's & DON'Ts

**✅ Fazer:**
- Usar **Action a sério** — fundos sólidos de CTA, badges, destaques.
- Seguir o funil (Oferta → Benefício → Prova → Ação repetida → Contacto).
- Botões com **sombra** que saltam; radius tappable (12–16px).
- CTAs com verbo+objeto, repetidos em pontos lógicos.
- Ticks **Go** nos benefícios; prova colada ao CTA.
- Contacto/horário/localização muito visíveis.

**❌ Não fazer:**
- Parecer página de afiliados ou de descontos baratos.
- Urgência falsa, contadores fake, garantias inexistentes, popups.
- Excesso de caixas e setas a competir entre si.
- Texto longo de leitura (isso é o slot-2) — aqui é escaneável.
- Esconder o CTA ou o contacto.
- Usar Action em todo o lado a ponto de perder o foco no botão.

---

## CSS CUSTOM PROPERTIES (Quick Start)

```css
:root {
  /* Colors */
  --color-action: #F2611B;
  --color-action-dark: #D44E0E;
  --color-ink: #18212E;
  --color-ink-soft: #3A4654;
  --color-go: #1FA871;
  --color-muted: #5B6573;
  --surface-canvas: #FFFDF9;
  --surface-action-tint: #FFF3EC;
  --surface-sunken: #F4F1EC;
  --border-hairline: #E7E2DA;

  /* Typography */
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-bold: 700;
  --weight-extrabold: 800;

  /* Type Scale */
  --text-caption: 12px;     --leading-caption: 1.4;     --tracking-caption: 0.04em;
  --text-body-sm: 14px;     --leading-body-sm: 1.5;     --tracking-body-sm: 0;
  --text-body: 17px;        --leading-body: 1.55;       --tracking-body: -0.005em;
  --text-lead: 20px;        --leading-lead: 1.5;        --tracking-lead: -0.01em;
  --text-heading-sm: 26px;  --leading-heading-sm: 1.2;  --tracking-heading-sm: -0.02em;
  --text-heading: 38px;     --leading-heading: 1.12;    --tracking-heading: -0.025em;
  --text-heading-lg: 54px;  --leading-heading-lg: 1.05; --tracking-heading-lg: -0.03em;
  --text-display: 76px;     --leading-display: 1;       --tracking-display: -0.035em;
  --text-display-xl: 104px; --leading-display-xl: 0.95; --tracking-display-xl: -0.04em;

  /* Spacing */
  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px;
  --space-20: 20px; --space-24: 24px; --space-32: 32px;
  --space-48: 48px; --space-64: 64px; --space-96: 96px;

  /* Layout */
  --page-max-width: 1080px;
  --section-gap: 88px;
  --card-padding: 28px;
  --element-gap: 12px;

  /* Border Radius */
  --radius-input: 10px; --radius-button: 12px;
  --radius-card: 16px; --radius-pill: 999px;

  /* Shadows (usadas para conduzir à ação) */
  --shadow-cta: rgba(242,97,27,0.25) 0px 6px 18px -4px;
  --shadow-card: rgba(24,33,46,0.06) 0px 4px 16px -2px;
}
```

---

**3 escolhas de assinatura deste sistema:**
1. **Accent preenchido a sério** — CTAs, badges e destaques em Action sólido (slot-1 a cor é ausente, slot-2 é especiaria, aqui é protagonista).
2. **Sans pesado e secções curtas escaneáveis** — guia o olho de benefício em benefício até à ação (o slot-2 é serif e leitura longa).
3. **Profundidade que conduz à ação** — sombra com tint no CTA e botões tappable que saltam da página (o slot-1 é flat, o slot-2 é camadas-print).
