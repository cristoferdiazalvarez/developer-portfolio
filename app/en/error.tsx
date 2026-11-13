'use client';
import { copy } from '@/lib/copy';
export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = copy['en'].error;
  return (
    <section className="missing-page container">
      <h1>{t.title}</h1>
      <p>{t.body}</p>
      <button className="button primary" onClick={reset}>
        {t.retry}
      </button>
    </section>
  );
}
