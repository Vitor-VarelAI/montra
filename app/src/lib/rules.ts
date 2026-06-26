import { promises as fs } from "fs"
import path from "path"
import { SLOT_COUNT, isValidSlot } from "./slots"

const RULES_DIR = process.env.RULES_DIR || path.join(process.cwd(), "..", "rules")
const ACTIVE_PROMPT_SKILLS = process.env.ACTIVE_PROMPT_SKILLS || ""
const PROMPT_SKILLS_BY_SLOT = process.env.PROMPT_SKILLS_BY_SLOT || "2:storybrand;3:copywriter"
const SKILL_NAME_RE = /^[a-z0-9-]+$/

export interface PromptSkill {
  name: string
  content: string
}

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

function parseSkillList(value: string): string[] {
  return value
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .filter((name) => SKILL_NAME_RE.test(name))
}

function slotSkillNames(slot: number): string[] {
  for (const entry of PROMPT_SKILLS_BY_SLOT.split(";")) {
    const [slotValue, skillsValue = ""] = entry.split(":")
    if (Number(slotValue.trim()) === slot) return parseSkillList(skillsValue)
  }

  return []
}

function activeSkillNames(slot?: number): string[] {
  if (typeof slot === "number") return slotSkillNames(slot)

  const names = PROMPT_SKILLS_BY_SLOT.split(";").flatMap((entry) => parseSkillList(entry.split(":")[1] || ""))
  if (names.length > 0) return Array.from(new Set(names))

  return parseSkillList(ACTIVE_PROMPT_SKILLS)
}

export async function readSkillRule(name: string): Promise<string> {
  if (!SKILL_NAME_RE.test(name)) return ""

  try {
    return await fs.readFile(path.join(RULES_DIR, "skills", `${name}.md`), "utf-8")
  } catch {
    return ""
  }
}

export async function readActiveSkillRules(slot?: number): Promise<PromptSkill[]> {
  const skills = await Promise.all(
    activeSkillNames(slot).map(async (name) => ({
      name,
      content: await readSkillRule(name),
    })),
  )

  return skills.filter((skill) => skill.content.trim().length > 0)
}

export async function writeGlobalRule(content: string): Promise<void> {
  await fs.mkdir(RULES_DIR, { recursive: true })
  await fs.writeFile(path.join(RULES_DIR, "global.md"), content)
}

export async function writeSlotRule(slot: number, content: string): Promise<void> {
  if (!isValidSlot(slot)) throw new Error("slot inválido")
  const slotsDir = path.join(RULES_DIR, "slots")
  await fs.mkdir(slotsDir, { recursive: true })
  await fs.writeFile(path.join(slotsDir, `slot-${slot}.md`), content)
}

export async function readAllSlotRules(): Promise<string[]> {
  const rules: string[] = []
  for (let i = 1; i <= SLOT_COUNT; i++) {
    rules.push(await readSlotRule(i))
  }
  return rules
}
