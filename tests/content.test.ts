import { describe, it, expect, afterEach } from 'vitest';
import { existsSync } from 'node:fs';
import { profile, contactLinks, siteUrl } from '../lib/config';
import { projects, getProject, nextProject, projectCoverAlt } from '../lib/projects';
import { copy } from '../lib/copy';
import sitemap from '../app/sitemap';
import { alternatePath } from '../lib/routes';
import { pageMetadata, personSchema, workSchema, structuredJson } from '../lib/seo';
const original = process.env.NEXT_PUBLIC_SITE_URL;
afterEach(() => {
  if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = original;
});
describe('truthful portfolio content and SEO', () => {
  it('offers only confirmed default contact details', () => {
    expect(profile.email).toBeNull();
    expect(profile.linkedin).toBe(
      'https://www.linkedin.com/in/cristofer-d%C3%ADaz-%C3%A1lvarez-039a693b8/',
    );
    expect(profile.cv).toBeNull();
    for (const locale of ['es', 'en'] as const)
      expect(contactLinks(locale)).toEqual([
        {
          label: locale === 'es' ? 'Mi perfil de GitHub' : 'My GitHub profile',
          href: 'https://github.com/cristoferdiazalvarez',
          external: true,
        },
        { label: 'LinkedIn', href: profile.linkedin, external: true },
      ]);
  });
  it('keeps real projects, complete translations and screenshot files', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'businessos',
      'atelier-commerce',
      'flowteam',
      'nexora',
    ]);
    for (const project of projects) {
      expect(project.repo).toMatch(/^https:\/\/github.com\/cristoferdiazalvarez\//);
      expect(project.demo).toMatch(/^https:\/\/.+\.vercel\.app$/);
      for (const src of [project.image, project.mobile, ...project.gallery.map((i) => i.src)])
        expect(existsSync(`public${src}`)).toBe(true);
      for (const locale of ['es', 'en'] as const) {
        expect(project.summary[locale].length).toBeGreaterThan(40);
        expect(project.problem[locale]).toBeTruthy();
        expect(project.approach[locale]).toBeTruthy();
        expect(project.limits[locale]).toBeTruthy();
        expect(project.decisions.every((d) => d.title[locale] && d.body[locale])).toBe(true);
      }
    }
    expect(getProject('invented')).toBeUndefined();
  });
  it('preserves the selected project when switching language', () => {
    expect(alternatePath('/')).toBe('/en');
    expect(alternatePath('/en')).toBe('/');
    expect(alternatePath('/proyectos/businessos')).toBe('/en/projects/businessos');
    expect(alternatePath('/en/projects/atelier-commerce')).toBe('/proyectos/atelier-commerce');
  });
  it('does not invent a public canonical before deployment', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(siteUrl()).toBeNull();
    expect(pageMetadata('es').alternates).toBeUndefined();
    expect(personSchema('es')).not.toHaveProperty('url');
  });
  it('creates canonical/hreflang only for a configured HTTPS origin', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'http://unsafe.example';
    expect(siteUrl()).toBeNull();
    process.env.NEXT_PUBLIC_SITE_URL = 'https://portfolio.example';
    const metadata = pageMetadata('en', projects[0]);
    expect(metadata.alternates?.canonical).toBe('https://portfolio.example/en/projects/businessos');
    expect(metadata.alternates?.languages?.es).toBe(
      'https://portfolio.example/proyectos/businessos',
    );
    expect(workSchema(projects[0], 'en').author.name).toBe(profile.name);
  });
  it('cycles through all four projects in order without losing original demo links', () => {
    expect(projects.map((p) => p.number)).toEqual(['01', '02', '03', '04']);
    expect(projects.slice(0, 2).map((p) => [p.slug, p.demo, p.repo])).toEqual([
      [
        'businessos',
        'https://businessos-web-five.vercel.app',
        'https://github.com/cristoferdiazalvarez/businessos-erp',
      ],
      [
        'atelier-commerce',
        'https://atelier-commerce-two.vercel.app',
        'https://github.com/cristoferdiazalvarez/atelier-commerce',
      ],
    ]);
    for (const [from, to] of [
      ['businessos', 'atelier-commerce'],
      ['atelier-commerce', 'flowteam'],
      ['flowteam', 'nexora'],
      ['nexora', 'businessos'],
    ])
      expect(nextProject(from)?.slug).toBe(to);
    expect(nextProject('unknown')).toBeUndefined();
  });
  it('describes verified FlowTeam tradeoffs and bilingual screenshots accurately', () => {
    const flow = getProject('flowteam')!;
    expect(flow.demo).toBe('https://flowteam-ten.vercel.app');
    expect(flow.repo).toBe('https://github.com/cristoferdiazalvarez/flowteam');
    for (const locale of ['es', 'en'] as const) {
      const content = [
        flow.approach[locale],
        flow.limits[locale],
        ...flow.decisions.map((d) => d.body[locale]),
      ].join(' ');
      expect(content).toMatch(/polling/i);
      expect(content).toContain('3');
      expect(content).toContain(locale === 'es' ? '1.200' : '1,200');
      expect(projectCoverAlt(flow, locale)).toContain('FlowTeam');
      expect(projectCoverAlt(flow, locale)).not.toContain('Atelier');
      expect(flow.gallery.every((i) => i.alt[locale] && i.caption[locale])).toBe(true);
      expect(copy[locale].work.intro).toMatch(locale === 'es' ? /^Cuatro/ : /^Four/);
    }
    expect(alternatePath('/proyectos/flowteam')).toBe('/en/projects/flowteam');
    expect(alternatePath('/en/projects/flowteam')).toBe('/proyectos/flowteam');
  });
  it('includes FlowTeam in localized canonical/social/schema data and all ten sitemap routes', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://portfolio.example';
    const flow = getProject('flowteam')!;
    for (const locale of ['es', 'en'] as const) {
      const m = pageMetadata(locale, flow);
      expect(m.title).toContain('FlowTeam');
      expect(m.alternates?.canonical).toBe(
        'https://portfolio.example' +
          (locale === 'es' ? '/proyectos/flowteam' : '/en/projects/flowteam'),
      );
      expect(m.openGraph?.images).toEqual([
        expect.objectContaining({
          url: 'https://portfolio.example/projects/flowteam-social.webp',
          width: 1200,
          height: 630,
        }),
      ]);
      expect(workSchema(flow, locale)).toMatchObject({
        name: 'FlowTeam',
        inLanguage: locale,
        sameAs: [flow.demo, flow.repo],
      });
    }
    const routes = sitemap().map((r) => r.url);
    expect(routes).toHaveLength(10);
    expect(routes).toContain('https://portfolio.example/proyectos/flowteam');
    expect(routes).toContain('https://portfolio.example/en/projects/flowteam');
  });
  it('escapes structured data script terminators', () => {
    expect(structuredJson({ name: '</script>' })).not.toContain('<');
    expect(personSchema('es').sameAs).toEqual([profile.github, profile.linkedin]);
  });
});
