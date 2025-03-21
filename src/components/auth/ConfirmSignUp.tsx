"use client";

import { useState, useEffect, FC } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Dictionary, SupportedLocales } from "@/middleware";

interface ConfirmSignUpProps {
  lang: SupportedLocales;
}

const ConfirmSignUp: FC<ConfirmSignUpProps> = ({ lang }) => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const dict = dictionary[lang];

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      setSuccess(true);
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : dict.errorOccurred;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError("");

    try {
      await resendSignUpCode({ username: email });
      setResendSuccess(true);

      // Clear resend success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : dict.errorOccurred;
      setError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {resendSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {dict.newVerificationCodeSent}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {dict.emailVerified}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {dict.email}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            {dict.verificationCode}
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            {dict.enterVerificationCode}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            disabled={isLoading || success}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? dict.verifying : dict.verifyEmail}
          </button>

          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendLoading || success}
            className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {resendLoading ? dict.sending : dict.resendVerificationCode}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm">
        {dict.alreadyConfirmed}{" "}
        <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
          {dict.signIn}
        </Link>
      </p>
    </div>
  );
};

export default ConfirmSignUp;

type ConfirmSignUpDictionary = Record<
  | "alreadyConfirmed"
  | "email"
  | "emailVerified"
  | "enterVerificationCode"
  | "errorOccurred"
  | "newVerificationCodeSent"
  | "resendVerificationCode"
  | "sending"
  | "signIn"
  | "verificationCode"
  | "verifyEmail"
  | "verifying",
  string
>;

const de: ConfirmSignUpDictionary = {
  signIn: "Anmelden",
  errorOccurred: "Ein Fehler ist während der Bestätigung aufgetreten",
  newVerificationCodeSent:
    "Ein neuer Bestätigungscode wurde an Ihre E-Mail gesendet.",
  emailVerified:
    "Ihre E-Mail wurde erfolgreich bestätigt. Weiterleitung zum Anmelden...",
  alreadyConfirmed: "Bereits bestätigt?",
  verifyEmail: "E-Mail bestätigen",
  verifying: "Bestätigen...",
  sending: "Senden...",
  resendVerificationCode: "Bestätigungscodes erneut senden",
  verificationCode: "Bestätigungscodes",
  enterVerificationCode:
    "Geben Sie den Bestätigungscodes ein, der an Ihre E-Mail gesendet wurde",
  email: "E-Mail",
};

const dictionary: Dictionary<ConfirmSignUpDictionary> = {
  "en-US": {
    signIn: "Sign In",
    errorOccurred: "An error occurred during confirmation",
    newVerificationCodeSent:
      "A new verification code has been sent to your email.",
    emailVerified:
      "Your email has been verified successfully. Redirecting to sign in...",
    alreadyConfirmed: "Already confirmed?",
    verifyEmail: "Verify Email",
    verifying: "Verifying...",
    sending: "Sending...",
    resendVerificationCode: "Resend verification code",
    verificationCode: "Verification Code",
    enterVerificationCode: "Enter the verification code sent to your email",
    email: "Email",
  },
  "de-DE": de,
  de,
};
