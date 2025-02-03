import { FC, ReactNode } from "react";

interface DocumentLayoutProps {
  children: ReactNode;
}

const DocumentLayout: FC<DocumentLayoutProps> = ({ children }) => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

export default DocumentLayout;
