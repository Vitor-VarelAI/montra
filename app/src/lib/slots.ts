export const SLOT_COUNT = 3

export const SLOT_NAMES = [
  "Minimalista Premium",
  "Editorial de Marca",
  "Conversao Direta",
] as const

export function allSlots(): number[] {
  return Array.from({ length: SLOT_COUNT }, (_, index) => index + 1)
}

export function isValidSlot(slot: number): boolean {
  return Number.isInteger(slot) && slot >= 1 && slot <= SLOT_COUNT
}
