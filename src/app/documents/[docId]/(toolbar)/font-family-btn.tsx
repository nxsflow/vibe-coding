import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import ToolbarDropdownContentButton from "./toolbar-dropdown-content-btn";
import ToolbarDropdown from "./toolbar-dropdown";
import ToolbarDropdownTrigger from "./toolbar-dropdown-trigger";
import ToolbarDropdownContent from "./toolbar-dropdown-content";

const FontFamilyBtn = () => {
  const { editor } = useCurrentEditor();

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

  return (
    <ToolbarDropdown>
      <ToolbarDropdownTrigger className="w-32 justify-between">
        <span className="truncate">
          {editor?.getAttributes("textStyle").fontFamily || "Arial"}
        </span>
      </ToolbarDropdownTrigger>
      <ToolbarDropdownContent>
        {fonts.map(({ label, value }) => (
          <ToolbarDropdownContentButton
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
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
