# Montra Product Context

## Register

Product UI. This is an internal operator tool, not a marketing site.

## Working Name

The product name is Montra. Documentation and the app package use Montra. The
repository folder (`projects/prisma`) remains unchanged for path stability.

## Purpose

Montra creates outbound redesign demos. The operator enters a lead website URL,
reviews or adjusts the extracted design system, then generates three redesign
versions of the same site in distinct visual directions.

The goal is the first visual hit: give Vitor a concrete redesign demo that can
open a conversation with a cold lead.

## User

Single operator: Vitor. The app runs on a headless Contabo VPS and is accessed
through a Cloudflare Tunnel.

## Core Flow

1. Enter a URL, or a short free-text description when there is no site.
2. Scrape content, images, screenshot, and design cues through FireCrawl.
3. Review and adjust three design systems, one per generated version.
4. Approve the three design systems.
5. Generate three self-contained HTML redesign versions through GLM-5.2 via OpenCode Zen.
6. Review the versions in a 3 by 1 grid with keyboard shortcuts 1 to 3.
7. Regenerate a single slot with an extra prompt when needed.
8. Improve selected slot photos through fal/GPT Image 2.
9. Export the chosen slot with HTML, design system, rules, prompt and assets.
10. Persist each lead as a folder on disk.

## Product Principles

- PT-PT interface copy.
- Operator speed beats account, CRM, or sharing workflows.
- The filesystem is the source of truth for v1.
- Generated versions are governed by approved slot design system, global rule,
  slot rule, rich slot contract in `design/slot-N.md`, and optional user prompt.
- The design system review step gives each slot its own visual direction and
  prevents every output from inheriting the old site's look.
- No code streaming in the UI. Show progress states and the rendered result.
- Cost awareness belongs in the interface because generation calls are paid.

## Interface Direction

The result view follows the Recast reference but with three stable outputs:
restrained product UI, cream background, compact top bar, large result context,
and three rendered panels in a 3 by 1 grid.

The tool should feel quiet, fast, and operational. Avoid marketing-page
composition, oversized decorative cards, and generic SaaS ornament.

## Stable Slot Trio

1. Minimalista Premium: makes the business feel clearer, calmer and more expensive.
2. Editorial de Marca: makes the business feel storied, atmospheric and memorable.
3. Conversao Direta: makes the business easier to contact, book or buy from now.

Parked references live in `rules/slots/_parked/`.

## Runtime

The app calls external APIs directly:

- FireCrawl for extraction.
- OpenCode Zen for GLM-5.2-compatible HTML generation.
- fal for GPT Image 2 photo improvement.

The runtime does not call Hermes or any agent; Hermes is only a code-authoring
workflow convention.

## Out Of Scope For V1

- Automatic outreach or sharing to the lead.
- CRM, billing, or Lume/Twenty integration.
- Elaborate historical database.
- Fine 4K photo production.
- Streaming generated code into the panels.

## Open Decisions

- Target photo quality and cost tier for the fal GPT Image 2 step.
