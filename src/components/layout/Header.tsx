import Logo from "./Logo";
import HorizontalLine from "../design/HotizontalLine";
import AddButton from "./AddButton";
import Profile from "./Profile";
import { FC } from "react";
import { SupportedLocales } from "@/middleware";

interface HeaderProps {
  lang: SupportedLocales;
}

const Header: FC<HeaderProps> = ({ lang }) => (
  <div className="sticky top-0 left-0 right-0 z-[45] flex flex-col items-center justify-center bg-background/95 dark:bg-foreground/95 dark:text-background h-12 md:h-16 w-full print:hidden">
    <div className="relative flex items-center justify-center w-full xl:w-[80rem]">
      <AddButton />

      <Logo />

      <Profile {...{ lang }} />
    </div>

    <HorizontalLine index={2} brighter />
  </div>
);

export default Header;
