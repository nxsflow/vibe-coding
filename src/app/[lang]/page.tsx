import { FC } from "react";
import Link from "next/link";
import { Dictionary, SupportedLocales } from "@/middleware";

interface HomePageProps {
  params: Promise<{ lang: SupportedLocales }>;
}

const HomePage: FC<HomePageProps> = async ({ params }) => {
  const { lang } = await params;
  const dict = dictionary[lang];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">{dict.title}</h1>
        <h2 className="mt-6 text-2xl">{dict.welcome}</h2>
        <p className="mt-3 max-w-xl text-xl">{dict.description}</p>
        <div className="mt-6 flex max-w-md flex-wrap items-center justify-center">
          <Link href="/notes" className="mt-6 rounded-xl p-2 text-left">
            <h3 className="text-2xl font-bold">{dict.getStarted} &rarr;</h3>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

// Dictionary for localized content
type HomePageDictionary = Record<
  "title" | "welcome" | "description" | "getStarted",
  string
>;
const de: HomePageDictionary = {
  title: "Notiz-App",
  welcome: "Willkommen bei unserer Notiz-App!",
  description:
    "Eine moderne, zusammenarbeitende Notiz-App mit realzeitlicher Bearbeitung, intelligenter Organisation und AI-Unterstützung.",
  getStarted: "Los geht's",
};
const dictionary: Dictionary<HomePageDictionary> = {
  "en-US": {
    title: "Note-Taking App",
    welcome: "Welcome to our note-taking application!",
    description:
      "A modern, collaborative note-taking app with real-time editing, smart organization, and AI assistance.",
    getStarted: "Get Started",
  },
  "de-DE": de,
  de,
};
