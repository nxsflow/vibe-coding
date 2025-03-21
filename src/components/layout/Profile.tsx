import { Dictionary, SupportedLocales } from "@/middleware";
import { AuthGetCurrentUserServer } from "@/utils/amplify-config";
import Link from "next/link";
import { FC } from "react";
import SignOut from "../auth/SignOut";

interface ProfileProps {
  lang: SupportedLocales;
}

// TODO: Add sign in button and profile dropdown

const Profile: FC<ProfileProps> = async ({ lang }) => {
  const dict = dictionary[lang];
  const currentUser = await AuthGetCurrentUserServer();

  if (currentUser) {
    return (
      <div className="absolute right-4 flex items-center text-sm">
        <SignOut lang={lang} />
      </div>
    );
  }

  return (
    <div className="absolute right-4 flex items-center text-sm">
      <Link href="/login">{dict.signIn}</Link>
    </div>
  );
};

export default Profile;

type ProfileDictionary = Record<"signIn", string>;
const de: ProfileDictionary = {
  signIn: "Anmelden",
};
const dictionary: Dictionary<ProfileDictionary> = {
  "en-US": {
    signIn: "Sign in",
  },
  "de-DE": de,
  de,
};
