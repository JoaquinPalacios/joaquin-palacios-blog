import { PrismicNextLink } from "@prismicio/next";

export interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
}

const localeLabels = {
  "en-us": "English",
  "es-ar": "Español",
};

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
  return (
    <div className="absolute right-0">
      <ul className="lang-items flex flex-wrap gap-3">
        <li className="first:font-bold last:font-light text-sm">
          <PrismicNextLink href={locales[0].url} locale={locales[0].lang} aria-label={`Change language to ${locales[0].lang_name}`}>
            {localeLabels[locales[0].lang as keyof typeof localeLabels] || locales[0].lang}
          </PrismicNextLink>
        </li>
        <span className=" text-sm" aria-hidden>
          |
        </span>
        <li className="first:font-bold last:font-light text-sm">
          <PrismicNextLink href={locales[1].url} locale={locales[1].lang} aria-label={`Change language to ${locales[1].lang_name}`}>
            {localeLabels[locales[1].lang as keyof typeof localeLabels] || locales[1].lang}
          </PrismicNextLink>
        </li>
      </ul>
    </div>
  );
};
