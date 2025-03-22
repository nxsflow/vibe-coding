"use client";

import { FC, useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dictionary, SupportedLocales } from "@/middleware";

interface ForgotPasswordProps {
  lang: SupportedLocales;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ lang }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const dict = dictionary[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { nextStep } = await resetPassword({ username: email });

      if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
        return;
      }

      setSuccess(true);
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
      <h2 className="mb-6 text-center text-2xl font-bold">Reset Password</h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-green-700">
          {dict.resetPasswordSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
          <p className="mt-1 text-xs text-gray-500">{dict.enterEmail}</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {isLoading ? dict.sendingResetCode : dict.resetPassword}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        {dict.rememberPassword}{" "}
        <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
          {dict.signIn}
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

type ForgotPasswordDictionary = Record<
  | "email"
  | "enterEmail"
  | "errorOccurred"
  | "rememberPassword"
  | "resetPassword"
  | "resetPasswordSuccess"
  | "sendingResetCode"
  | "signIn",
  string
>;

const de: ForgotPasswordDictionary = {
  resetPassword: "Passwort zurücksetzen",
  sendingResetCode: "Passwortcode wird gesendet...",
  resetPasswordSuccess: "Ein Passwortreset-Code wurde an Ihre E-Mail gesendet.",
  email: "E-Mail",
  enterEmail:
    "Geben Sie die E-Mail-Adresse ein, die mit Ihrem Konto verknüpft ist",
  rememberPassword: "Passwort wiederholen?",
  signIn: "Anmelden",
  errorOccurred: "Ein Fehler ist aufgetreten",
};

const dictionary: Dictionary<ForgotPasswordDictionary> = {
  "en-US": {
    resetPassword: "Reset Password",
    sendingResetCode: "Sending reset code...",
    resetPasswordSuccess: "A password reset code has been sent to your email.",
    email: "Email",
    enterEmail: "Enter the email address associated with your account",
    rememberPassword: "Remember your password?",
    signIn: "Sign in",
    errorOccurred: "An error occurred",
  },
  "de-DE": de,
  de,
};
