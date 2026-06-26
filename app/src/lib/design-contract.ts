import { promises as fs } from "fs"
import path from "path"
import { isValidSlot } from "./slots"

const DESIGN_DIR = process.env.DESIGN_DIR || path.join(process.cwd(), "..", "design")
const DESIGN_MD_PATH = process.env.DESIGN_MD_PATH || path.join(process.cwd(), "..", "DESIGN.md")

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, "").trim()
}

export async function readSlotDesignContract(slot: number): Promise<string> {
  if (!isValidSlot(slot)) return ""

  try {
    const slotContract = await fs.readFile(path.join(DESIGN_DIR, `slot-${slot}.md`), "utf-8")
    return stripFrontmatter(slotContract)
  } catch {
    try {
      return await fs.readFile(DESIGN_MD_PATH, "utf-8")
    } catch {
      return ""
    }
  }
}
