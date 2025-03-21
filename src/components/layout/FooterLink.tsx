import Link from "next/link";
import { FC } from "react";

interface FooterLinkProps {
  href: string;
  label: string;
  className?: string;
}

const FooterLink: FC<FooterLinkProps> = ({ href, label, className }) => {
  return (
    <div className={className}>
      <Link href={href} className="hover:underline hover:underline-offset-2">
        {label}
      </Link>
    </div>
  );
};

export default FooterLink;
