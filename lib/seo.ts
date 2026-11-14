import type { Metadata } from 'next';
import { profile, siteUrl, homePath, projectPath, type Locale } from './config';
import type { Project } from './projects';
const description = {
  es: 'Cristofer Díaz Álvarez, Full Stack Developer en Tenerife. Tres aplicaciones publicadas: BusinessOS, Atelier Commerce y FlowTeam, con Next.js, TypeScript y PostgreSQL.',
  en: 'Cristofer Díaz Álvarez, Full Stack Developer in Tenerife. Three published applications: BusinessOS, Atelier Commerce and FlowTeam, built with Next.js, TypeScript and PostgreSQL.',
};
export function pageMetadata(locale: Locale, project?: Project): Metadata {
  const base = siteUrl();
  const path = project ? projectPath(locale, project.slug) : homePath(locale);
  const other = locale === 'es' ? 'en' : 'es';
  const otherPath = project ? projectPath(other, project.slug) : homePath(other);
  const title = project
    ? `${project.name} — ${locale === 'es' ? 'Caso de estudio' : 'Case study'}`
    : `${profile.name} — Full Stack Developer`;
  const summary = project ? project.summary[locale] : description[locale];
  return {
    title,
    description: summary,
    applicationName: 'Cristofer Díaz · Portfolio',
    authors: [{ name: profile.name, url: profile.github }],
    creator: profile.name,
    category: 'technology',
    metadataBase: new URL(base ?? 'http://localhost:3200'),
    alternates: base
      ? {
          canonical: `${base}${path}`,
          languages: {
            [locale]: `${base}${path}`,
            [other]: `${base}${otherPath}`,
            'x-default': `${base}${project ? projectPath('es', project.slug) : '/'}`,
          },
        }
      : undefined,
    openGraph: {
      type: 'website',
      title,
      description: summary,
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      siteName: `${profile.shortName} · Developer`,
      ...(base
        ? {
            url: `${base}${path}`,
            images: [
              {
                url: `${base}${project?.social?.src ?? '/opengraph-image'}`,
                width: project?.social?.width ?? 1200,
                height: project?.social?.height ?? 630,
                alt: project?.social?.alt[locale] ?? `${profile.name} — Full Stack Developer`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      ...(base ? { images: [`${base}${project?.social?.src ?? '/opengraph-image'}`] } : {}),
    },
    robots: { index: true, follow: true },
    icons: { icon: '/icon.svg' },
  };
}
export function personSchema(locale: Locale) {
  const base = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: description[locale],
    ...(base ? { url: base, '@id': `${base}/#person` } : {}),
    homeLocation: { '@type': 'Place', name: profile.location[locale] },
    sameAs: [profile.github, ...(profile.linkedin ? [profile.linkedin] : [])],
  };
}
export function workSchema(project: Project, locale: Locale) {
  const base = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.summary[locale],
    url: base ? `${base}${projectPath(locale, project.slug)}` : project.repo,
    sameAs: [project.demo, project.repo],
    inLanguage: locale,
    author: { '@type': 'Person', name: profile.name, url: profile.github },
    keywords: project.tech.join(', '),
    ...(base ? { image: `${base}${project.image}` } : {}),
  };
}
export function structuredJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
