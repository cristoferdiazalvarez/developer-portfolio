export type Locale = 'es' | 'en';
export const profile = {
  name: 'Cristofer Díaz Álvarez',
  shortName: 'Cristofer Díaz',
  role: 'Full Stack Developer',
  github: 'https://github.com/cristoferdiazalvarez',
  githubHandle: 'cristoferdiazalvarez',
  location: { es: 'Tenerife, España', en: 'Tenerife, Spain' },
  email: null as string | null,
  linkedin: 'https://www.linkedin.com/in/cristofer-d%C3%ADaz-%C3%A1lvarez-039a693b8/' as
    string | null,
  cv: null as { href: string; updatedAt: string } | null,
};
export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/')
      return null;
    return url.origin;
  } catch {
    return null;
  }
}
export const homePath = (locale: Locale) => (locale === 'es' ? '/' : '/en');
export const projectPath = (locale: Locale, slug: string) =>
  locale === 'es' ? `/proyectos/${slug}` : `/en/projects/${slug}`;
export function contactLinks(locale: Locale) {
  return [
    {
      label: locale === 'es' ? 'Mi perfil de GitHub' : 'My GitHub profile',
      href: profile.github,
      external: true,
    },
    ...(profile.linkedin ? [{ label: 'LinkedIn', href: profile.linkedin, external: true }] : []),
    ...(profile.email
      ? [{ label: profile.email, href: `mailto:${profile.email}`, external: false }]
      : []),
    ...(profile.cv
      ? [
          {
            label: locale === 'es' ? 'Descargar CV' : 'Download résumé',
            href: profile.cv.href,
            external: false,
          },
        ]
      : []),
  ];
}
