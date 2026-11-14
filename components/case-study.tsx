import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, ArrowRight, Github, CheckCircle2 } from 'lucide-react';
import { copy } from '@/lib/copy';
import { homePath, projectPath, type Locale } from '@/lib/config';
import { nextProject, projectCoverAlt, type Project } from '@/lib/projects';
import { workSchema, structuredJson } from '@/lib/seo';
export function CaseStudy({ project, locale }: { project: Project; locale: Locale }) {
  const t = copy[locale],
    next = nextProject(project.slug)!;
  const sections = [
    { id: 'overview', label: t.case.overview },
    { id: 'architecture', label: t.case.architecture },
    { id: 'decisions', label: t.case.challenges },
    { id: 'evidence', label: t.case.results },
    { id: 'gallery', label: t.case.gallery },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredJson(workSchema(project, locale)) }}
      />
      <section className="case-hero container" id="top">
        <Link className="back-link" href={`${homePath(locale)}#projects`}>
          <ArrowLeft size={15} />
          {t.case.back}
        </Link>
        <div className="case-heading">
          <div>
            <p className="eyebrow">
              {project.number} / {project.category[locale]}
            </p>
            <h1>
              {project.name}
              <span className="accent">.</span>
            </h1>
            <p className="case-subtitle">{project.subtitle[locale]}</p>
          </div>
          <span className="case-role mono">
            {t.case.role}
            <br />
            2026
          </span>
        </div>
        <div className="case-top-actions">
          <a
            className="button primary"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.case.openDemo}
            <ArrowUpRight size={17} />
          </a>
          <a
            className="button outline"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} />
            {t.case.openCode}
          </a>
        </div>
        <figure className={`case-cover tone-${project.tone}`}>
          <div className="case-cover-image">
            <Image
              src={project.image}
              alt={projectCoverAlt(project, locale)}
              fill
              priority
              sizes="(max-width: 700px) 92vw, 1280px"
              quality={85}
            />
          </div>
          <figcaption className="mono">
            <span>{t.case.caption}</span>
            <span>{t.case.demoData}</span>
          </figcaption>
        </figure>
        <div className="case-facts">
          <div>
            <span className="mono">{t.case.context}</span>
            <p>{t.case.role}</p>
          </div>
          <div>
            <span className="mono">{t.case.scope}</span>
            <p>{project.scope[locale]}</p>
          </div>
          <div>
            <span className="mono">{t.case.stack}</span>
            <div className="tech-list">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="container case-body">
        <aside className="case-index">
          <span className="mono">
            {project.name} / {locale === 'es' ? 'CONTENIDO' : 'CONTENTS'}
          </span>
          <nav
            aria-label={locale === 'es' ? 'Contenido del caso de estudio' : 'Case study contents'}
          >
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <span className="mono">0{index + 1}</span>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-narrative">
          <section id="overview" className="case-section">
            <p className="eyebrow">01 / {t.case.overview}</p>
            <h2>
              {t.case.problem}
              <span className="accent">.</span>
            </h2>
            <p className="case-lead">{project.problem[locale]}</p>
            <h3>{t.case.approach}</h3>
            <p>{project.approach[locale]}</p>
          </section>
          <section id="architecture" className="case-section">
            <p className="eyebrow">02 / {t.case.architecture}</p>
            <h2>
              {t.case.architecture}
              <span className="accent">.</span>
            </h2>
            <figure className="architecture">
              <ol>
                {project.architecture.map((node, index) => (
                  <li key={node}>
                    <span>{locale === 'es' && node === 'Browser' ? 'Navegador' : node}</span>
                    {index < project.architecture.length - 1 && (
                      <ArrowRight size={16} aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
              <figcaption>{t.case.architectureNote}</figcaption>
            </figure>
            <a
              className="inline-link"
              href={project.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.case.source}
              <ArrowUpRight size={15} />
            </a>
          </section>
          <section id="decisions" className="case-section">
            <p className="eyebrow">03 / {t.case.challenges}</p>
            <h2>
              {t.case.challenges}
              <span className="accent">.</span>
            </h2>
            <div className="decision-list">
              {project.decisions.map((decision, index) => (
                <article key={decision.title.en}>
                  <span className="decision-number mono">0{index + 1}</span>
                  <div>
                    <h3>{decision.title[locale]}</h3>
                    <p>{decision.body[locale]}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="evidence" className="case-section case-evidence">
            <p className="eyebrow">04 / {t.case.evidence}</p>
            <h2>
              {t.case.results}
              <span className="accent">.</span>
            </h2>
            <ul>
              {project.results[locale].map((result) => (
                <li key={result}>
                  <CheckCircle2 size={19} />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
            <div className="evidence-links">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                {t.work.demo}
                <ArrowUpRight size={15} />
              </a>
              <a href={`${project.repo}/actions`} target="_blank" rel="noopener noreferrer">
                GitHub Actions
                <ArrowUpRight size={15} />
              </a>
            </div>
            <p className="mono evidence-date">{project.verified?.[locale] ?? t.case.checked}</p>
          </section>
          <section id="gallery" className="case-section">
            <p className="eyebrow">05 / {t.case.gallery}</p>
            <h2>
              {t.case.gallery}
              <span className="accent">.</span>
            </h2>
            <div className="case-gallery">
              {project.gallery.map((image) => (
                <figure key={image.src} data-layout={image.layout}>
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${locale === 'es' ? 'Abrir captura completa' : 'Open full screenshot'}: ${image.alt[locale]}`}
                  >
                    <div className="case-gallery-image" style={{ aspectRatio: image.ratio }}>
                      <Image
                        src={image.src}
                        alt={image.alt[locale]}
                        fill
                        sizes="(max-width: 700px) 92vw, 900px"
                        quality={85}
                      />
                    </div>
                  </a>
                  <figcaption>{image.caption[locale]}</figcaption>
                </figure>
              ))}
            </div>
          </section>
          <section className="case-section case-boundary">
            <p className="eyebrow">{t.case.limits}</p>
            <p>{project.limits[locale]}</p>
          </section>
        </div>
      </section>
      <section className="next-project container">
        <p className="eyebrow">{t.case.next}</p>
        <Link href={projectPath(locale, next.slug)}>
          <span>{next.name}</span>
          <ArrowUpRight size={55} />
        </Link>
        <p>{next.subtitle[locale]}</p>
      </section>
    </>
  );
}
