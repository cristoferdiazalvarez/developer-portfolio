# Vercel deployment preparation

## NEXORA release — 2026-11-16

NEXORA was verified anonymously over HTTPS before this portfolio change: both full production E2E flows passed, including persistence, tenant isolation, employee permissions, PDF and mobile accessibility. Its live demo is https://nexora-eta-steel.vercel.app and source is https://github.com/cristoferdiazalvarez/nexora.

The fourth bilingual card and case study use real production captures with fictional data; provenance is recorded in `nexora-assets.json`. The original three project objects were compared against production commit `cbcd0a71c759dc70a90e87216e2ef30655b596e9` and remain byte-for-byte equivalent as serialized data. Shared components, styles, original assets and their links are preserved. ES/EN counts, sitemap and regression expectations now cover four projects.

Local validation: lint, strict TypeScript, formatting and nine unit tests passed. The production webpack build passed; local Turbopack was prevented by sandbox process/port restrictions. The normal Vercel build command remains unchanged. All 63 updated browser checks plus six new NEXORA-specific checks passed locally (69 total). Published and verified at https://developer-portfolio-plum-mu.vercel.app: all 69 tests passed anonymously on the final HTTPS domain (1.4 minutes), after the same 69 passed on the candidate URL. CI also passed with the unchanged Node 22 production build. See [nexora-release-verification.json](nexora-release-verification.json) for the exact commit, deployment and evidence. Older three-project candidate statements below describe historical stages.

Status: published and independently verified at https://developer-portfolio-plum-mu.vercel.app (Spanish) and https://developer-portfolio-plum-mu.vercel.app/en (English).

The owner approved a new isolated resource in the existing Vercel Hobby account with a zero-cost boundary: no paid service, card, billing activation or plan upgrade. The plan remained Hobby after deployment; other Vercel projects were compared before/after and stayed unchanged.

## Production configuration

- Project: developer-portfolio; framework Next.js; Node 22.x; root `.`.
- Install: npm ci. Build: npm run build. Framework default output.
- Production NEXT_PUBLIC_SITE_URL: https://developer-portfolio-plum-mu.vercel.app.
- NEXT_TELEMETRY_DISABLED: 1. No credentials or database variables are required.
- Provider-assigned vercel.app domain and automatic HTTPS certificate; no purchased/custom domain.
- Public production access enabled for this project only.

## Release method and future updates

The first release uploaded tracked runtime source to Vercel's REST API, then created a production deployment from source commit 1232724284d7bc0acb43cf9ffb47327719836eaa. Files under .local, credentials, .git, test artifacts and local environment files were excluded. The repository contains deployment configuration, while private authentication/session state is ignored.

The existing Vercel account has no GitHub integration. As a result, GitHub Actions runs on push, but a push alone currently does **not** update production. To enable automatic releases later, connect only cristoferdiazalvarez/developer-portfolio in this project's Git settings after reviewing the integration permissions. This is optional and has not been performed. Alternatively, authenticate to Vercel and deploy this same project using its official CLI/API; confirm Hobby, project identity and tracked publication contents first. Never target the existing application projects or enable a paid option.

After approval and release of the three-project candidate, verify the public origin, /en and six case routes; canonical/hreflang, robots, sitemap, social image, localized 404s and image assets. Run the 57 browser tests against the real domain only after that approved release:

```sh
PLAYWRIGHT_BASE_URL=https://developer-portfolio-plum-mu.vercel.app npm run test:e2e
PREVIEW_URL=https://developer-portfolio-plum-mu.vercel.app npm run screenshots
```

These commands target the public deployment and do not launch a local server. Historical November 13 production results: 26 tests passed; HTTP/TLS/metadata checks passed. The current three-project review candidate passes 57 checks locally and remains undeployed. See public-verification.json and VERIFICATION.md.

There are no migrations or application seeds. All portfolio text is static, and the screenshots refer to independently hosted demo applications. No Stripe, authentication or database credentials belong in this project's environment.

## Free-tier snapshot

Official documentation checked on 2026-11-13 lists Hobby as free, with 100 GB fast transfer, 1 million CDN requests and 5,000 image transformations included monthly, plus up to 200 projects and 100 deployments per day. Quotas apply to the account/team and are shared with its other usage. Exceeding a free-tier quota can pause the relevant feature; it is not an unlimited service. This portfolio does not require storage or a database. These figures describe current published allowances, not measured consumption or a promise of future availability. Sources: [Hobby plan](https://vercel.com/docs/plans/hobby), [limits](https://vercel.com/docs/limits).

## FlowTeam candidate — pending review, no production release

The `feat/add-flowteam` branch adds the third published application to the portfolio. It generates eight content routes (home plus three cases per locale), with FlowTeam at `/proyectos/flowteam` and `/en/projects/flowteam`, and 57 browser checks across desktop/tablet/mobile. The original release evidence above describes the two-case production version, not this candidate.

This work authorizes only a feature-branch push and pull request. No merge, Vercel deployment, hosting configuration change, resource creation, paid service or billing change is authorized/performed for the candidate. After separate approval to publish, release the reviewed portfolio commit through the existing project, then verify eight routes, eight sitemap entries, the three-case cycle and both locales. Never deploy the BusinessOS, Atelier or FlowTeam repositories as part of a portfolio update.
