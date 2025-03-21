import { SupportedLocales } from "@/middleware";
import { FC, ReactNode } from "react";
import { Merriweather, Merriweather_Sans } from "next/font/google";
import { cn } from "@/utils";
import { Metadata, Viewport } from "next";
import { metadata as theMetadata } from "@/utils/metadata";
import ConfigureAmplifyClientSide from "@/components/amplify/ConfigureAmplify";
import "@/styles/globals.css";

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: SupportedLocales }>;
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body
        className={cn("font-serif antialiased", sans.variable, serif.variable)}
        data-theme="work"
      >
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

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

// Generate metadata for all locales
export const generateMetadata = async (): Promise<Metadata> => {
  const { title, siteName, url, image, robots } = theMetadata;

  return {
    title,
    appleWebApp: { title },
    openGraph: {
      type: "website",
      siteName,
      title,
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
