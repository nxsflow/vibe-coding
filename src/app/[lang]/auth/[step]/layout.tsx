import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Dictionary, SupportedLocales } from "@/middleware";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication pages for the note-taking app",
};

interface AuthLayoutProps {
  children: ReactNode;
  params: Promise<{
    lang: SupportedLocales;
  }>;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children, params }) => {
  const { lang } = await params;
  const dict = dictionary[lang];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">nexflow.it</h1>
            <p className="text-gray-600">{dict.description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

type AuthLayoutDictionary = Record<"description", string>;

const de: AuthLayoutDictionary = {
  description: "Ihre zusammenarbeitende Notiz-Lösung",
};

const dictionary: Dictionary<AuthLayoutDictionary> = {
  "en-US": {
    description: "Your collaborative note-taking solution",
  },
  "de-DE": de,
  de,
};
