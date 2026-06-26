---
version: alpha
name: Montra Trio Design Index
description: App UI tokens and canonical index for the three stable Montra redesign slots.
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
slots:
  minimalista-premium:
    slot: 1
    displayName: Minimalista Premium
    contract: design/slot-1.md
  editorial-de-marca:
    slot: 2
    displayName: Editorial de Marca
    contract: design/slot-2.md
  conversao-direta:
    slot: 3
    displayName: Conversao Direta
    contract: design/slot-3.md
---

## Overview

Montra uses a fixed trio of redesign directions. The trio is stable across leads:

1. Minimalista Premium: make the business feel clearer, calmer and more expensive.
2. Editorial de Marca: make the business feel storied, atmospheric and memorable.
3. Conversao Direta: make the business easier to contact, book or buy from now.

The rich canonical contracts live in `design/slot-1.md`, `design/slot-2.md` and
`design/slot-3.md`. This file is the index and the app UI token source.

## Colors

The Montra app shell remains restrained so the generated sites carry the visual
weight. Slot colors are governed by the slot contracts:

- Slot 1: near-monochrome ink, canvas and slate.
- Slot 2: warm paper, ink and rust.
- Slot 3: action orange, ink and confirmation green.

## Typography

The app UI uses Inter and compact product hierarchy. Generated typography is
defined per slot:

- Slot 1: mono-sans with tight display tracking.
- Slot 2: serif display plus sans body for storytelling.
- Slot 3: heavy sans headlines for conversion.

## Layout

The comparison view is a 3 by 1 grid: three outputs side by side on desktop,
stacked on mobile. Every generated slot must still work as a full standalone
website when opened through "Ver site".

## Components

The app supports:

- Three slot design-system editors.
- Global and per-slot rule editors.
- Per-slot prompt adjustment.
- Per-slot generation, export and fal photo improvement.

## Do's and Don'ts

Do:

- Keep the three outputs visibly different.
- Treat the extracted site design as reference, not authority.
- Use the rich contract from `design/slot-N.md` in the generation prompt.
- Keep factual content grounded in the scraped source.

Do not:

- Generate three variants or leave stale slot 4-6 controls in the UI.
- Produce three recolors of the same layout.
- Invent facts, awards, reviews, people or years.
- Hide prompt/rule/design-system controls from the operator.
