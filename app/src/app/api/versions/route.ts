import { NextRequest, NextResponse } from "next/server"
import { readHtml } from "@/lib/leads"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  const slot = req.nextUrl.searchParams.get("slot")
  const raw = req.nextUrl.searchParams.get("raw") === "1"

  if (!slug) return NextResponse.json({ error: "slug obrigatório" }, { status: 400 })

  if (slot) {
    const html = await readHtml(slug, parseInt(slot))
    if (raw) {
      return new NextResponse(html || "", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      })
    }
    return NextResponse.json({ html })
  }

  // All slots
  const result: Record<string, string> = {}
  for (let i = 1; i <= 6; i++) {
    const html = await readHtml(slug, i)
    if (html) result[`slot-${i}`] = html
  }
  return NextResponse.json(result)
}
