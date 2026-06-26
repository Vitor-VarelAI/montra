import { NextRequest, NextResponse } from "next/server"
import { readHtml } from "@/lib/leads"
import { SLOT_COUNT, isValidSlot } from "@/lib/slots"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  const slot = req.nextUrl.searchParams.get("slot")
  const raw = req.nextUrl.searchParams.get("raw") === "1"

  if (!slug) return NextResponse.json({ error: "slug obrigatório" }, { status: 400 })

  if (slot) {
    const parsedSlot = parseInt(slot)
    if (!isValidSlot(parsedSlot)) return NextResponse.json({ error: "slot inválido" }, { status: 400 })

    const html = await readHtml(slug, parsedSlot)
    if (raw) return new NextResponse(html || "", { headers: { "Content-Type": "text/html; charset=utf-8" } })
    return NextResponse.json({ html })
  }

  const result: Record<string, string> = {}
  for (let i = 1; i <= SLOT_COUNT; i++) {
    const html = await readHtml(slug, i)
    if (html) result[`slot-${i}`] = html
  }
  return NextResponse.json(result)
}
