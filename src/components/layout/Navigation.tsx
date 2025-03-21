"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "@/components/auth/SignOut";
import { SupportedLocales } from "@/middleware";

interface NavigationProps {
  lang: SupportedLocales;
}

export default function Navigation({ lang }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(`/${lang}${path}`);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-[45] flex flex-col items-center justify-center bg-background/95 dark:bg-foreground/95 dark:text-background h-12 md:h-16 w-full print:hidden border-b border-gray-200 dark:border-gray-800">
      <div className="relative flex items-center justify-center w-full xl:w-[80rem]">
        <div className="absolute left-2 flex items-center">
          <Link href="/" className="text-xl font-bold">
            Note App
          </Link>
        </div>

        <div className="absolute right-2 flex gap-4">
          <Link
            href={`/${lang}`}
            className={`px-3 py-2 rounded-md ${
              isActive("") && !isActive("/notes")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>
          <Link
            href={`/${lang}/notes`}
            className={`px-3 py-2 rounded-md ${
              isActive("/notes")
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Notes
          </Link>
          <SignOut lang={lang} />
        </div>
      </div>
    </nav>
  );
}
