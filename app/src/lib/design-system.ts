import type { ScrapeResult } from "./firecrawl"

export interface DesignSystem {
  colors: { name: string; hex: string }[]
  typography: { heading: string; body: string }
  spacing: string
  raw?: unknown
}

export const SLOT_DESIGN_SYSTEMS: DesignSystem[] = [
  {
    colors: [
      { name: "Ink", hex: "#0E0E0E" },
      { name: "Canvas", hex: "#FFFFFF" },
      { name: "Slate", hex: "#6B7280" },
    ],
    typography: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    spacing: "4px base, section gaps generosos, hairline + espaco",
  },
  {
    colors: [
      { name: "Paper", hex: "#F6F1E9" },
      { name: "Ink", hex: "#1A1714" },
      { name: "Rust", hex: "#B23A2E" },
    ],
    typography: { heading: "Fraunces, Georgia, serif", body: "Inter, sans-serif" },
    spacing: "4px base, ritmo editorial assimetrico, leitura ate 680px",
  },
  {
    colors: [
      { name: "Action", hex: "#F2611B" },
      { name: "Ink", hex: "#18212E" },
      { name: "Go", hex: "#1FA871" },
    ],
    typography: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    spacing: "4px base, secoes curtas, CTA sempre proximo",
  },
]

const HEX_RE = /#[0-9a-fA-F]{3,8}/g
const FONT_FAMILY_RE = /font-family\s*:\s*([^;]+)/gi

function extractColors(html: string): { name: string; hex: string }[] {
  const found = new Map<string, string>()
  const styleRe = /style="([^"]*)"/gi
  let styleMatch: RegExpExecArray | null

  while ((styleMatch = styleRe.exec(html)) !== null) {
    const style = styleMatch[1]
    const colorRe = /(?:color|background(?:-color)?)\s*:\s*(#[0-9a-fA-F]{3,8})/gi
    let colorMatch: RegExpExecArray | null
    while ((colorMatch = colorRe.exec(style)) !== null) {
      const hex = colorMatch[1].toLowerCase()
      if (!found.has(hex)) found.set(hex, `Cor ${found.size + 1}`)
    }
  }

  const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []
  for (const block of styleBlocks) {
    const matches = block.match(HEX_RE) || []
    for (const hex of matches) {
      const h = hex.toLowerCase()
      if (!found.has(h) && found.size < 8) found.set(h, `Cor ${found.size + 1}`)
    }
  }

  if (found.size < 3) {
    const allHex = html.match(HEX_RE) || []
    for (const hex of allHex) {
      const h = hex.toLowerCase()
      if (!found.has(h) && found.size < 8) found.set(h, `Cor ${found.size + 1}`)
    }
  }

  return Array.from(found.entries()).slice(0, 8).map(([hex, name]) => ({ name, hex }))
}

function extractFonts(html: string): { heading: string; body: string } {
  const fonts = new Set<string>()
  const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []

  for (const block of styleBlocks) {
    let match: RegExpExecArray | null
    while ((match = FONT_FAMILY_RE.exec(block)) !== null) {
      const family = match[1].split(",")[0].trim().replace(/['"]/g, "")
      if (family && !family.startsWith("inherit")) fonts.add(family)
    }
  }

  const inlineRe = /font-family\s*:\s*([^;"]+)/gi
  let inlineMatch: RegExpExecArray | null
  while ((inlineMatch = inlineRe.exec(html)) !== null) {
    const family = inlineMatch[1].split(",")[0].trim().replace(/['"]/g, "")
    if (family) fonts.add(family)
  }

  const arr = Array.from(fonts)
  return {
    heading: arr[0] || "Inter, sans-serif",
    body: arr[1] || arr[0] || "Inter, sans-serif",
  }
}

export function extractDesignSystem(scrape: ScrapeResult): DesignSystem {
  const colors = extractColors(scrape.html)
  const typography = extractFonts(scrape.html)

  return {
    colors: colors.length > 0
      ? colors
      : [
          { name: "Primario", hex: "#333333" },
          { name: "Secundario", hex: "#666666" },
        ],
    typography,
    spacing: "16px base, 8px gutter",
    raw: {
      source: "original-site",
      role: "brand-hints-only",
    },
  }
}

export function createInitialSlotDesignSystems(scrape: ScrapeResult): DesignSystem[] {
  const extracted = extractDesignSystem(scrape)

  return SLOT_DESIGN_SYSTEMS.map((system, index) => ({
    ...system,
    colors: system.colors.map((color) => ({ ...color })),
    typography: { ...system.typography },
    raw: {
      slot: index + 1,
      source: "montra-slot-contract",
      originalSiteRole: "content, imagery, brand hints; not primary visual direction",
      extracted,
    },
  }))
}
