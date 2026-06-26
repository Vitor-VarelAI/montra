const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || ""
const FIRECRAWL_URL = "https://api.firecrawl.dev/v2"

export interface ScrapeResult {
  markdown: string
  html: string
  images: string[]
  title: string
  description: string
  screenshotUrl?: string
}

export async function scrapeUrl(url: string): Promise<ScrapeResult> {
  const res = await fetch(`${FIRECRAWL_URL}/scrape`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown", "html", "screenshot"],
      onlyMainContent: false,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`FireCrawl ${res.status}: ${text}`)
  }

  const json = await res.json()
  const data = json.data || json

  const images: string[] = []
  const html: string = data.html || ""
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi
  let m: RegExpExecArray | null
  while ((m = imgRegex.exec(html)) !== null) {
    const src = m[1]
    if (src.startsWith("http")) images.push(src)
  }

  return {
    markdown: data.markdown || "",
    html,
    images: [...new Set(images)].slice(0, 20),
    title: data.metadata?.title || "",
    description: data.metadata?.description || "",
    screenshotUrl: data.screenshot,
  }
}
