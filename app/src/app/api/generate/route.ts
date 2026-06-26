import { NextRequest, NextResponse } from "next/server"
import { generateHtml } from "@/lib/glm"
import { buildSlotPrompt } from "@/lib/prompt"
import { readMeta, readDesignSystem, readDesignSystems, readSourceData, saveHtml, saveSlotPrompt, writeMeta } from "@/lib/leads"
import { promises as fs } from "fs"
import path from "path"

const LEADS_DIR = process.env.LEADS_DIR || path.join(process.cwd(), "..", "leads")

export async function POST(req: NextRequest) {
  const body = await req.json()
  const slug: string = body.slug
  const slots: number[] = body.slots || [1, 2, 3, 4, 5, 6]
  const userPrompts: Record<number, string> = body.userPrompts || {}

  if (!slug) return NextResponse.json({ error: "slug obrigatório" }, { status: 400 })

  const meta = await readMeta(slug)
  if (!meta) return NextResponse.json({ error: "lead não encontrado" }, { status: 404 })

  const ds = await readDesignSystem<any>(slug)
  if (!ds) return NextResponse.json({ error: "design system em falta" }, { status: 400 })

  const designSystems = await readDesignSystems<any[]>(slug)
  const sourceData = await readSourceData<{ images?: string[] }>(slug)
  const content = await fs.readFile(path.join(LEADS_DIR, slug, "source", "content.md"), "utf-8").catch(() => "")

  await writeMeta(slug, { ...meta, status: "generating" })

  // Run slots in parallel
  const results = await Promise.allSettled(
    slots.map(async (slot) => {
      const userPrompt = userPrompts[slot] || ""
      if (userPrompt) await saveSlotPrompt(slug, slot, userPrompt)
      const promptText = await buildSlotPrompt(
        slot, designSystems?.[slot - 1] || ds, content, sourceData?.images || [], meta.siteType, userPrompt,
      )
      const result = await generateHtml(promptText)
      await saveHtml(slug, slot, result.html)
      return { slot, tokens: result.tokensUsed, ok: true }
    }),
  )

  const summary = results.map((r, i) => {
    const slot = slots[i]
    if (r.status === "fulfilled") return { slot, tokens: r.value.tokens, ok: true }
    return { slot, error: String(r.reason), ok: false }
  })

  const allOk = summary.every((s: any) => s.ok)
  await writeMeta(slug, { ...meta, status: allOk ? "done" : "ready" })

  return NextResponse.json({ slug, results: summary })
}
