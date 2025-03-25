import { FC } from "react";
import HorizontalLine from "@/components/design/HotizontalLine";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <div className="flex flex-col gap-4 pt-8 text-sm text-gray-400 print:hidden">
      <HorizontalLine />

      <div className="relative flex w-full items-center justify-center">
        <div className="absolute left-4">&copy; 2025, Carsten Koch</div>

        <div className="absolute right-4">
          <Link
            href="https://nexflow.it"
            className="hover:underline hover:underline-offset-2"
          >
            Sign up for nexflow.it
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
