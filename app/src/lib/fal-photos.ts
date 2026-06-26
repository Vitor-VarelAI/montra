import { fal } from "@fal-ai/client"
import type { PhotoTarget, PhotoReplacement } from "./photos"

type FalImage = {
  url: string
  width?: number
  height?: number
}

type FalImageResult = {
  data?: {
    images?: FalImage[]
  }
  requestId?: string
}

export type FalPhotoQuality = "low" | "medium" | "high"

const EDIT_MODEL = "openai/gpt-image-2/edit"
const TEXT_MODEL = "openai/gpt-image-2"

function requireFalKey(): string {
  const key = process.env.FAL_KEY
  if (!key) throw new Error("FAL_KEY em falta")
  fal.config({ credentials: key })
  return key
}

function buildPrompt(target: PhotoTarget, leadContext: string): string {
  return [
    `Melhora esta fotografia para uma demo de website comercial em PT-PT.`,
    `Descricao da imagem: ${target.description}.`,
    leadContext ? `Contexto do negocio: ${leadContext.slice(0, 900)}.` : "",
    "Mantem o negocio reconhecivel e fiel ao conteudo real.",
    "Fotografia realista, luz natural, composicao editorial, qualidade de campanha local premium.",
    "Nao adicionar texto, logotipos inventados, pessoas identificaveis novas, premios, moradas ou factos nao fornecidos.",
  ]
    .filter(Boolean)
    .join("\n")
}

export async function improvePhotoWithFal(
  target: PhotoTarget,
  leadContext: string,
  quality: FalPhotoQuality,
): Promise<PhotoReplacement> {
  requireFalKey()

  const result = (await fal.subscribe(EDIT_MODEL, {
    input: {
      prompt: buildPrompt(target, leadContext),
      image_urls: [target.originalUrl],
      image_size: "auto",
      quality,
      num_images: 1,
      output_format: "webp",
    },
    logs: false,
  })) as FalImageResult

  const image = result.data?.images?.[0]
  if (!image?.url) throw new Error("fal não devolveu imagem")

  return {
    ...target,
    generatedUrl: image.url,
    width: image.width,
    height: image.height,
    requestId: result.requestId,
    model: EDIT_MODEL,
    quality,
  }
}

export async function generatePhotoWithFal(
  description: string,
  leadContext: string,
  quality: FalPhotoQuality,
): Promise<Omit<PhotoReplacement, "originalUrl">> {
  requireFalKey()

  const result = (await fal.subscribe(TEXT_MODEL, {
    input: {
      prompt: buildPrompt({ originalUrl: "", description }, leadContext),
      image_size: "landscape_4_3",
      quality,
      num_images: 1,
      output_format: "webp",
    },
    logs: false,
  })) as FalImageResult

  const image = result.data?.images?.[0]
  if (!image?.url) throw new Error("fal não devolveu imagem")

  return {
    description,
    generatedUrl: image.url,
    width: image.width,
    height: image.height,
    requestId: result.requestId,
    model: TEXT_MODEL,
    quality,
  }
}
