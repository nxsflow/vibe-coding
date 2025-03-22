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
  <div className="my-auto flex flex-col items-center gap-6 p-5">
    <h2 className="text-center text-red-800">{title}</h2>
    <div className="max-w-96 text-center text-base">{description}</div>
    {children}
    {href ? (
      <Link
        href={href}
        className="rounded-md border border-dark p-2 text-base hover:bg-dark hover:text-light dark:border-light dark:hover:bg-light dark:hover:text-dark"
      >
        {label}
      </Link>
    ) : onClick ? (
      <Button onClick={onClick}>{label}</Button>
    ) : null}
  </div>
);

export default Message;
