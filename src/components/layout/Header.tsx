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
  <div className="sticky top-0 right-0 left-0 z-[45] flex h-12 w-full flex-col items-center justify-center bg-background/95 md:h-16 dark:bg-foreground/95 dark:text-background print:hidden">
    <div className="relative flex w-full items-center justify-center xl:w-[80rem]">
      <AddButton />

      <Logo />

      <Profile {...{ lang }} />
    </div>

    <HorizontalLine index={2} brighter />
  </div>
);

export default Header;
