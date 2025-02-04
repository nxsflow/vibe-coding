import { LucideIcon } from "lucide-react";
import { IconType as ReactIcon } from "react-icons/lib";

type IconType = LucideIcon | ReactIcon;

type Menu = {
  label: string;
  sections: {
    menuItems: MenuItem[];
  }[];
};

type MenuItem = (
  | {
      subItems: MenuItem[];
      onClick?: never;
    }
  | {
      subItems?: never;
      onClick?: () => void;
    }
) & {
  label: string;
  icon?: IconType;
  shortcut?: string;
};
