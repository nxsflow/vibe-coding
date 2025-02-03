import { LucideIcon } from "lucide-react";
import { FC } from "react";

type BtnProps = {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
};

type Section = Array<FC<> | (BtnProps & { label: string })>;

type Heading = {
  label: string;
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  fontSize: string;
  fontWeight?: string;
};
