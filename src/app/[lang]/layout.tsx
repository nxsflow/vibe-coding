import { Metadata } from "next";
import { FC, ReactNode } from "react";
import { SupportedLocales, Dictionary } from "@/middleware";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: SupportedLocales }>;
}

const LangLayout: FC<LangLayoutProps> = async ({ children, params }) => {
  const { lang } = await params;

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <Header lang={lang} />

      <div className="w-full lg:w-[64rem] px-2 md:px-8 lg:px-16 mb-4 md:mb-8 flex flex-col flex-1">
        <main className="w-full flex-1 py-4 sm:py-6 md:py-8">{children}</main>

        <Footer {...{ lang }} />
      </div>
    </div>
  );
};

export default LangLayout;

interface GenerateMetadataProps {
  params: Promise<{ lang: SupportedLocales }>;
}

// Generate metadata for all locales
export const generateMetadata = async ({
  params,
}: GenerateMetadataProps): Promise<Metadata> => {
  const { lang } = await params;
  const { description } = dictionary[lang];

  return {
    description,
    openGraph: {
      description,
    },
    twitter: {
      description,
    },
  };
};

type LayoutDictionary = Record<"description", string>;
const de: LayoutDictionary = {
  description: "Notizen erfassen, organisiert werden.",
};
const dictionary: Dictionary<LayoutDictionary> = {
  "en-US": {
    description: "Take notes. Get organized.",
  },
  "de-DE": de,
  de,
};
