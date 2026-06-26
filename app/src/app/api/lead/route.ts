import { NextRequest, NextResponse } from "next/server"
import { readMeta, readDesignSystem, readDesignSystems, readSlotPrompts, readSourceData } from "@/lib/leads"
import { promises as fs } from "fs"
import path from "path"

const LEADS_DIR = process.env.LEADS_DIR || path.join(process.cwd(), "..", "leads")

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  if (!slug) return NextResponse.json({ error: "slug obrigatório" }, { status: 400 })

  const meta = await readMeta(slug)
  if (!meta) return NextResponse.json({ error: "não encontrado" }, { status: 404 })

  const ds = await readDesignSystem(slug)
  const designSystems = await readDesignSystems(slug)
  const slotPrompts = await readSlotPrompts(slug)
  const sourceData = await readSourceData<{ images?: string[]; title?: string; description?: string; screenshotUrl?: string }>(slug)
  const contentPath = path.join(LEADS_DIR, slug, "source", "content.md")
  const content = await fs.readFile(contentPath, "utf-8").catch(() => "")

  return NextResponse.json({ ...meta, designSystem: ds, designSystems, slotPrompts, content: content.slice(0, 2000), ...(sourceData || {}) })
}
