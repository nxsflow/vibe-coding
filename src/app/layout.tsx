import { FC, ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  return children;
};

export default RootLayout;
