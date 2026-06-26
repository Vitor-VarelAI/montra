import { promises as fs } from "fs"
import path from "path"

const DESIGN_MD_PATH =
  process.env.DESIGN_MD_PATH || path.join(process.cwd(), "..", "DESIGN.md")

type SlotContract = {
  displayName?: string
  primaryUse?: string
  palette?: string
  typography?: string
  layout?: string
  avoid?: string
}

function cleanValue(value: string): string {
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/^\[(.*)\]$/, "$1")
    .replace(/"/g, "")
}

function extractFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/)
  return match?.[1] || ""
}

function extractSlotContract(frontmatter: string, slot: number): SlotContract | null {
  const lines = frontmatter.split("\n")
  let inSlots = false
  let current: SlotContract | null = null
  let currentMatches = false

  for (const line of lines) {
    if (line === "slots:") {
      inSlots = true
      continue
    }

    if (!inSlots) continue
    if (/^[a-zA-Z]/.test(line)) break

    const slotKey = line.match(/^  [a-z0-9-]+:\s*$/)
    if (slotKey) {
      if (currentMatches) return current
      current = {}
      currentMatches = false
      continue
    }

    if (!current) continue

    const field = line.match(/^    ([A-Za-z]+):\s*(.+)$/)
    if (!field) continue

    const [, key, rawValue] = field
    const value = cleanValue(rawValue)

    if (key === "slot") currentMatches = Number(value) === slot
    if (key === "displayName") current.displayName = value
    if (key === "primaryUse") current.primaryUse = value
    if (key === "palette") current.palette = value
    if (key === "typography") current.typography = value
    if (key === "layout") current.layout = value
    if (key === "avoid") current.avoid = value
  }

  return currentMatches ? current : null
}

function extractSlotProse(markdown: string, slot: number): string {
  const match = markdown.match(
    new RegExp(`### ${slot}\\. [^\\n]+\\n\\n([\\s\\S]*?)(?=\\n### \\d\\. |\\n*$)`),
  )
  return match?.[1]?.trim() || ""
}

export async function readSlotDesignContract(slot: number): Promise<string> {
  try {
    const markdown = await fs.readFile(DESIGN_MD_PATH, "utf-8")
    const contract = extractSlotContract(extractFrontmatter(markdown), slot)
    const prose = extractSlotProse(markdown, slot)

    if (!contract && !prose) return ""

    const lines = [
      `Slot ${slot}: ${contract?.displayName || "Sem nome"}`,
      contract?.primaryUse ? `Uso principal: ${contract.primaryUse}` : "",
      contract?.palette ? `Paleta: ${contract.palette}` : "",
      contract?.typography ? `Tipografia: ${contract.typography}` : "",
      contract?.layout ? `Layout: ${contract.layout}` : "",
      contract?.avoid ? `Evitar: ${contract.avoid}` : "",
      prose ? `Criterio: ${prose}` : "",
    ]

    return lines.filter(Boolean).join("\n")
  } catch {
    return ""
  }
}
