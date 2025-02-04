import { LucideIcon } from "lucide-react";
import { FC } from "react";

type BtnProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

type Section = Array<FC<> | (BtnProps & { label: string })>;

type Levels = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Heading = {
  label: string;
  value: Levels;
  fontSize: string;
  fontWeight?: string;
};
