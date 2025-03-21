"use client";

import { FC } from "react";
import styles from "./logo.module.css";
import { cn } from "@/lib/utils";
import { CurrentContext } from "./CurrentContext";
import { useRouter } from "next/navigation";

// TODO: Add functionality to open the navigation menu

const Logo: FC = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className={cn(styles.logoIcon, "size-12 md:size-16 block")} />
      <CurrentContext className="hidden sm:flex uppercase" />
    </div>
  );
};

export default Logo;
