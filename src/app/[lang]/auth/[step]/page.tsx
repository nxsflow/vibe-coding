import {
  ConfirmSignUp,
  ForgotPassword,
  MFA,
  ResetPassword,
  SignIn,
  SignUp,
} from "@/components/auth";
import { FC } from "react";
import { SupportedLocales } from "@/middleware";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authSteps = [
  "sign-in",
  "sign-up",
  "reset-password",
  "forgot-password",
  "confirm",
  "mfa",
] as const;
type AuthStep = (typeof authSteps)[number];

interface AuthStepLayoutProps {
  params: Promise<{
    step: AuthStep;
    lang: SupportedLocales;
  }>;
}

const AuthStepLayout: FC<AuthStepLayoutProps> = async ({ params }) => {
  const { step, lang } = await params;

  const AuthComponent =
    step === "sign-in"
      ? SignIn
      : step === "sign-up"
        ? SignUp
        : step === "reset-password"
          ? ResetPassword
          : step === "forgot-password"
            ? ForgotPassword
            : step === "confirm"
              ? ConfirmSignUp
              : step === "mfa"
                ? MFA
                : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {AuthComponent && <AuthComponent lang={lang} />}
    </div>
  );
};

export default AuthStepLayout;
