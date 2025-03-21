import { cn } from "@/lib/utils";
import Image from "next/image";
import type { FC } from "react";

interface HorizontalLineProps {
  index?: number;
  brighter?: boolean;
  className?: string;
}

const HorizontalLine: FC<HorizontalLineProps> = ({
  index = 1,
  brighter,
  className,
}) => (
  <Image
    src={`/assets/lines/ul${index}.svg`}
    alt="line"
    width={1024}
    height={4}
    className={cn(
      "w-full h-1",
      !brighter
        ? "[filter:invert(70%)_sepia(10%)_saturate(10%)_hue-rotate(180deg)]"
        : "[filter:invert(90%)_sepia(10%)_saturate(10%)_hue-rotate(180deg)] dark:[filter:invert(30%)_sepia(10%)_saturate(10%)_hue-rotate(180deg)]",
      className
    )}
  />
);

export default HorizontalLine;
