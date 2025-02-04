import { useCurrentEditor } from "@tiptap/react";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { LucideIcon, MinusIcon, PlusIcon } from "lucide-react";

const FontSizeBtn = () => {
  const { editor } = useCurrentEditor();

  const currentFontSize =
    editor?.getAttributes("textStyle").fontSize?.replace("px", "") ?? "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      console.log("adjusting font size", { size });
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize < 1) return;
    updateFontSize(newSize.toString());
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <SizeBtn icon={MinusIcon} onClick={decrement} />
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="h-7 w-10 text-sm text-center border border-slate-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
          autoFocus
          onFocus={(e) => e.target.select()}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="h-7 w-10 text-sm text-center border border-slate-400 rounded-sm bg-transparent cursor-text"
        >
          {fontSize}
        </button>
      )}
      <SizeBtn icon={PlusIcon} onClick={increment} />
    </div>
  );
};

interface SizeBtnProps {
  icon: LucideIcon;
  onClick: () => void;
}

const SizeBtn: FC<SizeBtnProps> = ({ icon: Icon, onClick }) => (
  <button
    className="size-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-slate-50"
    onClick={onClick}
  >
    <Icon className="size-4" />
  </button>
);

export default FontSizeBtn;
