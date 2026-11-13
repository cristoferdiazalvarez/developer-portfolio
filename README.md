# Cristofer Díaz Álvarez · Developer portfolio

[![Verify](https://github.com/cristoferdiazalvarez/developer-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/cristoferdiazalvarez/developer-portfolio/actions/workflows/ci.yml)

A bilingual personal portfolio for a Full Stack Developer based in Tenerife, Spain, seeking junior opportunities in Tenerife and remote work from Spain. Built around two real applications, their source code, architectural decisions and honest demo boundaries.

![Spanish home, captured from the production build](docs/screenshots/home-preview.png)

## Experience

- An original graphite, ivory and citrus editorial interface with self-hosted typography.
- Complete Spanish and English homes and case studies; switching languages preserves the selected project.
- Authentic screenshots of [BusinessOS](https://businessos-web-five.vercel.app) and [Atelier Commerce](https://atelier-commerce-two.vercel.app), with links to source and live demos.
- Case studies explain problems, architecture, decisions, verifiable outcomes and limitations. Demo figures are fictional; no employment history or business metrics are invented.
- Keyboard skip link, native mobile dialog with focus handling, reduced motion support, semantic landmarks and responsive images.
- Localized metadata, generated Open Graph image, Person/CreativeWork structured data, robots and domain-aware sitemap/canonical URLs.
- No database, authentication, contact-form service or external runtime API.

GitHub is the only confirmed contact channel. Email, LinkedIn and CV links remain hidden until the owner supplies confirmed public details or an authorized current file. Configure them in `lib/config.ts`; do not invent placeholders.

## Stack and architecture

Next.js App Router, React, strict TypeScript, Tailwind CSS 4, Motion and Lucide. Fonts are served locally through Fontsource. Vitest covers content/configuration contracts; Playwright and axe exercise the production build.

Two localized root layouts set the actual document language. Shared components render data from `lib/copy.ts` and `lib/projects.ts`. Next.js prerenders the six public content pages; unmatched routes render localized 404s. [Architecture](docs/ARCHITECTURE.md) · [Asset provenance](docs/SOURCES.md).

## Run locally

Use Node.js 22.19 or newer within the Node 22 release line, and npm:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3200`. No secrets or external service are required. `NEXT_PUBLIC_SITE_URL` can remain empty locally. On deployment, set it to the verified HTTPS origin and rebuild; this enables canonical/hreflang URLs, sitemap entries and absolute social URLs. No invented domain is embedded in production configuration.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chrome
npm run test:e2e
npm run format:check
npm audit --audit-level=high
npm run security:scan
```

The publication scanner checks tracked files, so run it after `git add` when adding content. E2E starts the production server automatically and uses Chrome for both desktop and emulated iPhone viewports. After starting `npm run start`, `npm run screenshots` captures real portfolio images into `docs/screenshots`.

## Validation

The initial implementation passed 6 Vitest tests and 24 Playwright tests on desktop and mobile, including 12 automated accessibility/overflow checks across both languages and all case studies. Automated axe checks support the WCAG 2.2 AA goal; they do not certify full conformance. See [verification](docs/VERIFICATION.md) and [progress](PROGRESS.md) for the final checks and limits.

<details>
<summary>Mobile screenshot</summary>

<img src="docs/screenshots/home-mobile.png" alt="Spanish portfolio on a 390-pixel mobile viewport" width="390" />

</details>

## Deployment status

The GitHub repository is the source publication. A new Vercel hosting resource requires separate owner approval and has not been created. The portfolio is **not yet verified at a public HTTPS URL**. [Deployment instructions](docs/DEPLOYMENT.md) describe the exact configuration and post-deploy checks. No paid service or database is needed.

## Project scope and rights

The existing BusinessOS and Atelier Commerce checkouts are read-only sources for this portfolio. Their infrastructure is separate. Third-party photographs visible inside Atelier screenshots retain their original rights; see [sources](docs/SOURCES.md). This repository does not grant a new license to those photographs or to personal identity assets.
