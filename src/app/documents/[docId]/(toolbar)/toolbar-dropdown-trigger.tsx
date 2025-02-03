import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { FC, ReactNode } from "react";

interface ToolbarDropdownTriggerProps {
  className?: string;
  children?: ReactNode;
  hideChevron?: boolean;
}

const ToolbarDropdownTrigger: FC<ToolbarDropdownTriggerProps> = ({
  className,
  children,
  hideChevron = false,
}) => {
  return (
    <DropdownMenuTrigger asChild>
      <button
        className={cn(
          "h-7 shrink-0 flex items-center rounded-sm hover:bg-neutral-50 px-1.5 overflow-hidden text-sm",
          className
        )}
      >
        {children}
        {!hideChevron && <ChevronDownIcon className="ml-2 size-4 shrink-0" />}
      </button>
    </DropdownMenuTrigger>
  );
};

export default ToolbarDropdownTrigger;
