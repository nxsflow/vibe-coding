import { FC, ReactNode } from "react";

interface LegalLayoutProps {
  children: ReactNode;
}

const LegalLayout: FC<LegalLayoutProps> = ({ children }) => (
  <div className="legal-layout">{children}</div>
);

export default LegalLayout;
