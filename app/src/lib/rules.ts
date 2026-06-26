import { promises as fs } from "fs"
import path from "path"

const RULES_DIR = process.env.RULES_DIR || path.join(process.cwd(), "..", "rules")

export async function readGlobalRule(): Promise<string> {
  try {
    return await fs.readFile(path.join(RULES_DIR, "global.md"), "utf-8")
  } catch {
    return ""
  }
}

export async function readSlotRule(slot: number): Promise<string> {
  try {
    return await fs.readFile(path.join(RULES_DIR, "slots", `slot-${slot}.md`), "utf-8")
  } catch {
    return ""
  }
}

export async function writeGlobalRule(content: string): Promise<void> {
  await fs.mkdir(RULES_DIR, { recursive: true })
  await fs.writeFile(path.join(RULES_DIR, "global.md"), content)
}

export async function writeSlotRule(slot: number, content: string): Promise<void> {
  if (slot < 1 || slot > 6) throw new Error("slot inválido")
  const slotsDir = path.join(RULES_DIR, "slots")
  await fs.mkdir(slotsDir, { recursive: true })
  await fs.writeFile(path.join(slotsDir, `slot-${slot}.md`), content)
}

export async function readAllSlotRules(): Promise<string[]> {
  const rules: string[] = []
  for (let i = 1; i <= 6; i++) {
    rules.push(await readSlotRule(i))
  }
  return rules
}
