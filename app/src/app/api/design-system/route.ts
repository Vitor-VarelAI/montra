import { NextRequest, NextResponse } from "next/server"
import { readMeta, saveDesignSystem, saveDesignSystems, writeMeta } from "@/lib/leads"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const slug: string = body.slug
  const designSystem = body.designSystem
  const designSystems = body.designSystems

  if (!slug || (!designSystem && !designSystems)) return NextResponse.json({ error: "slug e designSystem/designSystems obrigatórios" }, { status: 400 })

  const meta = await readMeta(slug)
  if (!meta) return NextResponse.json({ error: "lead não encontrado" }, { status: 404 })

  if (designSystem) await saveDesignSystem(slug, designSystem)
  if (designSystems) await saveDesignSystems(slug, designSystems)
  await writeMeta(slug, { ...meta, status: "ready" })

  return NextResponse.json({ ok: true })
}
