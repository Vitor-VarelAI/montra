import { readSlotDesignContract } from "./design-contract"
import { readActiveSkillRules, readGlobalRule, readSlotRule } from "./rules"

export interface DesignSystem {
  colors: { name: string; hex: string }[]
  typography: { heading: string; body: string }
  spacing: string
  raw?: unknown
}

export async function buildSlotPrompt(
  slot: number,
  ds: DesignSystem,
  scrapedContent: string,
  images: string[],
  siteType: string,
  userPrompt?: string,
): Promise<string> {
  const designContract = await readSlotDesignContract(slot)
  const globalRule = await readGlobalRule()
  const slotRule = await readSlotRule(slot)
  const skills = await readActiveSkillRules(slot)

  const parts: string[] = []

  if (designContract) {
    parts.push("=== CONTRATO VISUAL DO SLOT (DESIGN.md) ===")
    parts.push(designContract)
    parts.push("")
  }

  parts.push("=== DESIGN SYSTEM APROVADO ===")
  parts.push(`Cores: ${ds.colors.map((c) => `${c.name} (${c.hex})`).join(", ")}`)
  parts.push(`Tipografia heading: ${ds.typography.heading}`)
  parts.push(`Tipografia body: ${ds.typography.body}`)
  parts.push(`Espaçamento: ${ds.spacing}`)
  parts.push("")

  parts.push("=== REGRA GLOBAL ===")
  parts.push(globalRule)
  parts.push("")

  parts.push(`=== REGRA DO SLOT ${slot} ===`)
  parts.push(slotRule)
  parts.push("")

  parts.push("=== PAPEL DO SITE ORIGINAL ===")
  parts.push("O site original serve como matéria-prima: conteúdo, imagens, oferta, prova, tom e pistas fracas de identidade.")
  parts.push("Não copies a direção visual, layout, hierarquia, paleta ou sistema tipográfico do site original.")
  parts.push("A direção visual principal vem do contrato visual do slot e do design system aprovado desta janela.")
  parts.push("")

  if (skills.length > 0) {
    parts.push("=== SKILLS DO SLOT ===")
    parts.push("Aplica estas skills como camada de oficio. Elas refinam a execução, não substituem o briefing, o conteúdo real, o design system nem a regra do slot.")
    for (const skill of skills) {
      parts.push("")
      parts.push(`--- skill:${skill.name} ---`)
      parts.push(skill.content)
    }
    parts.push("")
  }

  parts.push("=== CONTEÚDO DO SITE (usar isto, não inventar) ===")
  parts.push(scrapedContent.slice(0, 4000))
  parts.push("")

  parts.push("=== IMAGENS DISPONÍVEIS ===")
  parts.push(images.slice(0, 10).join("\n"))
  parts.push("")

  parts.push("=== TIPO DE SITE ===")
  parts.push(siteType)
  parts.push("")

  parts.push("=== INSTRUÇÕES DE SAÍDA ===")
  parts.push("Gera UM ficheiro HTML completo, self-contained, renderizável tal e qual.")
  parts.push("CSS inline ou em <style>, sem build, sem dependências externas (excepto CDNs de fontes).")
  parts.push("Usa o conteúdo real fornecido acima. Nada de lorem ipsum.")
  parts.push("Usa as URLs das imagens fornecidas. Marca com <!-- PHOTO:descricao --> onde uma foto")
  parts.push("deva ser substituída posteriormente.")
  parts.push("Respeita o design system aprovado. Respeita a regra global, a regra do slot e as skills do slot.")
  parts.push("Resposta: APENAS o HTML, sem explicações, sem markdown fences.")

  if (userPrompt) {
    parts.push("")
    parts.push("=== AJUSTE DO UTILIZADOR (soma-se à regra do slot, não substitui) ===")
    parts.push(userPrompt)
  }

  return parts.join("\n")
}
