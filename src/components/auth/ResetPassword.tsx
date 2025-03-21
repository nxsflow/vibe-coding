"use client";

import { useState, useEffect, FC } from "react";
import { confirmResetPassword } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Dictionary, SupportedLocales } from "@/middleware";

interface ResetPasswordProps {
  lang: SupportedLocales;
}

const ResetPassword: FC<ResetPasswordProps> = ({ lang }) => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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

    if (newPassword !== confirmPassword) {
      setError(dict.passwordsDoNotMatch);
      setIsLoading(false);
      return;
    }

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
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

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {dict.setNewPassword}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {dict.passwordResetSuccess}
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

        <div className="mb-4">
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

        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium mb-1"
          >
            {dict.newPassword}
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            minLength={8}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1"
          >
            {dict.confirmNewPassword}
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? dict.resettingPassword : dict.resetPassword}
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

export default ResetPassword;

type ResetPasswordDictionary = Record<
  | "confirmNewPassword"
  | "email"
  | "enterVerificationCode"
  | "errorOccurred"
  | "newPassword"
  | "passwordResetSuccess"
  | "passwordsDoNotMatch"
  | "rememberPassword"
  | "resetPassword"
  | "resettingPassword"
  | "setNewPassword"
  | "signIn"
  | "verificationCode",
  string
>;

const de: ResetPasswordDictionary = {
  confirmNewPassword: "Neues Passwort bestätigen",
  email: "E-Mail",
  enterVerificationCode: "Verifikationscode eingeben",
  errorOccurred: "Ein Fehler ist aufgetreten",
  newPassword: "Neues Passwort",
  passwordResetSuccess: "Passwort erfolgreich zurückgesetzt",
  passwordsDoNotMatch: "Passwörter stimmen nicht überein",
  rememberPassword: "Passwort wiederholen?",
  resetPassword: "Passwort zurücksetzen",
  resettingPassword: "Passwort wird zurückgesetzt...",
  setNewPassword: "Neues Passwort setzen",
  signIn: "Anmelden",
  verificationCode: "Verifikationscode",
};

const dictionary: Dictionary<ResetPasswordDictionary> = {
  "en-US": {
    confirmNewPassword: "Confirm New Password",
    email: "Email",
    enterVerificationCode: "Enter Verification Code",
    errorOccurred: "An error occurred",
    newPassword: "New Password",
    passwordResetSuccess: "Password reset successfully",
    passwordsDoNotMatch: "Passwords do not match",
    rememberPassword: "Remember your password?",
    resetPassword: "Reset Password",
    resettingPassword: "Resetting password...",
    setNewPassword: "Set New Password",
    signIn: "Sign In",
    verificationCode: "Verification Code",
  },
  "de-DE": de,
  de,
};
