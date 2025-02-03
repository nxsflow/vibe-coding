import { cn } from "@/lib/utils";
import { CSSProperties, FC, ReactNode } from "react";

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const ToolbarDropdownContentButton: FC<Props> = ({
  children,
  className,
  onClick,
  style,
}) => (
  <button
    className={cn(
      "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
      className
    )}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

export default ToolbarDropdownContentButton;
