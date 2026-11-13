# Vercel deployment preparation

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

After each application release, verify the public origin, /en and four case routes; canonical/hreflang, robots, sitemap, social image, localized 404s and image assets. Run the 26 browser tests against the real domain:

```sh
PLAYWRIGHT_BASE_URL=https://developer-portfolio-plum-mu.vercel.app npm run test:e2e
PREVIEW_URL=https://developer-portfolio-plum-mu.vercel.app npm run screenshots
```

These commands target the public deployment and do not launch a local server. Current results: 26 tests passed; HTTP/TLS/metadata checks passed. See public-verification.json and VERIFICATION.md.

There are no migrations or application seeds. All portfolio text is static, and the screenshots refer to independently hosted demo applications. No Stripe, authentication or database credentials belong in this project's environment.

## Free-tier snapshot

Official documentation checked on 2026-11-13 lists Hobby as free, with 100 GB fast transfer, 1 million CDN requests and 5,000 image transformations included monthly, plus up to 200 projects and 100 deployments per day. Quotas apply to the account/team and are shared with its other usage. Exceeding a free-tier quota can pause the relevant feature; it is not an unlimited service. This portfolio does not require storage or a database. These figures describe current published allowances, not measured consumption or a promise of future availability. Sources: [Hobby plan](https://vercel.com/docs/plans/hobby), [limits](https://vercel.com/docs/limits).
