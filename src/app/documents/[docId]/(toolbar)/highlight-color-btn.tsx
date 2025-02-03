import { useCurrentEditor } from "@tiptap/react";
import { ColorResult } from "react-color";
import ToolbarColorPicker from "./toolbar-color-picker";
import { HighlighterIcon } from "lucide-react";

const HighlightColorBtn = () => {
  const { editor } = useCurrentEditor();

  const currentColor = editor?.getAttributes("highlight").color;

  const isDark = (color: string) =>
    parseInt(color.replace("#", ""), 16) < 0xffffff / 2;

  const invertTextColor = (color: string) => {
    const invertedTextColor =
      "#" +
      (0xffffff - parseInt(color.replace("#", ""), 16))
        .toString(16)
        .padStart(6, "0");
    editor?.chain().focus().setColor(invertedTextColor).run();
  };

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
    const currentTextColor = editor?.getAttributes("textStyle").color ?? "#000";
    if (
      (isDark(color.hex) && isDark(currentTextColor)) ||
      (!isDark(color.hex) && !isDark(currentTextColor))
    )
      invertTextColor(currentTextColor);
  };

  return (
    <ToolbarColorPicker {...{ currentColor, onChange }}>
      <div
        style={{ backgroundColor: currentColor ?? "inherit" }}
        className="p-1 rounded-sm"
      >
        <HighlighterIcon
          className="size-4"
          style={{
            color:
              currentColor && isDark(currentColor)
                ? "hsl(var(--background))"
                : undefined,
          }}
        />
      </div>
    </ToolbarColorPicker>
  );
};

export default HighlightColorBtn;
