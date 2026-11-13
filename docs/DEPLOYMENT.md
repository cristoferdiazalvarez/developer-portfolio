# Vercel deployment preparation

Status: prepared, not deployed. The owner explicitly requires confirmation before creating a new hosting resource for this portfolio. Existing BusinessOS and Atelier Commerce projects must not be modified. No database, Neon project, paid plan, card or billing activation is needed.

After approval:

1. Use the owner's existing Vercel account. Create a **new** project named `developer-portfolio`, importing `cristoferdiazalvarez/developer-portfolio`, branch `main`, root directory `.`. Do not relink either existing application.
2. Select Next.js and Node 22.x. Install `npm ci`; build `npm run build`; use the framework's default output. `vercel.json` already records the framework/build settings.
3. Check that the account and intended personal non-commercial use meet the current Hobby terms before creating the project. See the official [Hobby plan](https://vercel.com/docs/plans/hobby) and [limits](https://vercel.com/docs/limits). Terms and quotas can change. Do not accept a paid upgrade or enable billing.
4. Let Vercel assign the actual project HTTPS domain. Set `NEXT_PUBLIC_SITE_URL` to that exact origin, without a trailing path, in production. Rebuild/redeploy so sitemap, canonical/hreflang and Open Graph use that real URL. Preview deployments should not publish a production canonical unless intentionally configured.
5. Inspect the deployment logs. Fetch the public HTTPS homepage, `/en`, both Spanish/English case studies, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` and an unknown route. Verify valid HTTPS, successful assets, correct languages, canonical URLs and a real 404 response.
6. Run Playwright and Lighthouse against the public deployment as a separate verification. Check desktop/mobile, keyboard menu/skip link, external links, image loading and reduced motion. Local results do not prove hosting behavior.
7. Update the repository homepage, README and PROGRESS with the verified deployment URL and actual results only after these checks.

There are no migrations or application seeds. All portfolio text is static, and the screenshots refer to independently hosted demo applications. No Stripe, authentication or database credentials belong in this project's environment.

## Free-tier snapshot

Official documentation checked on 2026-11-13 lists Hobby as free, with 100 GB fast transfer, 1 million CDN requests and 5,000 image transformations included monthly, plus up to 200 projects and 100 deployments per day. Quotas apply to the account/team and are shared with its other usage. Exceeding a free-tier quota can pause the relevant feature; it is not an unlimited service. This portfolio does not require storage or a database. These figures describe current published allowances, not measured consumption or a promise of future availability. Sources: [Hobby plan](https://vercel.com/docs/plans/hobby), [limits](https://vercel.com/docs/limits).
