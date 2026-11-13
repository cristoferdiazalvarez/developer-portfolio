import type { Locale } from '@/lib/config';
import { copy } from '@/lib/copy';
import { Header } from './header';
import { Footer } from './footer';
import { MotionProvider, ReadingProgress } from './motion';
import '@fontsource-variable/manrope';
import '@fontsource-variable/newsreader';
import '@fontsource-variable/newsreader/wght-italic.css';
import '@/app/globals.css';
export function Document({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main">
          {copy[locale].nav.skip}
        </a>
        <MotionProvider>
          <ReadingProgress />
          <Header locale={locale} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
