# Montra Product Context

## Register

Product UI. This is an internal operator tool, not a marketing site.

## Working Name

The product name is Montra. The repository and some files may still reference
Prisma until the planned rename pass is completed.

## Purpose

Montra creates outbound redesign demos. The operator enters a lead website URL,
reviews or adjusts the extracted design system, then generates six redesign
versions of the same site in different visual directions.

The goal is the first visual hit: give Vitor a concrete redesign demo that can
open a conversation with a cold lead.

## User

Single operator: Vitor. The app runs on a headless Contabo VPS and is accessed
through a Cloudflare Tunnel.

## Core Flow

1. Enter a URL, or a short free-text description when there is no site.
2. Scrape content, images, screenshot, and design cues through FireCrawl.
3. Review and adjust six design systems, one per generated version.
4. Approve the six design systems.
5. Generate six self-contained HTML redesign versions through GLM-5.2.
6. Review the versions in a 3 by 2 grid with keyboard shortcuts 1 to 6.
7. Regenerate a single slot with an extra prompt when needed.
8. Persist each lead as a folder on disk.

## Product Principles

- PT-PT interface copy.
- Operator speed beats elaborate account, CRM, or sharing workflows.
- The filesystem is the source of truth for v1.
- Generated versions must be governed by three layers: approved slot design system,
  global rule file, and slot rule file.
- The design system review step is not decorative. It gives each slot its own
  visual direction and prevents every output from inheriting the old site's look.
- No code streaming in the UI. Show progress states and the rendered result.
- Cost awareness belongs in the interface because generation calls are paid.

## Interface Direction

The result view follows the Recast reference: restrained product UI, cream
background, compact top bar, large result context, and six rendered panels in a
3 by 2 grid.

The tool should feel quiet, fast, and operational. Avoid marketing-page
composition, oversized decorative cards, and generic SaaS ornament.

## Out Of Scope For V1

- Automatic outreach or sharing to the lead.
- CRM, billing, or Lume/Twenty integration.
- Elaborate historical database.
- Fine 4K photo production.
- Streaming generated code into the panels.

## Open Decisions

- Whether Montra generation should trigger the Hermes delegation-gate warning.
- Final six slot styles.
- Final global rule content.
- Target photo quality and cost tier for the fal GPT Image 2 step.
