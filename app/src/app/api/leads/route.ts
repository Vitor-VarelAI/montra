import { NextRequest, NextResponse } from "next/server"
import { listLeads, readMeta } from "@/lib/leads"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  if (slug) {
    const meta = await readMeta(slug)
    if (!meta) return NextResponse.json({ error: "não encontrado" }, { status: 404 })
    return NextResponse.json(meta)
  }
  const leads = await listLeads()
  return NextResponse.json({ leads })
}
