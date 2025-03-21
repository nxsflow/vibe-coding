import Login from "@/components/amplify/Login";
import { FC } from "react";

interface LoginPageProps {
  params: {
    lang: string;
  };
}

const LoginPage: FC<LoginPageProps> = () => {
  // The Login component can access the language from context or URL if needed
  return <Login />;
};

export default LoginPage;
