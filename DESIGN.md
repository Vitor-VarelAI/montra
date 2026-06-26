---
version: alpha
name: Montra Six Style Contract
description: Canonical design contract for Montra app UI and the six outbound redesign slots.
colors:
  primary: "#111111"
  on-primary: "#ffffff"
  surface: "#fbfaf7"
  surface-muted: "#f1eee8"
  text: "#171717"
  text-muted: "#5f5a52"
  border: "#d7d0c6"
  accent: "#7a4f2a"
typography:
  ui:
    fontFamily: Inter
    fontSize: 0.95rem
    fontWeight: "450"
    lineHeight: "1.45"
    letterSpacing: "0em"
  ui-label:
    fontFamily: Inter
    fontSize: 0.8rem
    fontWeight: "650"
    lineHeight: "1.2"
    letterSpacing: "0em"
  generated-heading:
    fontFamily: system-ui
    fontSize: 3.5rem
    fontWeight: "700"
    lineHeight: "0.96"
    letterSpacing: "-0.03em"
rounded:
  sm: 4px
  md: 8px
  lg: 12px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
components:
  app-button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.ui-label}"
    rounded: "{rounded.sm}"
    padding: 12px 16px
  app-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 16px
  app-panel-muted:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: 16px
  app-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  app-focus-ring:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 2px
  app-divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    height: 1px
  slot-frame:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: 0
slots:
  minimalista-premium:
    slot: 1
    displayName: Minimalista Premium
    primaryUse: Clinics, consultants, professional services, higher-trust offers.
    palette: ["#ffffff", "#111111", "#6b7280"]
    typography: Modern sans, precise hierarchy, short copy.
    layout: Quiet first viewport, generous whitespace, few sections.
    avoid: Gradients, generic icons, excessive cards, long copy, loud effects.
  editorial-de-marca:
    slot: 2
    displayName: Editorial de Marca
    primaryUse: Restaurants, hospitality, local brands, ateliers, story-rich businesses.
    palette: ["#f7f4ef", "#1f1f1f", "#b33a3a"]
    typography: Serif or strong type contrast when appropriate.
    layout: Magazine rhythm, asymmetry, image-led editorial blocks.
    avoid: Corporate layouts, equal card grids, agency copy, too many CTAs.
  dark-impacto:
    slot: 3
    displayName: Dark Impacto
    primaryUse: Gyms, tech, events, bars, automotive, high-energy premium brands.
    palette: ["#0f1115", "#f4f4f0", "#78d64b"]
    typography: Large high-contrast text, compact support copy.
    layout: Dark first viewport, strong image scale, focused CTA.
    avoid: Washed gray text, all-over neon, generic purple gradients, gamer styling.
  luxo-classico:
    slot: 4
    displayName: Luxo Classico
    primaryUse: Premium hospitality, beauty, real estate, legal, finance, heritage brands.
    palette: ["#4b1117", "#fbfaf7", "#c19a4a"]
    typography: Elegant serif or classic high-contrast heading.
    layout: Formal composition, restrained ornament, strong proof sections.
    avoid: Cheap gold effects, noisy patterns, weak spacing, fake luxury claims.
  confianca-tecnica:
    slot: 5
    displayName: Confianca Tecnica
    primaryUse: B2B, engineering, health, logistics, industrial, SaaS, specialist services.
    palette: ["#f6f8fb", "#102033", "#2563eb"]
    typography: Neutral sans, scannable labels, structured body text.
    layout: Evidence-led, clear process, specs, proof and practical CTAs.
    avoid: Decorative dashboards, fake metrics, vague enterprise copy, visual clutter.
  conversao-direta:
    slot: 6
    displayName: Conversao Direta
    primaryUse: Local services, urgent leads, repairs, clinics, bookings, lead capture.
    palette: ["#fffdf8", "#1f2937", "#dc5a2a"]
    typography: Direct sans, legible forms, clear CTA hierarchy.
    layout: Offer first, trust second, action always visible.
    avoid: Hidden CTAs, poetic copy, long discovery flows, weak contact routes.
---

## Overview

Montra is an operational tool for producing six outbound redesign demos from one
lead URL. This file is the contract between product intent, prompt rules and
generated visual direction.

The app UI stays quiet and task-focused. The six generated slots should diverge
from each other by design system, not by small color changes over the original
site. If a scraped site has a weak or dated visual system, the slot contract wins.

Generation prompt precedence:

