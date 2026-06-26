"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface LeadMeta {
  slug: string
  url?: string
  text?: string
  siteType: string
  createdAt: string
  status: string
}

export default function Dashboard() {
  const [leads, setLeads] = useState<LeadMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data.leads || [])
        setLoading(false)
      })
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light">Trabalhos recentes</h1>
        <Link href="/" className="text-sm text-ink/50 hover:text-ink underline">
          Novo redesign
        </Link>
      </header>

      {loading ? (
        <p className="text-ink/50">A carregar...</p>
      ) : leads.length === 0 ? (
        <p className="text-ink/50">Ainda não há trabalhos. Mete um URL para começar.</p>
      ) : (
        <div className="grid gap-3">
          {leads.map((lead) => (
            <Link
              key={lead.slug}
              href={`/lead/${lead.slug}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-ink/10 hover:border-ink/30 transition"
            >
              <div>
                <p className="font-medium">{lead.url || lead.text?.slice(0, 50)}</p>
                <p className="text-xs text-ink/40">{lead.slug} · {new Date(lead.createdAt).toLocaleDateString("pt-PT")}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                lead.status === "done" ? "bg-green-100 text-green-700" :
                lead.status === "generating" ? "bg-yellow-100 text-yellow-700" :
                "bg-gray-100 text-gray-600"
              }`}>
                {lead.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}