import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Github,
  MapPin,
  Braces,
  Server,
  Database,
  GitBranch,
  Check,
} from 'lucide-react';
import { copy } from '@/lib/copy';
import { profile, contactLinks, projectPath, type Locale } from '@/lib/config';
import { projects, projectCoverAlt } from '@/lib/projects';
import { personSchema, workSchema, structuredJson } from '@/lib/seo';
import { HoverFrame } from './motion';
const stackIcons = [Braces, Server, Database, GitBranch];
export function Home({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredJson(personSchema(locale)) }}
      />
      {projects.map((project) => (
        <script
          key={project.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredJson(workSchema(project, locale)) }}
        />
      ))}
      <section className="hero container" id="top">
        <div className="hero-meta">
          <span className="availability">
            <i />
            {t.available}
          </span>
          <span className="mono">
            <MapPin size={12} />
            {profile.location[locale]}
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>
              <span>{t.hero.first}</span>
              <em>
                {t.hero.second}
                <span className="accent-dot" aria-hidden="true">
                  *
                </span>
              </em>
            </h1>
            <p className="hero-intro">{t.hero.intro}</p>
            <p className="hero-description">{t.hero.body}</p>
            <div className="hero-actions">
              <Link className="button primary" href="#projects">
                {t.hero.work}
                <ArrowDown size={17} />
              </Link>
              <Link className="button quiet" href="#contact">
                {t.hero.contact}
                <ArrowUpRight size={18} />
              </Link>
              <a
                className="icon-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub · Cristofer Díaz Álvarez"
              >
                <Github size={21} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-label mono">
              <span className="small-cross" aria-hidden="true">
                +
              </span>
              {t.hero.capture}
              <span>
                {projects[0].number}—{projects.at(-1)!.number}
              </span>
            </div>
            <HoverFrame className="hero-shot business-shot">
              <div className="hero-shot-image">
                <Image
                  src={projects[0].image}
                  alt={projects[0].gallery[0].alt[locale]}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 700px) 85vw, 480px"
                  quality={80}
                />
              </div>
              <div className="hero-shot-caption">
                <span>BusinessOS</span>
                <span>ERP / SAAS</span>
              </div>
            </HoverFrame>
            <HoverFrame className="hero-shot atelier-shot">
              <div className="hero-shot-image">
                <Image
                  src={projects[1].image}
                  alt={
                    locale === 'es'
                      ? 'Captura real del storefront de Atelier Commerce'
                      : 'Actual Atelier Commerce storefront screenshot'
                  }
                  fill
                  priority
                  sizes="(max-width: 700px) 70vw, 350px"
                  quality={80}
                />
              </div>
              <div className="hero-shot-caption">
                <span>Atelier Commerce</span>
                <span>E-COMMERCE</span>
              </div>
            </HoverFrame>
            <HoverFrame className="hero-shot flowteam-shot">
              <div className="hero-shot-image">
                <Image
                  src={projects[2].image}
                  alt={projectCoverAlt(projects[2], locale)}
                  fill
                  sizes="(max-width: 700px) 42vw, 265px"
                  quality={80}
                />
              </div>
              <div className="hero-shot-caption">
                <span>FlowTeam</span>
                <span>COLLABORATION</span>
              </div>
            </HoverFrame>
            <span className="visual-coordinate mono" aria-hidden="true">
              CDA / FULL STACK
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <span className="mono">{t.hero.note}</span>
          <a href="#projects" className="scroll-link">
            <span>{t.hero.scroll}</span>
            <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <div className="discipline-bar" aria-hidden="true">
        <span>INTERFACE</span>
        <i />
        <span>LOGIC</span>
        <i />
        <span>DATA</span>
        <i />
        <span>DETAIL</span>
        <i />
        <span>DELIVERY</span>
      </div>
      <section className="work-section container section" id="projects">
        <div className="section-intro">
          <div>
            <p className="eyebrow">{t.work.eyebrow}</p>
            <h2>
              {t.work.title}
              <br />
              <em>{t.work.italic}</em>
            </h2>
          </div>
          <p>{t.work.intro}</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card tone-${project.tone}`} key={project.slug}>
              <div className="project-media">
                <div className="project-image-frame">
                  <Image
                    src={project.image}
                    alt={projectCoverAlt(project, locale)}
                    fill
                    sizes="(max-width: 800px) 92vw, 720px"
                    quality={85}
                  />
                </div>
                <div className="project-media-caption mono">
                  <span>
                    {t.work.capture} / {project.name}
                  </span>
                  <span>DESKTOP</span>
                </div>
              </div>
              <div className="project-content">
                <div className="project-kicker">
                  <span className="mono">
                    {project.number} / {project.category[locale]}
                  </span>
                  <ArrowUpRight size={20} />
                </div>
                <h3>
                  <Link href={projectPath(locale, project.slug)}>{project.name}</Link>
                </h3>
                <p>{project.summary[locale]}</p>
                <ul className="project-features">
                  {project.features[locale].map((feature) => (
                    <li key={feature}>
                      <Check size={13} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="tech-list">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <Link className="case-link" href={projectPath(locale, project.slug)}>
                  {t.work.case}
                  <span>
                    <ArrowRight size={19} />
                  </span>
                </Link>
                <div className="project-external">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    {t.work.demo}
                    <ArrowUpRight size={14} />
                  </a>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    {t.work.code}
                    <Github size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="work-note mono">{t.work.portfolioNote}</p>
      </section>
      <section className="about-section section" id="about">
        <div className="container about-grid">
          <div className="about-title">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2>
              {t.about.title}
              <br />
              <em>{t.about.italic}</em>
            </h2>
            <div className="about-location">
              <span className="location-icon">
                <MapPin size={21} />
              </span>
              <div>
                <span>{profile.location[locale]}</span>
                <small>{t.availability}</small>
              </div>
            </div>
          </div>
          <div className="about-copy">
            <p className="about-lead">{t.about.first}</p>
            <p>{t.about.second}</p>
            <div className="working-values">
              <p className="mono">{t.about.label}</p>
              {t.about.values.map((value, index) => (
                <div className="working-value" key={value.title}>
                  <span className="mono">0{index + 1}</span>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.body}</p>
                  </div>
                  <ArrowUpRight size={15} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="stack-section container section" id="stack">
        <div className="section-intro">
          <div>
            <p className="eyebrow">{t.stack.eyebrow}</p>
            <h2>
              {t.stack.title}
              <br />
              <em>{t.stack.italic}</em>
            </h2>
          </div>
          <p>{t.stack.intro}</p>
        </div>
        <div className="stack-grid">
          {t.stack.groups.map((group, index) => {
            const Icon = stackIcons[index];
            return (
              <div className="stack-group" key={group.name}>
                <div className="stack-group-top">
                  <Icon size={21} />
                  <span className="mono">0{index + 1}</span>
                </div>
                <h3>{group.name}</h3>
                <p>{group.note}</p>
                <div className="stack-items">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-top">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <span className="availability">
              <i />
              {t.contact.available}
            </span>
          </div>
          <div className="contact-grid">
            <h2>
              {t.contact.title}
              <br />
              <em>{t.contact.italic}</em>
            </h2>
            <div>
              <p>{t.contact.body}</p>
              <span className="mono contact-label">{t.contact.label}</span>
              {contactLinks(locale).map((link) => (
                <a
                  className="contact-link"
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                  <ArrowUpRight size={25} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
