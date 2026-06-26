import { NextRequest, NextResponse } from "next/server"
import { improvePhotoWithFal, type FalPhotoQuality } from "@/lib/fal-photos"
import { appendPhotoAssets, readHtml, readMeta, readSourceData, saveHtml } from "@/lib/leads"
import { applyPhotoReplacements, extractPhotoTargets, type PhotoReplacement } from "@/lib/photos"
import { isValidSlot } from "@/lib/slots"
import { promises as fs } from "fs"
import path from "path"

const LEADS_DIR = process.env.LEADS_DIR || path.join(process.cwd(), "..", "leads")
const QUALITIES = new Set(["low", "medium", "high"])

function parseQuality(value: unknown): FalPhotoQuality {
  return typeof value === "string" && QUALITIES.has(value) ? (value as FalPhotoQuality) : "medium"
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const slug: string = body.slug
  const slot = Number(body.slot)
  const maxImages = Math.max(1, Math.min(Number(body.maxImages) || 3, 6))
  const quality = parseQuality(body.quality)

  if (!slug || !isValidSlot(slot)) {
    return NextResponse.json({ error: "slug e slot 1-3 obrigatórios" }, { status: 400 })
  }

  const meta = await readMeta(slug)
  if (!meta) return NextResponse.json({ error: "lead não encontrado" }, { status: 404 })

  const html = await readHtml(slug, slot)
  if (!html) return NextResponse.json({ error: "gera a janela antes de melhorar fotos" }, { status: 400 })

  const targets = extractPhotoTargets(html, maxImages)
  if (targets.length === 0) {
    return NextResponse.json({ error: "não encontrei fotos úteis neste HTML" }, { status: 400 })
  }

  const sourceData = await readSourceData<{ title?: string; description?: string }>(slug)
  const content = await fs.readFile(path.join(LEADS_DIR, slug, "source", "content.md"), "utf-8").catch(() => "")
  const leadContext = [sourceData?.title, sourceData?.description, content.slice(0, 1200)].filter(Boolean).join("\n")

  const replacements: PhotoReplacement[] = []
  for (const target of targets) {
    replacements.push(await improvePhotoWithFal(target, leadContext, quality))
  }

  const nextHtml = applyPhotoReplacements(html, replacements)
  await saveHtml(slug, slot, nextHtml)
  await appendPhotoAssets(slug, replacements.map((asset) => ({ ...asset, slug, slot, createdAt: new Date().toISOString() })))

  return NextResponse.json({ slug, slot, replacements, html: nextHtml })
}
