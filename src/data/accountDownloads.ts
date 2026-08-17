export interface AccountDownload {
  /* id do catálogo (screensCatalog/soundCatalog) */
  id: string;
  boughtDate: string;
  fileSizeMb: number;
}

/* pedidos mock do membro logado até existir conta real */
export const accountDownloads: AccountDownload[] = [
  { id: 'dark-city', boughtDate: '2026-08-14', fileSizeMb: 214 },
  { id: 'snd-001', boughtDate: '2026-08-14', fileSizeMb: 38 },
  { id: 'concrete', boughtDate: '2026-07-02', fileSizeMb: 160 },
];
