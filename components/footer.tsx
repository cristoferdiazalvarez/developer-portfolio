import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Github } from 'lucide-react';
import { profile, homePath, type Locale } from '@/lib/config';
import { copy } from '@/lib/copy';
export function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="footer-wordmark" href={homePath(locale)}>
          Cristofer<span className="serif"> Díaz.</span>
        </Link>
        <a href="#top" className="top-link" aria-label={t.footer.top}>
          <ArrowUp size={20} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CRISTOFER DÍAZ ÁLVAREZ</span>
        <p>{t.footer.note}</p>
        <a
          href="https://github.com/cristoferdiazalvarez/developer-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={14} />
          {t.footer.source}
          <ArrowUpRight size={13} />
        </a>
        <span>{profile.location[locale]}</span>
      </div>
    </footer>
  );
}
