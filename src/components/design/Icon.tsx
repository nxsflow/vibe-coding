import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import { memo } from "react";

interface IconProps {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: number;
}

export const Icon = memo(({ name, className, strokeWidth = 3 }: IconProps) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return (
    <IconComponent
      className={cn("size-4", className)}
      strokeWidth={strokeWidth}
    />
  );
});

Icon.displayName = "Icon";
