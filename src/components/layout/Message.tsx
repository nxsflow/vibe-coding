import Link from "next/link";
import type { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  title: ReactNode;
  description: ReactNode;
  label?: ReactNode;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Message: FC<Props> = ({
  title,
  description,
  label,
  href,
  onClick,
  children,
}) => (
  <div className="my-auto p-5 flex flex-col gap-6 items-center">
    <h2 className="text-red-800 text-center">{title}</h2>
    <div className="max-w-96 text-center text-base">{description}</div>
    {children}
    {href ? (
      <Link
        href={href}
        className="border border-dark dark:border-light p-2 rounded-md hover:bg-dark dark:hover:bg-light hover:text-light dark:hover:text-dark text-base"
      >
        {label}
      </Link>
    ) : onClick ? (
      <Button onClick={onClick}>{label}</Button>
    ) : null}
  </div>
);

export default Message;
