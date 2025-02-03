import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ToolbarDropdown: FC<Props> = ({ children }) => (
  <DropdownMenu>{children}</DropdownMenu>
);

export default ToolbarDropdown;
