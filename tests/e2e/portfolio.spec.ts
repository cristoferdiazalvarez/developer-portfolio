import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
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
    await expect(page.locator('.project-card')).toHaveCount(2);
    expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
    expect(await page.locator('a[href*="linkedin.com"]').count()).toBe(0);
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
  for (const path of [home, `${workPath}businessos`, `${workPath}atelier-commerce`]) {
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
  expect(records.filter((r) => r['@type'] === 'CreativeWork')).toHaveLength(2);
  await page.goto('/a-route-that-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Este camino');
  await page.goto('/en/a-route-that-does-not-exist');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This path');
});
test('external controls have real destinations and image assets load', async ({ page }) => {
  await page.goto('/');
  for (const href of [
    'https://businessos-web-five.vercel.app',
    'https://atelier-commerce-two.vercel.app',
    'https://github.com/cristoferdiazalvarez/businessos-erp',
    'https://github.com/cristoferdiazalvarez/atelier-commerce',
  ])
    expect(await page.locator(`a[href="${href}"]`).count()).toBeGreaterThan(0);
  const images = page.locator('.hero-visual img');
  await expect(images).toHaveCount(2);
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
  expect(await sitemap.text()).not.toContain('localhost');
});
