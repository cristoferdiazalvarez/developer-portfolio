import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
const base = process.env.PREVIEW_URL || 'http://localhost:3200';
await mkdir('docs/screenshots', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
async function capture(path, file) {
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((image) =>
      image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
          }),
    );
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `docs/screenshots/${file}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  console.log(
    `${file}: ${path}, no horizontal overflow: ${await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)}`,
  );
}
try {
  await capture('/', 'home-desktop');
  await capture('/en', 'home-english');
  await capture('/proyectos/businessos', 'businessos-case-desktop');
  await page.setViewportSize({ width: 390, height: 844 });
  await capture('/', 'home-mobile');
  await capture('/proyectos/atelier-commerce', 'atelier-case-mobile');
} finally {
  await browser.close();
}
