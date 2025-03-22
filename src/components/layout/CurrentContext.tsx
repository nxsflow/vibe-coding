"use client";

import { cn } from "@/lib/utils";
import { type FC, useEffect, useState } from "react";

interface CurrentContextProps {
  className?: string;
}

export const CurrentContext: FC<CurrentContextProps> = ({ className }) => {
  const [theme, setTheme] = useState("family"); // default theme as seen in layout.tsx

  useEffect(() => {
    // Get initial theme
    const bodyTheme = document.body.getAttribute("data-theme");
    if (bodyTheme) setTheme(bodyTheme);

    // Create observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme = document.body.getAttribute("data-theme");
          if (newTheme) setTheme(newTheme);
        }
      });
    });

    // Start observing the body element for attribute changes
    observer.observe(document.body, { attributes: true });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("mr-4 items-center font-sans font-bold", className)}>
      {theme}
    </div>
  );
};
