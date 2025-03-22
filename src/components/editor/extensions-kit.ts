import * as AllExtensions from "./extensions";
import { SupportedLocales } from "@/middleware";
import { Extensions } from "@tiptap/react";

interface ExtensionsKitProps {
  lang: SupportedLocales;
}

export const ExtensionsKit = ({ lang }: ExtensionsKitProps): Extensions => {
  const { Placeholder, SlashCommand, ...rest } = AllExtensions;
  return [Placeholder(lang), SlashCommand({ lang }), ...Object.values(rest)];
};
