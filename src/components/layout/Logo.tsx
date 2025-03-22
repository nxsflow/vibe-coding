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
      className="flex cursor-pointer items-center"
      onClick={() => router.push("/")}
    >
      <div className={cn(styles.logoIcon, "block size-12 md:size-16")} />
      <CurrentContext className="hidden uppercase sm:flex" />
    </div>
  );
};

export default Logo;
