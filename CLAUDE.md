@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

There is no test framework configured. Type checking happens via `next build` / editor integration; the `tsconfig.json` sets `noEmit: true`.

## Stack & versions

- **Next.js 16.2.4** with the App Router (`app/`). Heed `AGENTS.md`: APIs and conventions diverge from older Next.js versions and from model training data — consult `node_modules/next/dist/docs/` (specifically `01-app/`) before making non-trivial changes.
- **React 19.2.4**, **TypeScript 5** (`strict`).
- **Tailwind CSS v4** via `@tailwindcss/postcss`. There is no `tailwind.config.{js,ts}` — config is inline in `app/globals.css` using `@import "tailwindcss"` and the `@theme` block. Do not add a v3-style config file.
- **Motion**: `framer-motion` and `gsap` are installed but not yet used.

## Conventions

- Path alias: `@/*` maps to the project root (see `tsconfig.json`).
- Theme tokens (`--background`, `--foreground`, `--font-sans`, `--font-geist-mono`) are defined in `app/globals.css` and injected as Tailwind utilities via `@theme inline`. Reference them through Tailwind classes (e.g. `bg-background`) or CSS vars rather than hard-coded colors.
- Fonts are loaded with `next/font/google` in `app/layout.tsx` and exposed as CSS variables on `<html>`.
- Dark mode is `prefers-color-scheme`-based (no `class="dark"` toggle wired up).
