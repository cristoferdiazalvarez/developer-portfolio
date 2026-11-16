# Verification record

## NEXORA release — 2026-11-16

NEXORA was verified anonymously over HTTPS before this portfolio change: both full production E2E flows passed, including persistence, tenant isolation, employee permissions, PDF and mobile accessibility. Its live demo is https://nexora-eta-steel.vercel.app and source is https://github.com/cristoferdiazalvarez/nexora.

The fourth bilingual card and case study use real production captures with fictional data; provenance is recorded in `nexora-assets.json`. The original three project objects were compared against production commit `cbcd0a71c759dc70a90e87216e2ef30655b596e9` and remain byte-for-byte equivalent as serialized data. Shared components, styles, original assets and their links are preserved. ES/EN counts, sitemap and regression expectations now cover four projects.

Local validation: lint, strict TypeScript, formatting and nine unit tests passed. The production webpack build passed; local Turbopack was prevented by sandbox process/port restrictions. The normal Vercel build command remains unchanged. All 63 updated browser checks plus six new NEXORA-specific checks passed locally (69 total). Published and verified at https://developer-portfolio-plum-mu.vercel.app: all 69 tests passed anonymously on the final HTTPS domain (1.4 minutes), after the same 69 passed on the candidate URL. CI also passed with the unchanged Node 22 production build. See [nexora-release-verification.json](nexora-release-verification.json) for the exact commit, deployment and evidence. Older three-project candidate statements below describe historical stages.

For the current three-project review candidate, see [FLOWTEAM_REVIEW.md](FLOWTEAM_REVIEW.md): 9 unit tests, 57 E2E checks, eight localized content routes and new local screenshots. This branch has not been merged or deployed. The record below documents the original November 13 production release.

Checked on 2026-11-13 against the local production build on port 3200.

| Check                               | Result                                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Prettier, ESLint, strict TypeScript | Passed                                                                                                               |
| Next.js production build            | Passed; six prerendered content pages                                                                                |
| Vitest                              | 6 tests passed                                                                                                       |
| Playwright                          | 26 tests passed in Chrome desktop and emulated iPhone                                                                |
| Automated axe accessibility         | No violations for selected WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags on all six content routes in both viewports         |
| Additional reflow checks            | No horizontal overflow at widths 320, 360 and 768 on ES/EN home and representative cases; no uncaught browser errors |
| Images                              | Real production-build captures saved for Spanish/English desktop, mobile home and both project cases                 |
| HTTP smoke                          | Content, robots, sitemap and social image return 200; unmatched Spanish/English routes return 404                    |
| Source demo links                   | Both supplied external HTTPS demo homepages returned 200                                                             |
| Dependencies                        | npm audit reported 0 vulnerabilities                                                                                 |
| Publication candidate               | Tracked filenames and credential patterns scanned; private/generated files excluded                                  |

## Lighthouse lab results

Lighthouse 13.6.0, Chrome headless, localhost production server. One final run per default mobile and desktop profile, after browser tests finished. The sanitized metrics are in `lighthouse-summary.json`.

| Category / metric        | Desktop | Mobile |
| ------------------------ | ------- | ------ |
| Performance              | 100     | 94     |
| Accessibility            | 100     | 100    |
| Best practices           | 100     | 100    |
| SEO                      | 100     | 100    |
| Largest Contentful Paint | 0.61 s  | 3.11 s |
| Total Blocking Time      | 0 ms    | 1.5 ms |
| Cumulative Layout Shift  | 0.009   | 0.012  |

Lighthouse exposed a brief footer shift caused by a root loading boundary. Loading UI was moved to the asynchronous case-study routes and given viewport height, so static homes render immediately. It also exposed accessible labels that did not contain all visible text; the labels and regression coverage were corrected.

These are local laboratory measurements, not field Core Web Vitals or a guarantee of public-network performance. The simulated mobile LCP remains above the 2.5-second good threshold. Test the actual deployment before making public performance claims. Axe and keyboard tests support the WCAG 2.2 AA goal but do not certify full conformance or cover every assistive technology.

## Public deployment verification

The owner authorized hosting creation after local delivery. The portfolio is now public at https://developer-portfolio-plum-mu.vercel.app. The production Playwright suite passed all 26 tests on desktop Chrome and emulated iPhone, including both languages, all cases, keyboard navigation, links, actual images and 320-pixel reflow. Public HTTP checks verified all six content pages, correct language/canonical/hreflang metadata, sitemap entries, robots, social image, localized 404s and a valid TLS certificate. See public-verification.json. Latest screenshots were captured from the public deployment, not a mockup.

LinkedIn was explicitly confirmed by the owner and is included in the contact links and Person schema. Email and an authorized current CV remain absent. External link HTTP results are in external-link-verification.json; sites may restrict automated clients independently of the portfolio link's correctness.

The account remained on Vercel Hobby, with no card, billing activation or paid service. Snapshot comparison confirmed the other Vercel projects were unchanged. The source commit passed the clean Node 22 workflow linked in PROGRESS.md. Automatic Git-based redeployment is not enabled because the Vercel account has no GitHub integration; the initial release used the REST API.

The Lighthouse scores above remain the earlier local lab measurements, not public-network or field measurements. Public hosting/browser verification is recorded separately. No field Core Web Vitals claim is made.
