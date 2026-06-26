"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import type { DesignSystem } from "@/lib/design-system"
import { SLOT_COUNT, SLOT_NAMES, allSlots } from "@/lib/slots"

interface SlotState {
  html: string | null
  loading: boolean
  photoLoading: boolean
  tokens: number
  error: string
  prompt: string
}

export default function LeadPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const slug = params.slug

  const [ds, setDs] = useState<DesignSystem | null>(null)
  const [designSystems, setDesignSystems] = useState<DesignSystem[]>([])
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"design" | "rules" | "grid">("design")
  const [slots, setSlots] = useState<SlotState[]>(
    Array.from({ length: SLOT_COUNT }, () => ({ html: null, loading: false, photoLoading: false, tokens: 0, error: "", prompt: "" })),
  )
  const [globalRule, setGlobalRule] = useState("")
  const [slotRules, setSlotRules] = useState<string[]>(Array.from({ length: SLOT_COUNT }, () => ""))
  const [generating, setGenerating] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [dsEdited, setDsEdited] = useState(false)
  const [rulesEdited, setRulesEdited] = useState(false)
  const [savingRules, setSavingRules] = useState(false)
  const [activeDesignSlot, setActiveDesignSlot] = useState(0)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    fetchLeadData()
  }, [])

  async function fetchLeadData() {
    const res = await fetch(`/api/lead?slug=${slug}`)
    const data = await res.json()
    if (data.designSystem) setDs(data.designSystem)
    if (data.designSystems?.length) {
      setDesignSystems(data.designSystems.slice(0, SLOT_COUNT))
    } else if (data.designSystem) {
      setDesignSystems(Array.from({ length: SLOT_COUNT }, () => data.designSystem))
    }
    if (data.content) setContent(data.content)
    if (data.images) setImages(data.images)
    await fetchRules()

    // Check if versions exist
    const versionsRes = await fetch(`/api/versions?slug=${slug}`)
    const versionsData = await versionsRes.json()
    setSlots((prev) =>
      prev.map((slotState, index) => ({
        ...slotState,
        html: versionsData[`slot-${index + 1}`] || slotState.html,
        prompt: data.slotPrompts?.[String(index + 1)] || slotState.prompt,
      })),
    )
  }

  async function fetchRules() {
    const res = await fetch("/api/rules")
    if (!res.ok) return
    const data = await res.json()
    setGlobalRule(data.globalRule || "")
    if (data.slotRules?.length) setSlotRules(data.slotRules)
  }

  async function saveRules() {
    setSavingRules(true)
    try {
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ globalRule, slotRules }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro")
      setRulesEdited(false)
    } finally {
      setSavingRules(false)
    }
  }

  function slotPromptPayload() {
    return slots.reduce<Record<number, string>>((acc, slotState, index) => {
      if (slotState.prompt.trim()) acc[index + 1] = slotState.prompt.trim()
      return acc
    }, {})
  }

  async function approveAndGenerate() {
    setGenerating(true)
    if (rulesEdited) await saveRules()
    // Save DS
    await fetch("/api/design-system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, designSystem: ds, designSystems }),
    })
    setActiveTab("grid")

    // Generate all slots
    const prompts = slotPromptPayload()
    const promises = allSlots().map(async (slot) => {
      setSlots((prev) => {
        const next = [...prev]
        next[slot - 1] = { ...next[slot - 1], loading: true, error: "" }
        return next
      })
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, slots: [slot], userPrompts: prompts }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Erro")
        const htmlRes = await fetch(`/api/versions?slug=${slug}&slot=${slot}`)
        const htmlData = await htmlRes.json()
        setSlots((prev) => {
          const next = [...prev]
          next[slot - 1] = {
            ...next[slot - 1],
            loading: false,
            html: htmlData.html,
            tokens: data.results?.[0]?.tokens || 0,
          }
          return next
        })
      } catch (e: any) {
        setSlots((prev) => {
          const next = [...prev]
          next[slot - 1] = { ...next[slot - 1], loading: false, error: e.message }
          return next
        })
      }
    })
    await Promise.allSettled(promises)
    setGenerating(false)
  }

  async function regenerateSlot(slot: number) {
    if (rulesEdited) await saveRules()
    await fetch("/api/design-system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, designSystem: ds, designSystems }),
    })
    setSlots((prev) => {
      const next = [...prev]
      next[slot - 1] = { ...next[slot - 1], loading: true, error: "" }
      return next
    })
    try {
      const userPrompt = slots[slot - 1].prompt
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, slots: [slot], userPrompts: { [slot]: userPrompt } }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro")
      const htmlRes = await fetch(`/api/versions?slug=${slug}&slot=${slot}`)
      const htmlData = await htmlRes.json()
      setSlots((prev) => {
        const next = [...prev]
        next[slot - 1] = {
          ...next[slot - 1],
          loading: false,
          html: htmlData.html,
          tokens: data.results?.[0]?.tokens || 0,
          prompt: "",
        }
        return next
      })
    } catch (e: any) {
      setSlots((prev) => {
        const next = [...prev]
        next[slot - 1] = { ...next[slot - 1], loading: false, error: e.message }
        return next
      })
    }
  }

  async function exportSlot(slot: number) {
    await fetch("/api/design-system", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, designSystem: ds, designSystems }),
    })
    if (rulesEdited) await saveRules()
    window.open(`/api/export?slug=${slug}&slot=${slot}`, "_blank", "noopener,noreferrer")
  }

  async function improveSlotPhotos(slot: number) {
    setSlots((prev) => {
      const next = [...prev]
      next[slot - 1] = { ...next[slot - 1], photoLoading: true, error: "" }
      return next
    })

    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, slot, maxImages: 3, quality: "medium" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro")
      setSlots((prev) => {
        const next = [...prev]
        next[slot - 1] = { ...next[slot - 1], html: data.html, photoLoading: false }
        return next
      })
    } catch (e: any) {
      setSlots((prev) => {
        const next = [...prev]
        next[slot - 1] = { ...next[slot - 1], photoLoading: false, error: e.message }
        return next
      })
    }
  }

  function updateDesignSystem(slotIndex: number, next: DesignSystem) {
    setDesignSystems((prev) => {
      const copy = [...prev]
      copy[slotIndex] = next
      return copy
    })
    setDsEdited(true)
  }

  // Keyboard shortcuts 1-3
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const n = parseInt(e.key)
      if (n >= 1 && n <= SLOT_COUNT) {
        setSelectedSlot(n - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const activeDs = designSystems[activeDesignSlot] || ds

  if (!activeDs) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-ink/50">A carregar...</p>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Topo */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")} className="text-sm text-ink/50 hover:text-ink">
            ← Recomeçar
          </button>
          <span className="text-ink/30">·</span>
          <h2 className="text-lg font-medium">Montra · {slug}</h2>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-ink/10">
        <button
          onClick={() => setActiveTab("design")}
          className={`px-4 py-2 text-sm border-b-2 transition ${
            activeTab === "design" ? "border-ink font-medium" : "border-transparent text-ink/50"
          }`}
        >
          Design System
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          className={`px-4 py-2 text-sm border-b-2 transition ${
            activeTab === "rules" ? "border-ink font-medium" : "border-transparent text-ink/50"
          }`}
        >
          Regras
        </button>
        <button
          onClick={() => setActiveTab("grid")}
          className={`px-4 py-2 text-sm border-b-2 transition ${
            activeTab === "grid" ? "border-ink font-medium" : "border-transparent text-ink/50"
          }`}
        >
          Grid 3×1
        </button>
      </div>

      {/* Design System tab */}
      {activeTab === "design" && (
        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-medium mb-3 uppercase text-ink/60">Sistemas por janela</h3>
            <p className="mb-4 max-w-2xl text-sm text-ink/55">
              O URL original serve para conteúdo, imagens e pistas de marca. A direção visual vem dos três sistemas Montra.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {designSystems.map((system, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveDesignSlot(i)}
                  className={`rounded-lg border px-3 py-2 text-left transition ${
                    activeDesignSlot === i ? "border-ink bg-white" : "border-ink/10 bg-white/60 text-ink/60"
                  }`}
                >
                  <span className="block text-xs font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block text-xs truncate">{SLOT_NAMES[i]}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Cores */}
          <section>
            <h3 className="text-sm font-medium mb-3 uppercase text-ink/60">Cores · {SLOT_NAMES[activeDesignSlot]}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {activeDs.colors.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-ink/10">
                  <div
                    className="w-10 h-10 rounded shrink-0 border border-ink/10"
                    style={{ background: c.hex }}
                  />
                  <div className="min-w-0">
                    <input
                      value={c.name}
                      onChange={(e) => {
                        updateDesignSystem(activeDesignSlot, {
                          ...activeDs,
                          colors: activeDs.colors.map((cc, j) => j === i ? { ...cc, name: e.target.value } : cc),
                        })
                      }}
                      className="text-sm font-medium block w-full bg-transparent"
                    />
                    <input
                      value={c.hex}
                      onChange={(e) => {
                        updateDesignSystem(activeDesignSlot, {
                          ...activeDs,
                          colors: activeDs.colors.map((cc, j) => j === i ? { ...cc, hex: e.target.value } : cc),
                        })
                      }}
                      className="text-xs text-ink/50 block w-full bg-transparent font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tipografia */}
          <section>
            <h3 className="text-sm font-medium mb-3 uppercase text-ink/60">Tipografia</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-4 border border-ink/10">
                <label className="text-xs text-ink/50 mb-1 block">Heading</label>
                <input
                  value={activeDs.typography.heading}
                  onChange={(e) => {
                    updateDesignSystem(activeDesignSlot, {
                      ...activeDs,
                      typography: { ...activeDs.typography, heading: e.target.value },
                    })
                  }}
                  className="text-lg font-medium w-full bg-transparent"
                />
              </div>
              <div className="bg-white rounded-lg p-4 border border-ink/10">
                <label className="text-xs text-ink/50 mb-1 block">Body</label>
                <input
                  value={activeDs.typography.body}
                  onChange={(e) => {
                    updateDesignSystem(activeDesignSlot, {
                      ...activeDs,
                      typography: { ...activeDs.typography, body: e.target.value },
                    })
                  }}
                  className="text-base w-full bg-transparent"
                />
              </div>
            </div>
          </section>

          {/* Espaçamento */}
          <section>
            <h3 className="text-sm font-medium mb-3 uppercase text-ink/60">Espaçamento</h3>
            <input
              value={activeDs.spacing}
              onChange={(e) => {
                updateDesignSystem(activeDesignSlot, { ...activeDs, spacing: e.target.value })
              }}
              className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-white"
            />
          </section>

          {/* Imagens extraídas */}
          {images.length > 0 && (
            <section>
              <h3 className="text-sm font-medium mb-3 uppercase text-ink/60">Imagens extraídas</h3>
              <div className="flex gap-2 flex-wrap">
                {images.slice(0, 12).map((src, i) => (
                  <img key={i} src={src} alt="" className="w-20 h-20 object-cover rounded border border-ink/10" />
                ))}
              </div>
            </section>
          )}

          {/* Aprovar */}
          <div className="pt-4">
            <button
              onClick={approveAndGenerate}
              disabled={generating}
              className="px-8 py-3 rounded-lg bg-ink text-cream font-medium disabled:opacity-40 transition"
            >
              {generating ? "A gerar..." : dsEdited ? "Aprovar e gerar 3 versões" : "Aprovar e gerar 3 versões"}
            </button>
          </div>
        </div>
      )}

      {/* Rules tab */}
      {activeTab === "rules" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-medium mb-3 uppercase text-ink/60">Janelas</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {SLOT_NAMES.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setActiveDesignSlot(i)
                    setSelectedSlot(i)
                  }}
                  className={`rounded-lg border px-3 py-2 text-left transition ${
                    activeDesignSlot === i ? "border-ink bg-white" : "border-ink/10 bg-white/60 text-ink/60"
                  }`}
                >
                  <span className="block text-xs font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block text-xs truncate">{name}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium uppercase text-ink/60">Regra global</h3>
                {rulesEdited && <span className="text-xs text-ink/40">Alterada</span>}
              </div>
              <textarea
                value={globalRule}
                onChange={(e) => {
                  setGlobalRule(e.target.value)
                  setRulesEdited(true)
                }}
                rows={18}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 font-mono text-xs leading-5 resize-y"
              />
            </section>

            <section>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium uppercase text-ink/60">
                  Regra · {SLOT_NAMES[activeDesignSlot]}
                </h3>
                <span className="text-xs text-ink/40">Slot {activeDesignSlot + 1}</span>
              </div>
              <textarea
                value={slotRules[activeDesignSlot] || ""}
                onChange={(e) => {
                  const next = [...slotRules]
                  next[activeDesignSlot] = e.target.value
                  setSlotRules(next)
                  setRulesEdited(true)
                }}
                rows={18}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 font-mono text-xs leading-5 resize-y"
              />
            </section>
          </div>

          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase text-ink/60">
                Prompt específico · {SLOT_NAMES[activeDesignSlot]}
              </h3>
              <span className="text-xs text-ink/40">Soma-se ao slot {activeDesignSlot + 1}</span>
            </div>
            <textarea
              value={slots[activeDesignSlot]?.prompt || ""}
              onChange={(e) => {
                const next = [...slots]
                next[activeDesignSlot] = { ...next[activeDesignSlot], prompt: e.target.value }
                setSlots(next)
              }}
              rows={4}
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm resize-y"
              placeholder='Ex: mais verde, muda o header, torna o CTA mais direto'
            />
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={saveRules}
              disabled={savingRules || !rulesEdited}
              className="px-4 py-2 rounded-lg border border-ink/15 bg-white text-sm font-medium disabled:opacity-40"
            >
              {savingRules ? "A guardar..." : "Guardar regras"}
            </button>
            <button
              onClick={() => regenerateSlot(activeDesignSlot + 1)}
              disabled={slots[activeDesignSlot]?.loading}
              className="px-4 py-2 rounded-lg bg-ink text-cream text-sm font-medium disabled:opacity-40"
            >
              {slots[activeDesignSlot]?.html ? "Refazer esta janela" : "Gerar esta janela"}
            </button>
            <button
              onClick={approveAndGenerate}
              disabled={generating}
              className="px-4 py-2 rounded-lg bg-ink/90 text-cream text-sm font-medium disabled:opacity-40"
            >
              {generating ? "A gerar..." : "Gerar 3 versões"}
            </button>
          </div>
        </div>
      )}

      {/* Grid tab */}
      {activeTab === "grid" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-ink/60">Clica numa janela para inspecionar. Teclas 1 a 3.</p>
            <div className="flex gap-3 text-xs text-ink/50">
              <span>{generating ? "A gerar..." : "Pronto"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {slots.map((s, i) => (
              <div
                key={i}
                className={`bg-white rounded-lg border overflow-hidden transition ${
                  selectedSlot === i ? "border-ink shadow-lg" : "border-ink/10"
                }`}
                onClick={() => setSelectedSlot(i)}
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-ink/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ink/40" />
                    <span className="text-xs font-medium">
                      {String(i + 1).padStart(2, "0")} {SLOT_NAMES[i]}
                    </span>
                  </div>
                  {s.tokens > 0 && <span className="text-xs text-ink/40">{s.tokens.toLocaleString()} tok</span>}
                </div>

                {s.html && (
                  <div className="flex justify-between gap-2 px-3 py-2 border-b border-ink/10 bg-cream/40">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(`/api/versions?slug=${slug}&slot=${i + 1}&raw=1`, "_blank", "noopener,noreferrer")
                        }}
                        className="text-xs font-medium text-ink hover:underline"
                      >
                        Ver site
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          exportSlot(i + 1)
                        }}
                        className="text-xs font-medium text-ink hover:underline"
                      >
                        Exportar
                      </button>
                      <button
                        type="button"
                        disabled={s.photoLoading}
                        onClick={(e) => {
                          e.stopPropagation()
                          improveSlotPhotos(i + 1)
                        }}
                        className="text-xs font-medium text-ink hover:underline disabled:opacity-40"
                      >
                        {s.photoLoading ? "Fotos..." : "Melhorar fotos"}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveTab("rules")
                        setActiveDesignSlot(i)
                        setSelectedSlot(i)
                      }}
                      className="text-xs text-ink/60 hover:text-ink"
                    >
                      Ajustar
                    </button>
                  </div>
                )}

                {/* Card body */}
                <div className="aspect-[4/3] bg-cream/50 overflow-hidden">
                  {s.loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: "120ms" }} />
                        <span className="w-2 h-2 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: "240ms" }} />
                      </div>
                    </div>
                  ) : s.html ? (
                    <iframe
                      srcDoc={s.html}
                      className="w-full h-full border-0 pointer-events-none"
                      sandbox="allow-same-origin"
                      title={`Slot ${i + 1}`}
                    />
                  ) : s.error ? (
                    <div className="flex items-center justify-center h-full p-4 text-center text-xs text-red-600">
                      {s.error}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-ink/30">
                      Sem versão
                    </div>
                  )}
                </div>

                {/* Card footer: per-slot prompt */}
                {selectedSlot === i && s.html && !s.loading && (
                  <div className="p-3 border-t border-ink/10 space-y-2">
                    <textarea
                      value={s.prompt}
                      onChange={(e) => {
                        const next = [...slots]
                        next[i] = { ...next[i], prompt: e.target.value }
                        setSlots(next)
                      }}
                      placeholder={`Ajustar slot ${i + 1} (ex: \"mais verde\", \"muda o header\")...`}
                      rows={2}
                      className="w-full px-2 py-1.5 text-xs rounded border border-ink/20 bg-white resize-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        regenerateSlot(i + 1)
                      }}
                      className="text-xs px-3 py-1.5 rounded bg-ink text-cream"
                    >
                      Refazer slot {i + 1}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
