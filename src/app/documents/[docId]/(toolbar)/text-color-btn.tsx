import { useCurrentEditor } from "@tiptap/react";
import { type ColorResult } from "react-color";
import ToolbarColorPicker from "./toolbar-color-picker";

const TextColorBtn = () => {
  const { editor } = useCurrentEditor();

  const currentColor = editor?.getAttributes("textStyle").color || "#000";

  const onChange = (color: ColorResult) =>
    editor?.chain().focus().setColor(color.hex).run();

  return (
    <ToolbarColorPicker {...{ currentColor, onChange }}>
      <span className="text-xs">A</span>
      <div className="h-0.5 w-full" style={{ backgroundColor: currentColor }} />
    </ToolbarColorPicker>
  );
};

export default TextColorBtn;
