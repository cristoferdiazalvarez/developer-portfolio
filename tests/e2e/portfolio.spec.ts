import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const pageErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(error.message));
});
test.afterEach(async ({ page }) => {
  expect(pageErrors.get(page)).toEqual([]);
});
for (const [locale, home, workPath] of [
  ['es', '/', '/proyectos/'],
  ['en', '/en', '/en/projects/'],
] as const) {
  test(`${locale}: real projects, complete case studies and language switching`, async ({
    page,
  }) => {
    await page.goto(home);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Full Stack');
    await expect(page.locator('.project-card')).toHaveCount(4);
    expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
    await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/cristofer-d%C3%ADaz-%C3%A1lvarez-039a693b8/',
    );
    await page.locator('.hero-actions a').first().click();
    await expect(page).toHaveURL(/#projects$/);
    await page
      .locator('.project-card')
      .first()
      .getByRole('link', {
        name: locale === 'es' ? 'Explorar el proyecto' : 'Explore the project',
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(`${workPath}businessos`);
    await expect(page.getByRole('heading', { name: 'BusinessOS.', exact: true })).toBeVisible();
    await expect(page.locator('.decision-list article')).toHaveCount(3);
    await expect(
      page.getByRole('link', { name: locale === 'es' ? 'Abrir demo' : 'Open demo', exact: true }),
    ).toHaveAttribute('href', 'https://businessos-web-five.vercel.app');
    await page
      .getByRole('link', {
        name: locale === 'es' ? 'EN · Read in English' : 'ES · Leer en español',
      })
      .click();
    await expect(page).toHaveURL(
      locale === 'es' ? '/en/projects/businessos' : '/proyectos/businessos',
    );
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'es' ? 'en' : 'es');
    const next = page.locator('.next-project>a');
    await next.click();
    await expect(
      page.getByRole('heading', { name: 'Atelier Commerce.', exact: true }),
    ).toBeVisible();
    await expect(page.locator('.case-boundary')).toContainText(/Stripe TEST/);
    await next.click();
    await expect(page.getByRole('heading', { name: 'FlowTeam.', exact: true })).toBeVisible();
    await expect(page.locator('.case-boundary')).toContainText(/polling/);
    await expect(page.locator('.case-cover img')).toHaveAttribute('alt', /FlowTeam/);
    await expect(page.locator('.case-gallery figure')).toHaveCount(3);
    await next.click();
    await expect(page.getByRole('heading', { name: 'NEXORA.', exact: true })).toBeVisible();
    await expect(page.locator('.case-boundary')).toContainText(/Render Free/);
    await next.click();
    await expect(page.getByRole('heading', { name: 'BusinessOS.', exact: true })).toBeVisible();
  });
  test(`${locale}: FlowTeam bilingual case, links, sections, metadata and loaded gallery`, async ({
    page,
  }) => {
    await page.goto(`${workPath}flowteam`);
    await expect(page).toHaveTitle(/FlowTeam/);
    for (const section of ['overview', 'architecture', 'decisions', 'evidence', 'gallery'])
      await expect(page.locator('#' + section)).toBeVisible();
    await expect(page.locator('#decisions')).toContainText(/1[.,]200/);
    await expect(
      page.getByRole('link', { name: locale === 'es' ? 'Abrir demo' : 'Open demo', exact: true }),
    ).toHaveAttribute('href', 'https://flowteam-ten.vercel.app');
    await expect(
      page.getByRole('link', {
        name: locale === 'es' ? 'Explorar repositorio' : 'Explore repository',
        exact: true,
      }),
    ).toHaveAttribute('href', 'https://github.com/cristoferdiazalvarez/flowteam');
    for (const image of await page.locator('.case-gallery img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    if (await page.locator('link[rel=canonical]').count()) {
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
        'content',
        /flowteam-social.webp$/,
      );
    }
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) || '{}',
    );
    expect(schema.name).toBe('FlowTeam');
    expect(schema.sameAs).toEqual([
      'https://flowteam-ten.vercel.app',
      'https://github.com/cristoferdiazalvarez/flowteam',
    ]);
    await page
      .getByRole('link', {
        name: locale === 'es' ? 'EN · Read in English' : 'ES · Leer en español',
      })
      .click();
    await expect(page).toHaveURL(locale === 'es' ? '/en/projects/flowteam' : '/proyectos/flowteam');
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'es' ? 'en' : 'es');
  });
  test(`${locale}: NEXORA case has verified links, translated navigation and loaded images`, async ({
    page,
  }) => {
    await page.goto(`${workPath}nexora`);
    await expect(page).toHaveTitle(/NEXORA/);
    await expect(page.locator('.case-cover img')).toHaveAttribute('alt', /NEXORA/);
    await expect(
      page.getByRole('link', { name: locale === 'es' ? 'Abrir demo' : 'Open demo', exact: true }),
    ).toHaveAttribute('href', 'https://nexora-eta-steel.vercel.app');
    await expect(
      page.getByRole('link', {
        name: locale === 'es' ? 'Explorar repositorio' : 'Explore repository',
        exact: true,
      }),
    ).toHaveAttribute('href', 'https://github.com/cristoferdiazalvarez/nexora');
    for (const image of await page.locator('.case-gallery img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    const schema = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) || '{}',
    );
    expect(schema.name).toBe('NEXORA');
    expect(schema.sameAs).toEqual([
      'https://nexora-eta-steel.vercel.app',
      'https://github.com/cristoferdiazalvarez/nexora',
    ]);
    await page
      .getByRole('link', {
        name: locale === 'es' ? 'EN · Read in English' : 'ES · Leer en español',
      })
      .click();
    await expect(page).toHaveURL(locale === 'es' ? '/en/projects/nexora' : '/proyectos/nexora');
  });
  test(`${locale}: keyboard skip, navigation and mobile dialog`, async ({ page, isMobile }) => {
    await page.goto(home);
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: locale === 'es' ? 'Saltar al contenido' : 'Skip to content' }),
    ).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    if (isMobile) {
      await page
        .getByRole('button', { name: locale === 'es' ? 'Abrir menú' : 'Open menu' })
        .click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
      await expect(
        page.getByRole('button', { name: locale === 'es' ? 'Abrir menú' : 'Open menu' }),
      ).toBeFocused();
    }
    await page.locator('.hero-actions a').nth(1).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator('.contact-link').first()).toHaveAttribute(
      'href',
      'https://github.com/cristoferdiazalvarez',
    );
  });
  for (const path of [
    home,
    `${workPath}businessos`,
    `${workPath}atelier-commerce`,
    `${workPath}flowteam`,
    `${workPath}nexora`,
  ]) {
    test(`${locale}: responsive accessibility ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.locator('h1').waitFor();
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    });
  }
}
test('reduced motion, truthful metadata and a custom missing-page state', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await expect(page).toHaveTitle(/Cristofer Díaz Álvarez/);
  const data = await page.locator('script[type="application/ld+json"]').allTextContents();
  const records = data.map((text) => JSON.parse(text));
  expect(records.some((r) => r['@type'] === 'Person' && r.name === 'Cristofer Díaz Álvarez')).toBe(
    true,
  );
  expect(records.filter((r) => r['@type'] === 'CreativeWork')).toHaveLength(4);
  await page.goto('/a-route-that-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Este camino');
  await page.goto('/en/a-route-that-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This path');
});
for (const locale of ['es', 'en'] as const) {
  test(`${locale}: all four cards and cases preserve demo/repository destinations`, async ({
    page,
  }) => {
    for (const [slug, name, demo, repo] of [
      [
        'businessos',
        'BusinessOS',
        'https://businessos-web-five.vercel.app',
        'https://github.com/cristoferdiazalvarez/businessos-erp',
      ],
      [
        'atelier-commerce',
        'Atelier Commerce',
        'https://atelier-commerce-two.vercel.app',
        'https://github.com/cristoferdiazalvarez/atelier-commerce',
      ],
      [
        'flowteam',
        'FlowTeam',
        'https://flowteam-ten.vercel.app',
        'https://github.com/cristoferdiazalvarez/flowteam',
      ],
      [
        'nexora',
        'NEXORA',
        'https://nexora-eta-steel.vercel.app',
        'https://github.com/cristoferdiazalvarez/nexora',
      ],
    ]) {
      await page.goto(locale === 'es' ? '/' : '/en');
      const card = page
        .locator('.project-card')
        .filter({ has: page.getByRole('heading', { name, exact: true }) });
      await expect(card.locator('.project-external a').nth(0)).toHaveAttribute('href', demo);
      await expect(card.locator('.project-external a').nth(1)).toHaveAttribute('href', repo);
      await card.locator('.case-link').click();
      await expect(page).toHaveURL((locale === 'es' ? '/proyectos/' : '/en/projects/') + slug);
      await expect(page.getByRole('heading', { name: name + '.', exact: true })).toBeVisible();
      const layout = await page.evaluate(() => ({
        boundary: document.querySelector('.case-boundary')!.getBoundingClientRect().bottom,
        next: document.querySelector('.next-project')!.getBoundingClientRect().top,
      }));
      expect(layout.next).toBeGreaterThanOrEqual(layout.boundary);
    }
  });
}
test('external controls have real destinations and image assets load', async ({ page }) => {
  await page.goto('/');
  for (const href of [
    'https://businessos-web-five.vercel.app',
    'https://atelier-commerce-two.vercel.app',
    'https://flowteam-ten.vercel.app',
    'https://github.com/cristoferdiazalvarez/businessos-erp',
    'https://github.com/cristoferdiazalvarez/atelier-commerce',
    'https://github.com/cristoferdiazalvarez/flowteam',
    'https://nexora-eta-steel.vercel.app',
    'https://github.com/cristoferdiazalvarez/nexora',
  ])
    expect(await page.locator(`a[href="${href}"]`).count()).toBeGreaterThan(0);
  const images = page.locator('.hero-visual img');
  await expect(images).toHaveCount(3);
  await expect
    .poll(() =>
      images.evaluateAll((nodes) =>
        nodes.every(
          (node) =>
            (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    )
    .toBe(true);
  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('User-Agent: *');
  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).not.toContain('localhost');
  if (xml.includes('<loc>')) {
    expect(xml).toContain('/proyectos/flowteam');
    expect(xml).toContain('/en/projects/flowteam');
    expect((xml.match(/<loc>/g) || []).length).toBe(10);
  }
});

test('narrow screens retain readable Spanish and English actions after fonts load', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const path of ['/', '/en']) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    for (const action of await page.locator('.hero-actions a').all()) {
      await expect(action).toBeInViewport();
    }
  }
});
