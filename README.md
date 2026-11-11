# JerrySki

Pre-launch landing page for JerrySki, a brand building affordable ski and snowboard gear, built with Next.js, Tailwind CSS and GSAP.

**Status:** deprecated. The site is a single-page "Coming soon" placeholder.

## Features

- Full-screen hero with the logo, a "Coming soon" badge and an animated snowfall
- Scrolling slogan marquee, followed by About, Goal, Contact and Socials sections
- Scroll-triggered GSAP animations for each section, which replay when you jump to a section from the navigation
- Navigation bar that appears once you scroll, with a slide-out menu on small screens
- Contact section with an email (mailto) button
- Socials section with an Instagram link and a button that copies the brand hashtag to the clipboard
- Custom 404 page that redirects to the home page after 3 seconds
- Home page animations are skipped for visitors who prefer reduced motion
- Search and social metadata (Open Graph and Twitter card) in `app/layout.tsx`

## Tech stack

- Next.js 16.2.4 (App Router), React 19.2.4 and TypeScript 5
- Tailwind CSS 4 with `tw-animate-css`
- shadcn/ui components (`base-nova` style) built on Base UI (`@base-ui/react`), with `lucide-react` icons, `class-variance-authority`, `clsx` and `tailwind-merge`
- GSAP 3 with ScrollTrigger and `@gsap/react`
- Geist and Geist Mono fonts through `next/font/google`
- ESLint 9 with `eslint-config-next`
- GitHub Actions for building and deploying to a VPS

## Getting started

### Prerequisites

- Node.js 20.9 or later (required by Next.js 16; the deploy workflow uses Node.js 22)
- npm

### Installation

```bash
npm ci
```

### Configuration

The site doesn't read any environment variables.

### Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

There is no test suite. Type errors are caught by `npm run build`.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. Installs dependencies and runs a production build on Node.js 22, so a broken build stops the deploy.
2. Connects to the VPS over SSH. In `/var/www/jerryski` it hard-resets to `origin/main`, runs `npm ci` and `npm run build`, and restarts the `jerryski` systemd service.
3. Checks that `http://localhost:3000` responds on the server, then that `https://jerryski.com` responds.

It needs these repository secrets: `SSH_KEY`, `HOST` and `USER`.

Notes: the server set-up itself (the `jerryski` systemd unit and any reverse proxy) is not in this repository.

## How it works

- `app/layout.tsx` loads the fonts and sets the metadata and theme colour. `app/page.tsx` puts the page together from the components in `components/site/`.
- `components/site/section.tsx` is the shared section layout. It splits each heading into words so they can be animated one by one.
- Each animated section (`about.tsx`, `goal.tsx`, `contact.tsx` and `socials.tsx`) builds a paused GSAP timeline. A ScrollTrigger plays it once, when the section enters the viewport.
- `components/site/use-replay-on-hash.ts` defines a `jerryski:section-reset` window event. The navigation bar fires it when a link is clicked, which rewinds the target section so its animation plays again.
- `components/site/snowfall.tsx` animates 50 flakes (24 on screens narrower than 768px) and pauses them when the hero is off-screen. The contact button's "buzz" animation pauses in the same way.
- `components/ui/` holds the shadcn/ui primitives (button, card and sheet). `components.json` is the shadcn/ui configuration.
- `app/globals.css` defines the Tailwind theme tokens, including the brand orange (`#FF6B00`) and yellow accent, plus the marquee animation and reduced-motion rules.

## Project structure

```text
.
├── .github/workflows/   Build and VPS deploy workflow
├── app/                 Root layout, home page, 404 page and global styles
├── components/
│   ├── site/            Page sections, navigation and animation helpers
│   └── ui/              shadcn/ui primitives
├── lib/                 Shared helpers (the cn class-name utility)
├── public/              Logo and wordmark images
├── scripts/             make-placeholders.cjs (writes placeholder logo images)
├── AGENTS.md            Notes for AI coding assistants
└── CLAUDE.md            Commands and conventions for AI coding assistants
```

## Notes

- `framer-motion` is listed in `package.json` but not imported anywhere, and `components/site/reveal.tsx` is not used.
- `scripts/make-placeholders.cjs` overwrites `public/wordmark.png` and `public/main-logo.png` with solid orange placeholder images. It is not part of the build, so only run it if you want placeholders.
