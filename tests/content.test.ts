import { describe, it, expect, afterEach } from 'vitest';
import { existsSync } from 'node:fs';
import { profile, contactLinks, siteUrl } from '../lib/config';
import { projects, getProject } from '../lib/projects';
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
    expect(profile.linkedin).toBeNull();
    expect(profile.cv).toBeNull();
    for (const locale of ['es', 'en'] as const)
      expect(contactLinks(locale)).toEqual([
        {
          label: locale === 'es' ? 'Mi perfil de GitHub' : 'My GitHub profile',
          href: 'https://github.com/cristoferdiazalvarez',
          external: true,
        },
      ]);
  });
  it('keeps real projects, complete translations and screenshot files', () => {
    expect(projects.map((p) => p.slug)).toEqual(['businessos', 'atelier-commerce']);
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
  it('escapes structured data script terminators', () => {
    expect(structuredJson({ name: '</script>' })).not.toContain('<');
    expect(personSchema('es').sameAs).toEqual([profile.github]);
  });
});
