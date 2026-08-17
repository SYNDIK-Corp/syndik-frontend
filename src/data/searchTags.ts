/* palavras-chave de humor/estilo por item, usadas só na busca.
   chave = SKU (estável — não muda se o nome/slug do produto mudar),
   maiúsculo pra bater com o SKU real do banco (SCR-001, SND-001...) */
export const searchTags: Record<string, string[]> = {
  'SCR-001': ['night', 'city', 'concrete', 'sodium'],
  'SCR-002': ['grain', 'noise', 'analog'],
  'SCR-003': ['brutalist', 'block', 'grey'],
  'SCR-005': ['smoke', 'haze', 'dark'],
  'SCR-006': ['grid', 'geometry', 'lines'],
  'SCR-012': ['night', 'train', 'motion'],
  'SND-001': ['trap', 'night', 'cover'],
  'SND-003': ['chrome', 'metal', 'album'],
  'SND-004': ['bass', '808', 'dark'],
  'SND-005': ['saint', 'gothic', 'album'],
};
