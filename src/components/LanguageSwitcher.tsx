import { PrismicNextLink } from "@prismicio/next";

export interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
}

const localeLabels = {
  "en-us": "English 🇺🇸",
  "es-ar": "Español 🇪🇸",
};

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
  return (
    <div className="lang-switcher flex ml-auto gap-3 items-end flex-col">
      <span className="lang-toggle" aria-hidden>
        🌐
      </span>
      <ul className="lang-items flex flex-wrap gap-3">
        {locales.map((locale) => (
          <li key={locale.lang} className="first:font-bold last:font-light text-sm">
            <PrismicNextLink href={locale.url} locale={locale.lang} aria-label={`Change language to ${locale.lang_name}`}>
              {localeLabels[locale.lang as keyof typeof localeLabels] || locale.lang}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
