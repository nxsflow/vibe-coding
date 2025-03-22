"use client";

import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import { Dictionary, SupportedLocales } from "@/middleware";

interface SignInProps {
  lang: SupportedLocales;
}

const SignIn: FC<SignInProps> = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dict = dictionary[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      if (isSignedIn) {
        router.push("/");
        return;
      }

      if (
        nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        router.push("/auth/new-password");
        return;
      }

      if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
        router.push("/auth/mfa");
        return;
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : dict.errorOccurred;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">{dict.signIn}</h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            {dict.email}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            {dict.password}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
          <div className="mt-1 text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              {dict.forgotPassword}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? dict.signingIn : dict.signIn}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        {dict.noAccount}{" "}
        <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
          {dict.signUp}
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

type SignInDictionary = Record<
  | "email"
  | "errorOccurred"
  | "forgotPassword"
  | "noAccount"
  | "password"
  | "signIn"
  | "signingIn"
  | "signUp",
  string
>;

const de: SignInDictionary = {
  signIn: "Anmelden",
  signUp: "Registrieren",
  email: "E-Mail",
  password: "Passwort",
  forgotPassword: "Passwort vergessen?",
  signingIn: "Anmelden...",
  errorOccurred: "Ein Fehler ist während des Anmeldens aufgetreten",
  noAccount: "Kein Konto?",
};

const dictionary: Dictionary<SignInDictionary> = {
  "en-US": {
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    signingIn: "Signing in...",
    errorOccurred: "An error occurred during sign in",
    noAccount: "Don't have an account?",
  },
  "de-DE": de,
  de,
};
