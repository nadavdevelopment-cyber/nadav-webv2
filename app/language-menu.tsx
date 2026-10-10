'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import type { Locale } from './localization';

const options: Array<{ code: Locale; short: string; label: string }> = [
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'es', short: 'ES', label: 'Español' },
  { code: 'it', short: 'IT', label: 'Italiano' },
];

export default function LanguageMenu({ locale, onChange }: { locale: Locale; onChange?: (locale: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const closeWithKeyboard = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', closeWithKeyboard);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', closeWithKeyboard);
    };
  }, []);

  function select(nextLocale: Locale) {
    setOpen(false);
    if (onChange) onChange(nextLocale);
    else window.location.assign(nextLocale === 'en' ? '/' : `/?lang=${nextLocale}`);
  }

  return <div className="language-menu" ref={root}>
    <button type="button" className="language-trigger" aria-label={locale === 'es' ? 'Elegir idioma' : locale === 'it' ? 'Scegli lingua' : 'Choose language'} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      <Languages size={15} /><span>{options.find((option) => option.code === locale)?.short}</span><ChevronDown size={13} className={open ? 'is-open' : ''} />
    </button>
    {open && <div className="language-options" role="menu" aria-label={locale === 'es' ? 'Idioma' : locale === 'it' ? 'Lingua' : 'Language'}>
      {options.map((option) => <button key={option.code} type="button" role="menuitemradio" aria-checked={locale === option.code} onClick={() => select(option.code)}><span><b>{option.short}</b>{option.label}</span>{locale === option.code && <Check size={14} />}</button>)}
    </div>}
  </div>;
}