1. Slot design contract in this file.
2. Approved per-lead design system saved in `leads/<slug>/design-systems.json`.
3. `rules/global.md`.
4. `rules/slots/slot-N.md`.
5. Optional operator prompt for that slot.

## Colors

The app shell uses restrained warm neutrals so Vitor can compare generated work
without the tool competing for attention. The generated slots use separate color
strategies:

- Minimalista Premium: white, black, cool neutral.
- Editorial de Marca: paper, ink, editorial red.
- Dark Impacto: near-black, warm white, sharp energy accent.
- Luxo Classico: oxblood, ivory, controlled metallic accent.
- Confianca Tecnica: cool light surface, deep technical blue, action blue.
- Conversao Direta: clean warm surface, strong ink, conversion orange.

Do not let extracted colors from the old URL dominate all six versions. Extracted
colors are context, not authority.

## Typography

App UI uses one sans family and compact hierarchy. Generated slots may vary:

- Minimalista Premium: modern sans, low noise, precise weight contrast.
- Editorial de Marca: serif or strong editorial contrast.
- Dark Impacto: large condensed or heavy sans when suitable.
- Luxo Classico: elegant serif or high-contrast classic heading.
- Confianca Tecnica: neutral sans with strong labels and structured sections.
- Conversao Direta: legible sans, short lines, forms and CTAs easy to scan.

Generated headings must stay readable on mobile. Avoid viewport-scaled type that
overflows narrow screens.

## Layout

The app keeps the Recast-like 3 by 2 comparison grid. The generated pages must
each feel like a complete website when opened through "Ver site", not only as
thumbnail compositions inside the grid.

Slot layout expectations:

- Minimalista Premium: few blocks, generous whitespace, calm first viewport.
- Editorial de Marca: image/text rhythm, asymmetry, story-led sections.
- Dark Impacto: strong first viewport, large imagery, concentrated contrast.
- Luxo Classico: formal balance, quality signals, restrained detail.
- Confianca Tecnica: evidence, process, specs, proof and direct CTA.
- Conversao Direta: offer, proof and contact route visible without hunting.

## Elevation & Depth

App UI should avoid decorative depth. Generated versions can use depth only when
it supports the style:

- Minimalista Premium: almost flat.
- Editorial de Marca: layered media and typography, not heavy shadows.
- Dark Impacto: depth through contrast and image scale.
- Luxo Classico: subtle borders, dividers and material cues.
- Confianca Tecnica: structured panels and tables where useful.
- Conversao Direta: strong CTA surfaces and clear form containers.

## Shapes

Keep app controls crisp: 4px to 8px radius. Generated pages may use the slot
shape language, but avoid over-rounded cards and pill-heavy generic SaaS UI.

## Components

The app shell needs reliable task components:

- URL input and scrape state.
- Six slot selector controls with names visible.
- Per-slot design system editor.
- Global rule editor.
- Per-slot rule editor.
- Per-slot prompt editor.
- Generate, regenerate and "Ver site" actions.

Generated HTML should include recognizable page components: hero, offer, proof,
service/process detail, media when available and final CTA.

## Do's and Don'ts

Do:

- Make the six outputs visibly different before any manual prompt is added.
- Keep factual content grounded in scraped source material.
- Let rules and slot design contracts override weak source-site design.
- Make the full-page preview a first-class review path.

Do not:

- Produce six variants that only recolor the original site.
- Hide the per-window prompt behind a generated result.
- Use generic stock imagery when real lead imagery exists.
- Invent facts, awards, testimonials or numbers.
- Add explanatory IA or prompt text inside generated pages.

## Slot Contracts

This section mirrors the `slots` YAML extension above in plain language for
agents and reviewers. The YAML is the token source. This prose is the judgement
source.

### 1. Minimalista Premium

Use when the lead needs trust, clarity and perceived value. The redesign should
feel more expensive because it is quieter, better aligned and easier to
understand.

### 2. Editorial de Marca

Use when the business has atmosphere, story, product craft or photography. The
redesign should feel curated and memorable without turning into a blog template.

### 3. Dark Impacto

Use when the business benefits from energy and contrast. The redesign should
feel immediate and modern, not gamer, not neon everywhere.

### 4. Luxo Classico

Use when status, discretion and heritage matter. The redesign should feel
premium through restraint, not through fake gold or ornate clutter.

### 5. Confianca Tecnica

Use when the buyer needs evidence, expertise and process clarity. The redesign
should make the business easier to trust by showing how it works.

### 6. Conversao Direta

Use when the lead needs bookings, calls or quote requests. The redesign should
make action obvious without looking desperate or cheap.
