import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export { highlightColors } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export * from "./is-custom-node-selected";
// export * from "./is-text-selected";
