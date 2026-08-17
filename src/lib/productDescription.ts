export interface DescriptionBlock {
  label?: string;
  body: string;
}

const LABELED_BLOCK = /^(At a glance|License):\s*(.*)$/s;

/* toda descrição real de Drop segue o mesmo formato de 4 parágrafos
   (copy narrativa, detalhe do pack, "At a glance: ...", "License: ...")
   separados por linha em branco — parseado aqui pra dar hierarquia visual
   distinta às duas últimas linhas (ficha técnica) sem guardar HTML/markdown
   no banco. */
export function parseDescription(text: string): DescriptionBlock[] {
  return text
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const match = block.match(LABELED_BLOCK);
      return match ? { label: match[1], body: match[2] } : { body: block };
    });
}
