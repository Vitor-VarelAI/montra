export interface PhotoTarget {
  originalUrl: string
  description: string
}

export interface PhotoReplacement extends PhotoTarget {
  generatedUrl: string
  width?: number
  height?: number
  requestId?: string
  model: string
  quality: string
}

const PHOTO_COMMENT_RE = /<!--\s*PHOTO:([^>]+?)-->/gi
const IMG_SRC_RE = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i
const ALL_IMG_RE = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi
const BG_IMAGE_RE = /background-image\s*:\s*url\(["']?([^"')]+)["']?\)/gi

function isUsefulPhoto(url: string, description = ""): boolean {
  const text = `${url} ${description}`.toLowerCase()
  return !/(logo|logotipo|favicon|icon|icone|sprite|svg)/.test(text)
}

function normalizeDescription(description: string): string {
  return description.replace(/\s+/g, " ").trim()
}

export function extractPhotoTargets(html: string, maxTargets: number): PhotoTarget[] {
  const targets: PhotoTarget[] = []
  const seen = new Set<string>()

  let commentMatch: RegExpExecArray | null
  while ((commentMatch = PHOTO_COMMENT_RE.exec(html)) !== null) {
    const description = normalizeDescription(commentMatch[1])
    const nearbyHtml = html.slice(commentMatch.index, commentMatch.index + 700)
    const imgMatch = nearbyHtml.match(IMG_SRC_RE)
    const originalUrl = imgMatch?.[1]
    if (!originalUrl || seen.has(originalUrl) || !isUsefulPhoto(originalUrl, description)) continue

    targets.push({ originalUrl, description })
    seen.add(originalUrl)
    if (targets.length >= maxTargets) return targets
  }

  let bgMatch: RegExpExecArray | null
  while ((bgMatch = BG_IMAGE_RE.exec(html)) !== null) {
    const originalUrl = bgMatch[1]
    if (seen.has(originalUrl) || !isUsefulPhoto(originalUrl)) continue
    targets.push({ originalUrl, description: "Imagem principal do primeiro viewport" })
    seen.add(originalUrl)
    if (targets.length >= maxTargets) return targets
  }

  let imgMatch: RegExpExecArray | null
  while ((imgMatch = ALL_IMG_RE.exec(html)) !== null) {
    const originalUrl = imgMatch[1]
    if (seen.has(originalUrl) || !isUsefulPhoto(originalUrl)) continue
    targets.push({ originalUrl, description: "Fotografia real do negocio" })
    seen.add(originalUrl)
    if (targets.length >= maxTargets) return targets
  }

  return targets
}

export function applyPhotoReplacements(html: string, replacements: PhotoReplacement[]): string {
  return replacements.reduce((nextHtml, replacement) => {
    return nextHtml.split(replacement.originalUrl).join(replacement.generatedUrl)
  }, html)
}
