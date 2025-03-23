import { Dictionary, SupportedLocales } from "@/middleware";
import Link from "next/link";
import { FC } from "react";

interface ProfileProps {
  lang: SupportedLocales;
}

// TODO: Add sign in button and profile dropdown

const Profile: FC<ProfileProps> = async ({ lang }) => {
  const dict = dictionary[lang];

  return (
    <div className="absolute right-4 flex items-center text-sm">
      <Link href="https://nexflow.it">{dict.signUp}</Link>
    </div>
  );
};

export default Profile;

type ProfileDictionary = Record<"signUp", string>;
const de: ProfileDictionary = {
  signUp: "Registrieren",
};
const dictionary: Dictionary<ProfileDictionary> = {
  "en-US": {
    signUp: "Sign up",
  },
  "de-DE": de,
  de,
};
