"use client";

import LegalDe from "@/content/legal/de-DE.mdx";
import LegalEn from "@/content/legal/en-US.mdx";
import PrivacyDe from "@/content/legal/privacy/de-DE.mdx";
import PrivacyEn from "@/content/legal/privacy/en-US.mdx";
import TermsDe from "@/content/legal/terms/de-DE.mdx";
import TermsEn from "@/content/legal/terms/en-US.mdx";
import { SupportedLocales } from "@/middleware";
import { FC } from "react";

export type LegalSection = "privacy" | "terms" | "legal";

interface LegalComponentProps {
  lang: SupportedLocales;
  section: LegalSection;
}

// TODO: Add basic legal terms

const LegalComponent: FC<LegalComponentProps> = ({ lang, section }) =>
  section === "privacy" ? (
    lang === "en-US" ? (
      <PrivacyEn />
    ) : (
      <PrivacyDe />
    )
  ) : section === "terms" ? (
    lang === "en-US" ? (
      <TermsEn />
    ) : (
      <TermsDe />
    )
  ) : lang === "en-US" ? (
    <LegalEn />
  ) : (
    <LegalDe />
  );

export default LegalComponent;
