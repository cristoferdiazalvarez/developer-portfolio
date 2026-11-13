import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { copy } from '@/lib/copy';
import { homePath, type Locale } from '@/lib/config';
export function Missing({ locale }: { locale: Locale }) {
  const t = copy[locale].notFound;
  return (
    <section className="missing-page container" id="top">
      <span className="missing-number" aria-hidden="true">
        404<span>*</span>
      </span>
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>
        {t.title}
        <br />
        <em>{t.italic}</em>
      </h1>
      <p>{t.body}</p>
      <Link className="button primary" href={homePath(locale)}>
        {t.button}
        <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
