"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [siteType, setSiteType] = useState<"website" | "webapp">("website")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, text, siteType }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro")
      router.push(`/lead/${data.slug}`)
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-light tracking-tight mb-2">Montra</h1>
        <p className="text-sm text-ink/60">
          Uma entrada, três saídas. Redesign de sites para outbound.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">URL do site</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://restaurante-exemplo.pt"
            className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-white focus:border-ink focus:outline-none transition"
          />
        </div>

        <div className="text-center text-sm text-ink/40">— ou —</div>

        <div>
          <label className="block text-sm font-medium mb-2">Descrição em texto</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Restaurante italiano em Lisboa, serve massas frescas, ambiente familiar..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-ink/20 bg-white focus:border-ink focus:outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tipo</label>
          <div className="flex gap-2">
            {(["website", "webapp"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSiteType(t)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  siteType === t
                    ? "bg-ink text-cream"
                    : "bg-white border border-ink/20 text-ink/70"
                }`}
              >
                {t === "website" ? "Website" : "Web app"}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || (!url && !text)}
          className="w-full py-3 rounded-lg bg-ink text-cream font-medium disabled:opacity-40 hover:opacity-90 transition"
        >
          {loading ? "A extrair..." : "Gerar"}
        </button>
      </form>

      <footer className="mt-12 text-center">
        <a href="/dashboard" className="text-sm text-ink/50 hover:text-ink underline">
          Trabalhos recentes
        </a>
      </footer>
    </main>
  )
}
