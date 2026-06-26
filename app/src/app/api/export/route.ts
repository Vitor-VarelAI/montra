import { NextRequest, NextResponse } from "next/server"
import { readSlotDesignContract } from "@/lib/design-contract"
import {
  readDesignSystem,
  readDesignSystems,
  readHtml,
  readMeta,
  readPhotoAssets,
  readSlotPrompts,
  readSourceData,
} from "@/lib/leads"
import { readGlobalRule, readSlotRule } from "@/lib/rules"
import { isValidSlot } from "@/lib/slots"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  const slotParam = req.nextUrl.searchParams.get("slot")
  const slot = slotParam ? Number(slotParam) : NaN

  if (!slug || !isValidSlot(slot)) {
    return NextResponse.json({ error: "slug e slot 1-3 obrigatórios" }, { status: 400 })
  }

  const meta = await readMeta(slug)
  if (!meta) return NextResponse.json({ error: "lead não encontrado" }, { status: 404 })

  const html = await readHtml(slug, slot)
  if (!html) return NextResponse.json({ error: "versão em falta" }, { status: 404 })

  const [designSystem, designSystems, globalRule, slotRule, designContract, slotPrompts, sourceData, photoAssets] =
    await Promise.all([
      readDesignSystem(slug),
      readDesignSystems<unknown[]>(slug),
      readGlobalRule(),
      readSlotRule(slot),
      readSlotDesignContract(slot),
      readSlotPrompts(slug),
      readSourceData(slug),
      readPhotoAssets<{ slot?: number }>(slug),
    ])

  const body = {
    type: "montra-slot-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    lead: meta,
    slot,
    html,
    designSystem: designSystems?.[slot - 1] || designSystem,
    designContract,
    rules: {
      global: globalRule,
      slot: slotRule,
    },
    userPrompt: slotPrompts[String(slot)] || "",
    photoAssets: photoAssets.filter((asset) => asset.slot === slot),
    source: sourceData || null,
  }

  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Disposition": `attachment; filename="${slug}-slot-${slot}-export.json"`,
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}
