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
      { name: "Fundo", hex: "#ffffff" },
      { name: "Texto", hex: "#111111" },
      { name: "Acento", hex: "#6b7280" },
    ],
    typography: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    spacing: "24px base, grelha limpa, muito branco",
  },
  {
    colors: [
      { name: "Papel", hex: "#f7f4ef" },
      { name: "Tinta", hex: "#16213e" },
      { name: "Editorial", hex: "#b33a3a" },
    ],
    typography: { heading: "Georgia, serif", body: "Inter, sans-serif" },
    spacing: "20px base, margens editoriais, ritmo de revista",
  },
  {
    colors: [
      { name: "Noite", hex: "#0f1115" },
      { name: "Texto", hex: "#f2f4f8" },
      { name: "Energia", hex: "#78d64b" },
    ],
    typography: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    spacing: "18px base, blocos densos, contraste forte",
  },
  {
    colors: [
      { name: "Oxblood", hex: "#4b1117" },
      { name: "Marfim", hex: "#fbfaf7" },
      { name: "Metal", hex: "#c19a4a" },
    ],
    typography: { heading: "Georgia, serif", body: "Inter, sans-serif" },
    spacing: "28px base, composição premium, secções generosas",
  },
  {
    colors: [
      { name: "Verde", hex: "#0f6b4f" },
      { name: "Claro", hex: "#f8fbf8" },
      { name: "Azul", hex: "#1f7a8c" },
    ],
    typography: { heading: "Inter, sans-serif", body: "Inter, sans-serif" },
    spacing: "16px base, layout vivo, módulos práticos",
  },
  {
    colors: [
      { name: "Terracota", hex: "#a0472d" },
      { name: "Grafite", hex: "#202124" },
      { name: "Claro", hex: "#ffffff" },
    ],
    typography: { heading: "Arial, sans-serif", body: "Inter, sans-serif" },
    spacing: "22px base, landing comercial, CTA forte",
  },
]

const CSS_COLOR_RE = /(?:color|background(?:-color)?|border(?:-color)?)\s*:\s*(#[0-9a-fA-F]{3,8}|rgb[a]?\([^)]+\)|[a-z]+)/gi
const HEX_RE = /#[0-9a-fA-F]{3,8}/g
const FONT_FAMILY_RE = /font-family\s*:\s*([^;]+)/gi

function extractColors(html: string): { name: string; hex: string }[] {
  const found = new Map<string, string>()

  // From inline styles
  let m: RegExpExecArray | null
  const styleRe = /style="([^"]*)"/gi
  let styleMatch: RegExpExecArray | null
  while ((styleMatch = styleRe.exec(html)) !== null) {
    const style = styleMatch[1]
    let colorMatch: RegExpExecArray | null
    const colorRe = /(?:color|background(?:-color)?)\s*:\s*(#[0-9a-fA-F]{3,8})/gi
    while ((colorMatch = colorRe.exec(style)) !== null) {
      const hex = colorMatch[1].toLowerCase()
      if (!found.has(hex)) found.set(hex, `Cor ${found.size + 1}`)
    }
  }

  // From <style> blocks
  const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []
  for (const block of styleBlocks) {
    const matches = block.match(HEX_RE) || []
    for (const hex of matches) {
      const h = hex.toLowerCase()
      if (!found.has(h)) found.set(h, `Cor ${found.size + 1}`)
    }
  }

  // Fallback: scan whole HTML for hex colors
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

  // From style blocks
  const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || []
  for (const block of styleBlocks) {
    let m: RegExpExecArray | null
    while ((m = FONT_FAMILY_RE.exec(block)) !== null) {
      const family = m[1].split(",")[0].trim().replace(/['"]/g, "")
      if (family && !family.startsWith("inherit")) fonts.add(family)
    }
  }

  // From inline styles
  const inlineRe = /font-family\s*:\s*([^;"]+)/gi
  let m: RegExpExecArray | null
  while ((m = inlineRe.exec(html)) !== null) {
    const family = m[1].split(",")[0].trim().replace(/['"]/g, "")
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
    colors: colors.length > 0 ? colors : [{ name: "Primário", hex: "#333333" }, { name: "Secundário", hex: "#666666" }],
    typography,
    spacing: "16px base, 8px gutter",
  }
}

export function createInitialSlotDesignSystems(scrape: ScrapeResult): DesignSystem[] {
  const extracted = extractDesignSystem(scrape)

  return SLOT_DESIGN_SYSTEMS.map((system, index) => ({
    ...system,
    raw: {
      slot: index + 1,
      source: "montra-default",
      extracted,
    },
  }))
}
