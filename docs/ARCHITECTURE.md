# Architecture

The application is a presentation layer with no backend or database. Static data is reviewed source content rather than a runtime dependency on GitHub or the project demos.

```text
app/(es)                  Spanish document layout, home and /proyectos/[slug]
app/en                    English document layout, home and /en/projects/[slug]
components                Shared document, navigation, home, case study and motion
lib/config.ts             Verified identity, optional contacts and domain validation
lib/copy.ts                Complete localized interface content
lib/projects.ts            Bilingual cases, actual URLs, screenshots and demo limits
lib/seo.ts                 Localized metadata and escaped structured data
public/projects            Authentic source application captures
app/opengraph-image.tsx    Generated social image
app/robots.ts, sitemap.ts  Domain-aware crawler configuration
```

Both languages have separate root layouts to set `html lang` correctly without client-side language detection. Locale switches retain the current case study. The eight content pages are prerendered: ES/EN homes and three case studies in each language. The catch-all routes produce localized 404 responses. Loading and error boundaries supply meaningful recovery UI.

Server components render the content. Only navigation/dialog behavior and restrained Motion interactions require client components. The native modal dialog supplies browser focus containment and Escape behavior. A visible keyboard skip link leads to main content. MotionConfig honors reduced motion, and CSS disables smooth scrolling and decorative transitions for that preference.

Images use Next Image with explicit dimensions/aspect ratios and responsive sizes. Project captures are local and their source is documented. FlowTeam assets are WebP derivatives of pinned, public production screenshots; hashes and crop/resize details are recorded in flowteam-assets.json. Fonts are self-hosted, with no third-party font request. There is no analytics, cookie banner, credential collection or form delivery service.

`NEXT_PUBLIC_SITE_URL` is public configuration, not a secret. Only an HTTPS origin without a path or credentials is accepted. When absent, canonical/hreflang and sitemap entries are omitted; local preview social metadata can use a loopback fallback. Production must supply the actual verified origin and rebuild.

Security headers include nosniff, a restrictive referrer policy, denied framing and disabled camera/microphone/geolocation. These do not replace dependency maintenance, code review or hosting configuration.

The next-case link follows `projects` order and wraps after FlowTeam, so every case remains reachable. Optional per-project cover alt, evidence date and social image preserve the original project data while allowing truthful FlowTeam captions and dedicated metadata. Home structured data and sitemap entries derive from the same three-record collection. CI supplies the existing confirmed site origin for complete canonical/social/sitemap assertions, without deploying anything.

In a single-column case layout the row gap is explicit zero; percentage column gutters remain on larger layouts. This prevents long mobile case narratives from overlapping the next-case link. Browser regression coverage checks that the last narrative block ends before next-project navigation on all three cases and both locales.
