import { NextRequest, NextResponse } from "next/server"
import { scrapeUrl } from "@/lib/firecrawl"
import { createInitialSlotDesignSystems, extractDesignSystem } from "@/lib/design-system"
import { slugFromUrl, ensureLeadDir, writeMeta, saveSourceContent, saveSourceData, saveDesignSystem, saveDesignSystems, type LeadMeta } from "@/lib/leads"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const url: string = body.url
  const text: string = body.text || ""
  const siteType: "website" | "webapp" = body.siteType || "website"

  if (!url && !text) {
    return NextResponse.json({ error: "URL ou texto obrigatório" }, { status: 400 })
  }

  const slug = url ? slugFromUrl(url) : text.slice(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, "-")
  await ensureLeadDir(slug)

  let scrape
  if (url) {
    try {
      scrape = await scrapeUrl(url)
      await saveSourceContent(slug, scrape.markdown)
    } catch (e) {
      return NextResponse.json({ error: `FireCrawl falhou: ${e}` }, { status: 502 })
    }
  } else {
    scrape = { markdown: text, html: "", images: [], title: "", description: "" }
    await saveSourceContent(slug, text)
  }

  const ds = extractDesignSystem(scrape)
  const designSystems = createInitialSlotDesignSystems(scrape)
  const meta: LeadMeta = {
    slug,
    url,
    text,
    siteType,
    createdAt: new Date().toISOString(),
    status: "ready",
  }
  await saveDesignSystem(slug, ds)
  await saveDesignSystems(slug, designSystems)
  await saveSourceData(slug, {
    images: scrape.images,
    title: scrape.title,
    description: scrape.description,
    screenshotUrl: scrape.screenshotUrl,
  })
  await writeMeta(slug, meta)

  return NextResponse.json({
    slug,
    designSystem: ds,
    designSystems,
    content: scrape.markdown.slice(0, 2000),
    images: scrape.images,
    title: scrape.title,
  })
}
