const OPENCODE_GO_API_KEY = process.env.OPENCODE_GO_API_KEY || ""
const GLM_BASE_URL = process.env.OPENCODE_GO_BASE_URL || "https://opencode.ai/zen/go/v1"
const GLM_MODEL = process.env.GLM_MODEL || "glm-5.2"

export interface GenResult {
  html: string
  tokensUsed: number
}

export async function generateHtml(
  prompt: string,
  opts?: { signal?: AbortSignal },
): Promise<GenResult> {
  const res = await fetch(`${GLM_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENCODE_GO_API_KEY,
    },
    body: JSON.stringify({
      model: GLM_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 8192,
    }),
    signal: opts?.signal,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GLM ${res.status}: ${text}`)
  }

  const json = await res.json()
  const content: string = json.choices?.[0]?.message?.content || ""
  const tokens: number = json.usage?.total_tokens || 0

  const htmlMatch = content.match(/```html\n([\s\S]*?)```/)
  const html = htmlMatch ? htmlMatch[1].trim() : content.trim()

  return { html, tokensUsed: tokens }
}
