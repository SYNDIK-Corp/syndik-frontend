# Syndik — Frontend

Frontend da loja Syndik. React + TypeScript + Vite.

## Stack

- **React 19 + TypeScript + Vite**
- **styled-components** — estilos (com tema tipado)
- **react-router-dom** — rotas
- **i18next + react-i18next** — internacionalização (pt-BR, en, es)

## Arquitetura

```
src/
├── components/          # Atomic Design
│   ├── atoms/           # Elementos básicos (Button, Input, Text...)
│   ├── molecules/       # Combinações de átomos (LanguageSwitcher, SearchBar...)
│   ├── organisms/       # Seções completas (Header, ProductGrid...)
│   └── templates/       # Layouts de página
├── pages/               # Telas (uma pasta por tela)
├── hooks/               # Hooks customizados (useLanguage, ...)
├── lib/                 # Configuração de bibliotecas (i18n, api client, ...)
├── locales/             # Arquivos de tradução (um por idioma)
├── routes/              # Definição das rotas
└── styles/              # Tema, tokens e estilos globais
```

## Convenções

### Componentes e telas

Cada componente/tela é uma pasta com a **lógica separada do estilo**:

```
Button/
├── index.tsx   # lógica e markup
└── styles.ts   # estilos (styled-components)
```

Os estilos são importados como namespace: `import * as S from './styles'` e usados como `<S.Container>`.

### Textos e tradução

**Nenhum texto é escrito diretamente nos componentes.** Todo texto vai em `src/locales/<idioma>/translation.json` e é consumido com o hook `useTranslation`:

```tsx
const { t } = useTranslation();
<h1>{t('home.title')}</h1>
```

Para adicionar um idioma: criar a pasta em `locales/`, registrar em `src/lib/i18n/index.ts` (em `resources` e `supportedLanguages`).

### Imports

Usar o alias `@/` para caminhos absolutos a partir de `src/`:

```tsx
import { Button } from '@/components/atoms/Button';
```

### Tema

Cores, espaçamentos, fontes e raios ficam em `src/styles/theme.ts` — nunca hardcoded nos estilos. Acessar via `${({ theme }) => theme.colors.primary}`.

## Scripts

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run lint     # eslint
npm run preview  # preview do build
```
