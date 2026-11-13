import type { MetadataRoute } from 'next';
import { siteUrl, homePath, projectPath } from '@/lib/config';
import { projects } from '@/lib/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  if (!base) return [];
  return (['es', 'en'] as const).flatMap((locale) => [
    { url: `${base}${homePath(locale)}`, changeFrequency: 'monthly' as const, priority: 1 },
    ...projects.map((project) => ({
      url: `${base}${projectPath(locale, project.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]);
}
