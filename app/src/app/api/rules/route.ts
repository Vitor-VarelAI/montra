import { NextRequest, NextResponse } from "next/server"
import { readAllSlotRules, readGlobalRule, writeGlobalRule, writeSlotRule } from "@/lib/rules"

export async function GET() {
  const [globalRule, slotRules] = await Promise.all([readGlobalRule(), readAllSlotRules()])
  return NextResponse.json({ globalRule, slotRules })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const globalRule = typeof body.globalRule === "string" ? body.globalRule : null
  const slotRules = Array.isArray(body.slotRules) ? body.slotRules : null

  if (globalRule === null && slotRules === null) {
    return NextResponse.json({ error: "globalRule ou slotRules obrigatório" }, { status: 400 })
  }

  const writes: Promise<void>[] = []

  if (globalRule !== null) writes.push(writeGlobalRule(globalRule))
  if (slotRules) {
    for (let i = 0; i < Math.min(slotRules.length, 6); i++) {
      if (typeof slotRules[i] === "string") writes.push(writeSlotRule(i + 1, slotRules[i]))
    }
  }

  await Promise.all(writes)
  return NextResponse.json({ ok: true })
}
