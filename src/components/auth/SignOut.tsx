"use client";

import { FC, useEffect, useState } from "react";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Dictionary, SupportedLocales } from "@/middleware";
import { Hub } from "aws-amplify/utils";

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
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setSignedIn(!!user);
      })
      .catch(() => {
        setSignedIn(false);
      });
    Hub.listen("auth", (data) => {
      if (data.payload.event === "signedOut") {
        setSignedIn(false);
      }
      if (data.payload.event === "signedIn") {
        setSignedIn(true);
      }
    });
  }, []);

  if (!signedIn) {
    return null;
  }

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
      className={`rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 ${className}`}
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
