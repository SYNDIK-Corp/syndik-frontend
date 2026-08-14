/* cupons mock até a validação vir do backend */
const DISCOUNT_CODES: Record<string, number> = {
  SYNDIK10: 0.1,
  DROP20: 0.2,
  FIRSTCUT: 0.15,
};

export function getDiscountRate(code: string): number | null {
  return DISCOUNT_CODES[code.trim().toUpperCase()] ?? null;
}
