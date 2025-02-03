import { useCurrentEditor } from "@tiptap/react";
import ToolbarDropdownContentButton from "./toolbar-dropdown-content-btn";
import ToolbarDropdown from "./toolbar-dropdown";
import ToolbarDropdownContent from "./toolbar-dropdown-content";
import { useState } from "react";
import ToolbarDropdownTrigger from "./toolbar-dropdown-trigger";

const FontFamilyBtn = () => {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);

  const fonts = [
    { label: "Inter", value: "Inter" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Courier New", value: "Courier New" },
    { label: "Roboto", value: "Roboto" },
    { label: "Arial", value: "Arial" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
    { label: "Garamond", value: "Garamond" },
  ];

  const onChange = (value: string) => () => {
    editor?.chain().focus().setFontFamily(value).run();
    setOpen(false);
  };

  return (
    <ToolbarDropdown {...{ open, onOpenChange: setOpen }}>
      <ToolbarDropdownTrigger className="w-32 justify-between">
        <span className="truncate">
          {editor?.getAttributes("textStyle").fontFamily || "Arial"}
        </span>
      </ToolbarDropdownTrigger>
      <ToolbarDropdownContent>
        {fonts.map(({ label, value }) => (
          <ToolbarDropdownContentButton
            key={value}
            onClick={onChange(value)}
            isActive={editor?.getAttributes("textStyle").fontFamily === value}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </ToolbarDropdownContentButton>
        ))}
      </ToolbarDropdownContent>
    </ToolbarDropdown>
  );
};

export default FontFamilyBtn;
