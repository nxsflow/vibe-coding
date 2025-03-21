import LegalComponent, { LegalSection } from "@/content/legal/legal";
import { SupportedLocales } from "@/middleware";
import { FC } from "react";

interface LegalPageProps {
  params: Promise<{
    lang: SupportedLocales;
    section: LegalSection;
  }>;
}

const LegalPage: FC<LegalPageProps> = async ({ params }) => {
  const { lang, section } = await params;
  return <LegalComponent {...{ lang, section }} />;
};

export default LegalPage;
