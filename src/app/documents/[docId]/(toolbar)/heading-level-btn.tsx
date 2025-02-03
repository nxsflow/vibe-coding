import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Heading, Levels } from "./types";
import ToolbarDropdownContentButton from "./toolbar-dropdown-content-btn";
import ToolbarDropdownContent from "./toolbar-dropdown-content";
import ToolbarDropdown from "./toolbar-dropdown";
import ToolbarDropdownTrigger from "./toolbar-dropdown-trigger";
import { useState } from "react";

const HeadingLevelBtn = () => {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);

  const headings: Array<Heading> = [
    { label: "Normal text", value: 0, fontSize: "1rem" },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "var(--heading-1-size)",
      fontWeight: "var(--heading-1-weight)",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "var(--heading-2-size)",
      fontWeight: "var(--heading-2-weight)",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "var(--heading-3-size)",
      fontWeight: "var(--heading-3-weight)",
    },
    {
      label: "Heading 4",
      value: 4,
      fontSize: "var(--heading-4-size)",
      fontWeight: "var(--heading-4-weight)",
    },
    {
      label: "Heading 5",
      value: 5,
      fontSize: "var(--heading-5-size)",
      fontWeight: "var(--heading-5-weight)",
    },
    {
      label: "Heading 6",
      value: 6,
      fontSize: "var(--heading-6-size)",
      fontWeight: "var(--heading-6-weight)",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  const onChange = (value: Levels) => () => {
    if (value === 0) editor?.chain().focus().setParagraph().run();
    else editor?.chain().focus().toggleHeading({ level: value }).run();

    setOpen(false);
  };

  return (
    <ToolbarDropdown {...{ open, onOpenChange: setOpen }}>
      <ToolbarDropdownTrigger className="min-w-7 justify-center">
        <span className="truncate">{getCurrentHeading()}</span>
      </ToolbarDropdownTrigger>
      <ToolbarDropdownContent>
        {headings.map(({ label, value, fontSize, fontWeight }) => (
          <ToolbarDropdownContentButton
            key={value}
            onClick={onChange(value)}
            style={{ fontSize, fontWeight }}
            className={cn(
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-50")
            )}
          >
            <span>{label}</span>
          </ToolbarDropdownContentButton>
        ))}
      </ToolbarDropdownContent>
    </ToolbarDropdown>
  );
};

export default HeadingLevelBtn;
