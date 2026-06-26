import { promises as fs } from "fs"
import path from "path"
import { isValidSlot } from "./slots"

const LEADS_DIR = process.env.LEADS_DIR || path.join(process.cwd(), "..", "leads")

export interface LeadMeta {
  slug: string
  url?: string
  text?: string
  siteType: "website" | "webapp"
  createdAt: string
  status: "scraping" | "ready" | "generating" | "done"
}

export function leadsDir(): string {
  return LEADS_DIR
}

export function leadPath(slug: string): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("slug inválido")
  }

  return path.join(LEADS_DIR, slug)
}

export async function ensureLeadDir(slug: string): Promise<string> {
  const dir = leadPath(slug)
  await fs.mkdir(path.join(dir, "source"), { recursive: true })
  await fs.mkdir(path.join(dir, "versions"), { recursive: true })
  return dir
}

export async function writeMeta(slug: string, meta: LeadMeta): Promise<void> {
  const dir = leadPath(slug)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, "meta.json"), JSON.stringify(meta, null, 2))
}

export async function readMeta(slug: string): Promise<LeadMeta | null> {
  try {
    const raw = await fs.readFile(path.join(leadPath(slug), "meta.json"), "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function listLeads(): Promise<LeadMeta[]> {
  try {
    const entries = await fs.readdir(LEADS_DIR, { withFileTypes: true })
    const leads: LeadMeta[] = []
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith(".")) continue
      const meta = await readMeta(entry.name)
      if (meta) leads.push(meta)
    }
    return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return []
  }
}

export function slugFromUrl(url: string): string {
  try {
    const u = new URL(url)
    const parts = u.hostname.replace(/^www\./, "").split(".")
    const domain = parts[0].replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")
    const tld = parts[parts.length - 1].replace(/[^a-z]/g, "")
    return `${domain}-${tld}`.toLowerCase().replace(/^-+|-+$/g, "") || "lead"
  } catch {
    return url.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "lead"
  }
}

export async function saveHtml(slug: string, slot: number, html: string): Promise<void> {
  const dir = leadPath(slug)
  await fs.mkdir(path.join(dir, "versions"), { recursive: true })
  await fs.writeFile(path.join(dir, "versions", `slot-${slot}.html`), html)
}

export async function readHtml(slug: string, slot: number): Promise<string | null> {
  try {
    return await fs.readFile(path.join(leadPath(slug), "versions", `slot-${slot}.html`), "utf-8")
  } catch {
    return null
  }
}

export async function saveDesignSystem(slug: string, ds: unknown): Promise<void> {
  await fs.writeFile(path.join(leadPath(slug), "design-system.json"), JSON.stringify(ds, null, 2))
}

export async function readDesignSystem<T = unknown>(slug: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(leadPath(slug), "design-system.json"), "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function saveDesignSystems(slug: string, systems: unknown): Promise<void> {
  await fs.writeFile(path.join(leadPath(slug), "design-systems.json"), JSON.stringify(systems, null, 2))
}

export async function readDesignSystems<T = unknown>(slug: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(leadPath(slug), "design-systems.json"), "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function readSlotPrompts(slug: string): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(path.join(leadPath(slug), "slot-prompts.json"), "utf-8")
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export async function saveSlotPrompt(slug: string, slot: number, prompt: string): Promise<void> {
  if (!isValidSlot(slot)) throw new Error("slot inválido")
  const prompts = await readSlotPrompts(slug)
  prompts[String(slot)] = prompt
  await fs.writeFile(path.join(leadPath(slug), "slot-prompts.json"), JSON.stringify(prompts, null, 2))
}

export async function readPhotoAssets<T = unknown>(slug: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(leadPath(slug), "photo-assets.json"), "utf-8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function appendPhotoAssets(slug: string, assets: unknown[]): Promise<void> {
  const existing = await readPhotoAssets(slug)
  await fs.writeFile(path.join(leadPath(slug), "photo-assets.json"), JSON.stringify([...existing, ...assets], null, 2))
}

export async function saveSourceContent(slug: string, content: string): Promise<void> {
  await fs.writeFile(path.join(leadPath(slug), "source", "content.md"), content)
}

export async function saveSourceData(slug: string, data: unknown): Promise<void> {
  await fs.writeFile(path.join(leadPath(slug), "source", "data.json"), JSON.stringify(data, null, 2))
}

export async function readSourceData<T = unknown>(slug: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(path.join(leadPath(slug), "source", "data.json"), "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function saveScreenshot(slug: string, data: Buffer): Promise<void> {
  await fs.writeFile(path.join(leadPath(slug), "source", "screenshot.png"), data)
}
