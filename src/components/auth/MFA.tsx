"use client";

import { useState, FC } from "react";
import { confirmSignIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Dictionary, SupportedLocales } from "@/middleware";

interface MFAProps {
  lang: SupportedLocales;
}

const MFA: FC<MFAProps> = ({ lang }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const dict = dictionary[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { isSignedIn } = await confirmSignIn({
        challengeResponse: code,
      });

      if (isSignedIn) {
        router.push("/");
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
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {dict.authenticationCode}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            {dict.authenticationCode}
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            autoFocus
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
          />
          <p className="mt-1 text-xs text-gray-500">{dict.enter6DigitCode}</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? dict.verifying : dict.verify}
        </button>
      </form>
    </div>
  );
};

export default MFA;

type MFADictionary = Record<
  | "authenticationCode"
  | "enter6DigitCode"
  | "errorOccurred"
  | "verify"
  | "verifying",
  string
>;

const de: MFADictionary = {
  authenticationCode: "Authentifizierungscode",
  enter6DigitCode:
    "Geben Sie den 6-stelligen Code aus Ihrer Authentifizierungs-App ein",
  verify: "Verifizieren",
  verifying: "Verifizieren...",
  errorOccurred: "Ein Fehler ist während der MFA-Verifizierung aufgetreten",
};

const dictionary: Dictionary<MFADictionary> = {
  "en-US": {
    authenticationCode: "Authentication Code",
    enter6DigitCode: "Enter the 6-digit code from your authenticator app",
    verify: "Verify",
    verifying: "Verifying...",
    errorOccurred: "An error occurred during MFA verification",
  },
  "de-DE": de,
  de,
};
