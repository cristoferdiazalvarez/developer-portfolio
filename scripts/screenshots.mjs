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
  if (file === 'home-desktop') {
    await page.screenshot({ path: 'docs/screenshots/home-preview.png', animations: 'disabled' });
  }
  console.log(
    `${file}: ${path}, no horizontal overflow: ${await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)}`,
  );
}
try {
  await capture('/', 'home-desktop');
  await capture('/en', 'home-english');
  await capture('/proyectos/businessos', 'businessos-case-desktop');
  await capture('/proyectos/flowteam', 'flowteam-case-desktop-es');
  await capture('/en/projects/flowteam', 'flowteam-case-desktop-en');
  await page.setViewportSize({ width: 820, height: 1180 });
  await capture('/', 'home-tablet');
  await capture('/proyectos/flowteam', 'flowteam-case-tablet');
  await page.setViewportSize({ width: 390, height: 844 });
  await capture('/', 'home-mobile');
  await capture('/proyectos/atelier-commerce', 'atelier-case-mobile');
  await capture('/proyectos/flowteam', 'flowteam-case-mobile-es');
  await capture('/en/projects/flowteam', 'flowteam-case-mobile-en');
} finally {
  await browser.close();
}
