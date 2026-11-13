'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { copy } from '@/lib/copy';
import { homePath, type Locale } from '@/lib/config';
import { alternatePath } from '@/lib/routes';
export function Header({ locale }: { locale: Locale }) {
  const t = copy[locale],
    pathname = usePathname(),
    dialog = useRef<HTMLDialogElement>(null);
  const links = [
    { id: 'projects', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'stack', label: t.nav.stack },
    { id: 'contact', label: t.nav.contact },
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href={homePath(locale)}
          aria-label={`c. Cristofer Díaz Álvarez · ${locale === 'es' ? 'Inicio' : 'Home'}`}
        >
          <span className="brand-mark" aria-hidden="true">
            c<span>.</span>
          </span>
          <span className="brand-name">
            CRISTOFER <br />
            DÍAZ ÁLVAREZ
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t.nav.navigation}>
          {links.map((item) => (
            <Link
              className={item.id === 'contact' ? 'nav-contact' : ''}
              key={item.id}
              href={`${homePath(locale)}#${item.id}`}
            >
              {item.label}
              {item.id === 'contact' && <ArrowUpRight size={14} />}
            </Link>
          ))}
        </nav>
        <div className="header-right">
          <nav className="language" aria-label={locale === 'es' ? 'Idioma' : 'Language'}>
            <span aria-current="page">{locale.toUpperCase()}</span>
            <i aria-hidden="true">/</i>
            <Link
              href={alternatePath(pathname)}
              hrefLang={locale === 'es' ? 'en' : 'es'}
              aria-label={locale === 'es' ? 'EN · Read in English' : 'ES · Leer en español'}
            >
              {locale === 'es' ? 'EN' : 'ES'}
            </Link>
          </nav>
          <button
            className="menu-trigger"
            aria-label={t.nav.menu}
            aria-haspopup="dialog"
            onClick={() => dialog.current?.showModal()}
          >
            <Menu size={23} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="mobile-dialog"
        aria-label={t.nav.navigation}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="mobile-dialog-inner">
          <div className="mobile-menu-top">
            <span className="mono">CRISTOFER DÍAZ / MENU</span>
            <button aria-label={t.nav.close} onClick={() => dialog.current?.close()}>
              <X size={24} />
            </button>
          </div>
          <nav aria-label={t.nav.navigation}>
            {links.map((item, index) => (
              <Link
                key={item.id}
                href={`${homePath(locale)}#${item.id}`}
                onClick={() => dialog.current?.close()}
              >
                <span className="mono">0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={25} />
              </Link>
            ))}
          </nav>
          <p className="mono">
            {t.available}
            <br />
            TENERIFE, ES
          </p>
        </div>
      </dialog>
    </header>
  );
}
