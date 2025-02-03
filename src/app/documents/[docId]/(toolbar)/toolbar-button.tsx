import { cn } from "@/lib/utils";
import { FC } from "react";
import { BtnProps } from "./types";

const ToolbarButton: FC<BtnProps> = ({ onClick, isActive, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-50",
        isActive && "bg-neutral-50"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export default ToolbarButton;
