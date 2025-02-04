import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

const ToolbarDropdownContent: FC<Props> = ({ children, className }) => (
  <DropdownMenuContent className={cn("pl-1 flex flex-col gap-y-1", className)}>
    {children}
  </DropdownMenuContent>
);

export default ToolbarDropdownContent;
