"use client";

import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import { Dictionary, SupportedLocales } from "@/middleware";

interface SignUpProps {
  lang: SupportedLocales;
}

const SignUp: FC<SignUpProps> = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dict = dictionary[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError(dict.passwordsDoNotMatch);
      setIsLoading(false);
      return;
    }

    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });

      if (isSignUpComplete) {
        router.push("/");
        return;
      }

      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        router.push(`/auth/confirm?email=${encodeURIComponent(email)}`);
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
      <h2 className="mb-6 text-center text-2xl font-bold">
        {dict.createAccount}
      </h2>

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

        <div className="mb-4">
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
            minLength={8}
          />
          <p className="mt-1 text-xs text-gray-500">
            {dict.passwordMustBeAtLeast8CharactersLong}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="mb-1 block text-sm font-medium"
          >
            {dict.confirmPassword}
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? dict.creatingAccount : dict.signUp}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        {dict.alreadyHaveAccount}{" "}
        <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
          {dict.signIn}
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

type SignUpDictionary = Record<
  | "alreadyHaveAccount"
  | "email"
  | "confirmPassword"
  | "createAccount"
  | "creatingAccount"
  | "errorOccurred"
  | "password"
  | "passwordMustBeAtLeast8CharactersLong"
  | "passwordsDoNotMatch"
  | "signIn"
  | "signUp",
  string
>;

const de: SignUpDictionary = {
  alreadyHaveAccount: "Bereits ein Konto?",
  email: "E-Mail",
  confirmPassword: "Passwort bestätigen",
  createAccount: "Konto erstellen",
  creatingAccount: "Konto erstellen...",
  errorOccurred: "Ein Fehler ist aufgetreten",
  password: "Passwort",
  passwordMustBeAtLeast8CharactersLong:
    "Passwort muss mindestens 8 Zeichen lang sein",
  passwordsDoNotMatch: "Passwörter stimmen nicht überein",
  signIn: "Anmelden",
  signUp: "Registrieren",
};

const dictionary: Dictionary<SignUpDictionary> = {
  "en-US": {
    alreadyHaveAccount: "Already have an account?",
    email: "Email",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    creatingAccount: "Creating account...",
    errorOccurred: "An error occurred during sign up",
    password: "Password",
    passwordMustBeAtLeast8CharactersLong:
      "Password must be at least 8 characters long",
    passwordsDoNotMatch: "Passwords do not match",
    signIn: "Sign in",
    signUp: "Sign up",
  },
  "de-DE": de,
  de,
};
