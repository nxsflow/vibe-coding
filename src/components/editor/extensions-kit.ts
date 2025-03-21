import * as AllExtensions from "./extensions";
import { SupportedLocales } from "@/middleware";
import { Extensions } from "@tiptap/react";

interface ExtensionsKitProps {
  lang: SupportedLocales;
}

export const ExtensionsKit = ({ lang }: ExtensionsKitProps): Extensions => {
  const { Placeholder, ...rest } = AllExtensions;
  return [Placeholder(lang), ...Object.values(rest)];
};
