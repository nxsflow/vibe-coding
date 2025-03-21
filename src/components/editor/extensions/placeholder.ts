import { Dictionary, SupportedLocales } from "@/middleware";
import PlaceholderExtension from "@tiptap/extension-placeholder";

export const Placeholder = (lang: SupportedLocales) => {
  const dict = dictionary[lang];

  return PlaceholderExtension.configure({
    placeholder: ({ node }) =>
      node.type.name === "heading"
        ? node.attrs.level === 1
          ? dict.title
          : dict.heading
        : node.type.name === "paragraph"
          ? dict.menu
          : dict.default,
  });
};

type PlaceholderDictionary = Record<
  "title" | "heading" | "default" | "menu",
  string
>;

const de: PlaceholderDictionary = {
  title: "Titel hinzufügen …",
  heading: "Überschrift hinzufügen …",
  menu: "Tippe / um das Menü zu öffnen",
  default: "Teile Gedanken, Ideen oder Geschichten …",
};

const dictionary: Dictionary<PlaceholderDictionary> = {
  "en-US": {
    title: "Add title …",
    heading: "Add a header …",
    menu: "Type / to open menu",
    default: "Share thoughts, ideas, or stories …",
  },
  "de-DE": de,
  de,
};
