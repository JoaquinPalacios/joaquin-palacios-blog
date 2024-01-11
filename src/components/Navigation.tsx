import { Client, Content, isFilled } from "@prismicio/client";
import { PrismicLink } from "@prismicio/react";
import { LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";

type NavigationProps = {
  client: Client<Content.AllDocumentTypes>;
  lang: string;
  locales: LanguageSwitcherProps["locales"];
};

export const Navigation = async ({ client, lang, locales }: NavigationProps): Promise<JSX.Element> => {
  const navigation = await client.getSingle("navigation", { lang });

  return (
    <nav className="font-bold text-xl flex w-full">
      <ul className="flex justify-end w-1/2">
        {isFilled.group(navigation.data.menu_items) &&
          navigation.data.menu_items.map((item) => {
            return (
              <li key={item.label}>
                <PrismicLink field={item.link}>{item.label}</PrismicLink>
              </li>
            );
          })}
      </ul>
      <LanguageSwitcher locales={locales} />
    </nav>
  );
};
