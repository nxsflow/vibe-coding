import { Metadata, Viewport } from "next";
import { FC, ReactNode } from "react";
import { metadata as theMetadata } from "@/utils/metadata";
import { SupportedLocales, Dictionary } from "@/middleware";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import ConfigureAmplifyClientSide from "@/components/amplify/ConfigureAmplify";
import Navigation from "@/components/layout/Navigation";
import "@/styles/globals.css";
import { cn } from "@/utils";

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: SupportedLocales }>;
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body
        className={cn(
          "group font-serif antialiased",
          sans.variable,
          serif.variable
        )}
        data-theme="work"
      >
        <ConfigureAmplifyClientSide />
        <div className="flex flex-col items-center w-full min-h-screen">
          <Navigation lang={lang} />
          <div className="w-full lg:w-[64rem] px-2 md:px-8 lg:px-16 mb-4 md:mb-8 flex flex-col flex-1">
            <main className="w-full flex-1 py-4 sm:py-6 md:py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

const { title, siteName, url, image, robots } = theMetadata;

const sans = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});
const serif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const viewport: Viewport = {
  width: "device-width",
};

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
    title,
    description,
    appleWebApp: { title },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      images: [
        {
          url: image.src,
          secureUrl: image.src,
          type: "image/jpeg",
          width: 1200,
          height: 600,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [
        {
          url: image.src,
          alt: image.alt,
        },
      ],
    },
    robots,
  };
};

type LayoutDictionary = Record<"description", string>;
const de: LayoutDictionary = {
  description: "Notizen erfassen, Organisation gewinnen.",
};
const dictionary: Dictionary<LayoutDictionary> = {
  "en-US": {
    description: "Take notes. Get organized.",
  },
  "de-DE": de,
  de,
};
