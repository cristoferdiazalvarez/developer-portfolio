# FlowTeam portfolio addition — review candidate

Date: 2026-11-14. Branch: `feat/add-flowteam`. Checkout: existing `DEVELOPER-PORTFOLIO` repository, not a duplicate. **No merge or production deployment.**

The third application itself is live at https://flowteam-ten.vercel.app; these portfolio changes remain for review. They add `/proyectos/flowteam` and `/en/projects/flowteam` using the same narrative structure as BusinessOS and Atelier Commerce.

## Changes and safeguards

- Complete ES/EN problem, approach, scope, architecture, decisions, results, limits, stack and authentic gallery.
- Project 03 in `lib/projects.ts`; copy/counts updated in both locales. Shared rendering, existing identity, self-hosted fonts, citrus accents and architecture retained.
- Cyclic BusinessOS → Atelier → FlowTeam → BusinessOS navigation, localized route switching, proper image alt text and source date.
- Three CreativeWork records, eight sitemap routes, localized canonical/hreflang, FlowTeam social capture and updated generic Open Graph content.
- Existing first-two project records are identical after serialization against origin/main, preserving every external link and translation. Their application checkouts and services were not modified.
- Five optimized WebP captures: 222,906 bytes total. Published source commit, SHA-256, dimensions and transformations: [manifest](flowteam-assets.json). No generated screenshots or invented UI.
- Polling is explicitly HTTP every 3 seconds, not WebSockets; about 1,200 requests per active-tab hour, plus authentication/actions, can consume free compute and transfer. Demo boundaries and pending features are stated.

## Executed checks

Local production build on `http://127.0.0.1:3201`, Node 22.23.5, existing dependencies/architecture:

| Check               | Result                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------- |
| ESLint / TypeScript | PASS                                                                                        |
| Vitest              | 9 passed                                                                                    |
| Next.js build       | PASS; 8 localized content pages generated                                                   |
| Playwright          | 57 passed, no skips; 36.1 seconds after the mobile fix                                      |
| axe + overflow      | 24 content-route/viewports checked, no selected WCAG A/AA violations or horizontal overflow |
| Keyboard            | Skip link, focus, mobile dialog/Escape and navigation passed                                |
| Project pages/links | All 3 cases, ES/EN, exact old and new demo/repository destinations passed                   |
| Gallery             | Existing/new image files present and rendered images load                                   |
| SEO                 | Canonical, languages, dedicated FlowTeam OG image, JSON-LD, 8 sitemap entries checked       |
| External HTTPS      | 3 demos + 3 GitHub repositories returned 200; [records](flowteam-external-links.json)       |

The first browser pass found a real mobile overlap: inherited percentage grid row gaps let the narrative cover the next-project link. The single-column case layout now has zero row gap, and regression assertions check next-project positioning for every case/locale. The suite then passed in all viewports without force-clicks or omitted cases.

These are desktop Chrome and tablet/mobile viewport emulations, not a physical-device/Safari or complete WCAG certification. The prior production/Lighthouse records are historical and have not been recast as validation of this undeployed branch.

## Real portfolio screenshots

- [Home preview](screenshots/home-preview.png), [Spanish desktop](screenshots/home-desktop.png), [English desktop](screenshots/home-english.png).
- [Tablet home](screenshots/home-tablet.png), [mobile home](screenshots/home-mobile.png).
- FlowTeam [desktop ES](screenshots/flowteam-case-desktop-es.png), [desktop EN](screenshots/flowteam-case-desktop-en.png), [tablet](screenshots/flowteam-case-tablet.png), [mobile ES](screenshots/flowteam-case-mobile-es.png), [mobile EN](screenshots/flowteam-case-mobile-en.png).
- Existing [BusinessOS](screenshots/businessos-case-desktop.png) and [Atelier](screenshots/atelier-case-mobile.png) portfolio captures regenerated as regression evidence.

All screenshots were captured from the local review build after the layout correction. They are not a production deployment of the new portfolio.
