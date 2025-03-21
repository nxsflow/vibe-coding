"use client";

import { FC, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Dictionary, SupportedLocales } from "@/middleware";

interface SignOutProps {
  lang: SupportedLocales;
  className?: string;
  variant?: "button" | "link";
}

const SignOut: FC<SignOutProps> = ({
  className = "",
  variant = "button",
  lang,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dict = dictionary[lang];

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "link") {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className={`text-blue-600 hover:underline ${className}`}
      >
        {isLoading ? dict.signingOut : dict.signOut}
      </button>
    );
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 ${className}`}
    >
      {isLoading ? dict.signingOut : dict.signOut}
    </button>
  );
};

export default SignOut;

type SignOutDictionary = Record<"signOut" | "signingOut", string>;

const de: SignOutDictionary = {
  signOut: "Abmelden",
  signingOut: "Abmelden...",
};

const dictionary: Dictionary<SignOutDictionary> = {
  "en-US": {
    signOut: "Sign out",
    signingOut: "Signing out...",
  },
  "de-DE": de,
  de,
};
