import { cn } from "@/lib/utils";
import { CSSProperties, FC, ReactNode } from "react";

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  isActive?: boolean;
}

const ToolbarDropdownContentButton: FC<Props> = ({
  children,
  className,
  onClick,
  style,
  isActive,
}) => (
  <button
    className={cn(
      "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-100",
      isActive && "bg-neutral-200",
      className
    )}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

export default ToolbarDropdownContentButton;
