import { FC } from "react";
import HorizontalLine from "@/components/design/HotizontalLine";
import Copyright from "./Copyright";
import FooterLink from "./FooterLink";
import { Dictionary, SupportedLocales } from "@/middleware";

interface FooterProps {
  lang: SupportedLocales;
}

const Footer: FC<FooterProps> = async ({ lang }) => {
  const dict = dictionary[lang];

  return (
    <div className="flex flex-col gap-4 pt-8 text-sm text-gray-400 print:hidden">
      <HorizontalLine />

      <div className="relative flex w-full items-center justify-center">
        <Copyright />

        <FooterLink
          href="/legal/terms"
          label={dict.terms}
          className="hidden sm:block"
        />

        <FooterLink
          href="/legal/privacy"
          label={dict.privacy}
          className="absolute right-4 hidden sm:block"
        />

        <FooterLink
          href="/legal"
          label={dict.legal}
          className="absolute right-4 sm:hidden"
        />
      </div>
    </div>
  );
};

export default Footer;

type FooterDictionary = Record<"legal" | "terms" | "privacy", string>;
const de: FooterDictionary = {
  legal: "Impressum",
  terms: "Nutzungsbedingungen",
  privacy: "Datenschutz",
};
const dictionary: Dictionary<FooterDictionary> = {
  "en-US": {
    legal: "Legal",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  },
  "de-DE": de,
  de,
};
