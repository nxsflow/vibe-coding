import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ToolbarDropdown: FC<Props> = ({ children, open, onOpenChange }) => (
  <DropdownMenu {...{ open, onOpenChange }}>{children}</DropdownMenu>
);

export default ToolbarDropdown;
