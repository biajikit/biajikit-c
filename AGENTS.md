# AGENTS.md


This file provides guidance to OpenCode when working with code in this repository.

## Commands

```bash
# Development
npm start                 # Vite dev server (development mode, auto-opens browser)
npm run pre               # Vite dev server in production mode

# Build
npm run build             # Production build
npm run build-local       # Development build
npm run build-dev         # Dev environment build

# Lint & Type Check
npm run lint              # ESLint with auto-fix (targets .js/.jsx/.ts/.tsx etc.)
npm run type-check        # TypeScript type checking (uses vue-tsc — may need replacing with tsc)

# Preview
npm run preview           # Preview production build locally
```

## Architecture

This is a **multi-language (9 locales) restaurant/storefront web app** for BiajiKit, built with React 19 + TypeScript + Vite 8 + Tailwind CSS v4. The app displays an online menu with product cards, category navigation, shopping cart, and store information footer.

### Tech Stack
- **React 19** with TypeScript (strict mode)
- **Vite 8** as build tool
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (v4 uses CSS-first config, not `tailwind.config.js`)
- **react-router-dom v7** for routing
- **Axios** for HTTP requests
- **Package manager**: pnpm (lock file present, `packageManager` not pinned)

### Path Alias
`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

### Source Structure

```
src/
  main.tsx              # Entry point, mounts <App/>, imports global CSS
  App.tsx               # BrowserRouter with single route "/" → <Home/>
  env.d.ts              # ImportMetaEnv type declarations
  pages/Home.tsx        # Page composing all components
  components/           # Presentational components (PublicHeader, PublicFooter, GoodsCard, etc.)
  hooks/                # Global singleton hooks
  utils/
    request.ts          # Axios instance with interceptors
    api/                # API endpoint functions (goodsCard, shopRecommendCard, publicHeader)
  core/publicFn.ts      # localStorage/sessionStorage helpers (get/set/delete/clear)
  assets/
    dict/language.tsx   # i18n system (useLanguage hook, t() function with interpolation)
    dict/pageLanguage.ts # Language key definitions (9 supported languages)
    css/globals.css     # Tailwind v4 entry, custom breakpoints, CSS custom properties
    css/base.css        # Font face, scrollbar hiding, animation keyframes
    font/               # PingFang SC Bold TTF
    iconfont/           # Custom icon font (12 icons)
```

### Key Patterns

**Global Singleton State** — Both `useDialog` and `useLanguage` use a module-level singleton pattern. State is stored outside React (global variables) with a listener array; each component instance registers a `forceUpdate` callback. This means dialog/language changes propagate instantly across all mounted components without a context provider.

- `useDialog()` returns `{ showDialog, setDialog }`. Dialog types are string-based (e.g. `"language"`, `"cart"`, `"category"`). Setting the same type again closes it (toggle behavior). When open, body scroll is locked.
- `useLanguage()` returns `{ t, lang, abbreviation, langName, setLang }`. The `t()` function supports `{paramName}` interpolation with React nodes.

**useScrollTrigger()** (`hooks/useTriggerVisibility.tsx`) — Also a global singleton. Monitors a target element's visibility via scroll and ResizeObserver. Returns `{ isOutOfView, bindTarget }`.

**HTTP Client** (`utils/request.ts`) — Axios instance with:
- Base URL from `import.meta.env.VITE_PUBLIC_API_URL`
- Request interceptor appends `Token` (unless `whiteApi: true`), `Locale` (from localStorage key `"lang"`), `Domain` (hardcoded), and `Menu-Id` (from `VITE_PUBLIC_MENU_ID`)
- Response interceptor auto-clears token and reloads on error codes 10000003-10000006
- Custom config flags: `whiteApi` (skip auth header), `isLocationHref` (redirect instead of XHR)

**API endpoints** all use `POST` and are marked `whiteApi: true`.

### Environment Variables
- `VITE_PUBLIC_API_URL` — API base URL
- `VITE_PUBLIC_MENU_ID` — Menu ID sent as `Menu-Id` header