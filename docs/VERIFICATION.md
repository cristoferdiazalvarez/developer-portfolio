# Verification record

Checked on 2026-11-13 against the local production build on port 3200.

| Check                               | Result                                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Prettier, ESLint, strict TypeScript | Passed                                                                                                               |
| Next.js production build            | Passed; six prerendered content pages                                                                                |
| Vitest                              | 6 tests passed                                                                                                       |
| Playwright                          | 24 tests passed in Chrome desktop and emulated iPhone                                                                |
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

## Remaining boundaries

- No portfolio hosting resource or public URL has been created; the owner must approve hosting creation first.
- Production canonical, hreflang, sitemap entries and absolute social URLs require the actual HTTPS origin in NEXT_PUBLIC_SITE_URL and a rebuild.
- Next.js emits a metadataBase fallback warning for its built-in unmatched-route metadata when no public origin is configured. Localized content pages have an explicit loopback preview base; no public canonical is invented. Verify the actual generated metadata again after deployment.
- Email, LinkedIn and an authorized current CV remain unconfirmed and hidden.
- Host tools used Node 26 while the supported production/CI target is Node 22.x. GitHub Actions is the clean Node 22 verification environment; record its actual result in PROGRESS.md.
- No changes were made to the existing BusinessOS or Atelier Commerce repositories; both had clean Git status during the final read-only check.
