import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const require = createRequire(import.meta.url);
// Reuse the image encoder declared by Next.js; no new runtime dependency.
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const commit = '70dd9f5d934dae50d8c003618e02a7c3a94cbc27';
const base = `https://raw.githubusercontent.com/cristoferdiazalvarez/flowteam/${commit}/docs/screenshots/production/`;
const records = [];
await mkdir('public/projects', { recursive: true });
for (const [name, source, width, height] of [
  ['overview', 'desktop-overview.png', 1440, 1000],
  ['board', 'desktop-board.png', 1440, null],
  ['task', 'desktop-task.png', 1440, null],
  ['mobile', 'mobile-board.png', 585, 1266],
  ['social', 'desktop-overview.png', 1200, 630],
]) {
  const url = base + source;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Published screenshot unavailable: ${source} (${response.status})`);
  const input = Buffer.from(await response.arrayBuffer());
  const metadata = await sharp(input).metadata();
  let encoder = sharp(input);
  // Crop only authentic viewport regions, preserving pixels/content; never generate UI.
  if (name === 'mobile')
    encoder = encoder.extract({
      left: 0,
      top: 0,
      width: metadata.width,
      height: Math.min(metadata.height, 2532),
    });
  if (name === 'overview')
    encoder = encoder.extract({
      left: 0,
      top: 0,
      width: metadata.width,
      height: Math.min(metadata.height, 1000),
    });
  encoder = encoder.resize({
    width,
    ...(height ? { height, fit: 'cover', position: 'top' } : {}),
    withoutEnlargement: true,
  });
  const { data, info } = await encoder
    .webp({ quality: 86, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  const path = `public/projects/flowteam-${name}.webp`;
  await writeFile(path, data);
  records.push({
    path,
    source: url,
    sourceSha256: createHash('sha256').update(input).digest('hex'),
    outputSha256: createHash('sha256').update(data).digest('hex'),
    sourceBytes: input.length,
    bytes: data.length,
    width: info.width,
    height: info.height,
    processing:
      name === 'mobile'
        ? 'Top 390×844 CSS-pixel viewport crop, resized to 585px wide and WebP encoded'
        : name === 'overview'
          ? 'Top 1440×1000 viewport crop and WebP encoding'
          : name === 'social'
            ? 'Top-aligned 1200×630 social crop and WebP encoding'
            : 'WebP encoding; screenshot content preserved',
  });
  console.log(`${path}: ${info.width}×${info.height}, ${data.length} bytes`);
}
await writeFile(
  'docs/flowteam-assets.json',
  JSON.stringify({ commit, origin: 'https://flowteam-ten.vercel.app', records }, null, 2) + '\n',
);
