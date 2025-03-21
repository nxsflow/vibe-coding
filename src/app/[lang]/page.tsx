import { FC } from "react";
import Link from "next/link";
import { Dictionary, SupportedLocales } from "@/middleware";

interface HomePageProps {
  params: Promise<{ lang: SupportedLocales }>;
}

const HomePage: FC<HomePageProps> = async ({ params }) => {
  const { lang } = await params;
  const { title, welcome, description, getStarted } = dictionary[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">{title}</h1>
        <h2 className="mt-6 text-2xl">{welcome}</h2>
        <p className="mt-3 text-xl max-w-xl">{description}</p>
        <div className="flex flex-wrap items-center justify-center max-w-md mt-6">
          <Link
            href={"/login"}
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">{getStarted} &rarr;</h3>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

// Dictionary for localized content
const dictionary: Dictionary = {
  "en-US": {
    title: "Note-Taking App",
    welcome: "Welcome to our note-taking application!",
    description:
      "A modern, collaborative note-taking app with real-time editing, smart organization, and AI assistance.",
    getStarted: "Get Started",
  },
  "de-DE": {
    title: "Notiz-App",
    welcome: "Willkommen bei unserer Notiz-App!",
    description:
      "Eine moderne, zusammenarbeitende Notiz-App mit realzeitlicher Bearbeitung, intelligenter Organisation und AI-Unterstützung.",
    getStarted: "Los geht's",
  },
  de: {
    title: "Notiz-App",
    welcome: "Willkommen bei unserer Notiz-App!",
    description:
      "Eine moderne, zusammenarbeitende Notiz-App mit realzeitlicher Bearbeitung, intelligenter Organisation und AI-Unterstützung.",
    getStarted: "Los geht's",
  },
};
