import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";
import ToolbarDropdown from "./toolbar-dropdown";
import ToolbarDropdownTrigger from "./toolbar-dropdown-trigger";
import { Link2Icon } from "lucide-react";
import ToolbarDropdownContent from "./toolbar-dropdown-content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LinkButton = () => {
  const { editor } = useCurrentEditor();
  const [value, setValue] = useState(editor?.getAttributes("link").href ?? "");
  const [open, setOpen] = useState(false);

  const onChange = () => {
    const selectedLink = editor?.chain().focus().extendMarkRange("link");
    if (value === "") selectedLink?.unsetMark("link").run();
    else selectedLink?.setLink({ href: value }).run();
    setValue("");
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) return;
    setValue(editor?.getAttributes("link").href ?? "");
  };

  return (
    <ToolbarDropdown {...{ open, onOpenChange }}>
      <ToolbarDropdownTrigger
        className="min-w-7 flex-col justify-center"
        hideChevron
      >
        <Link2Icon className="size-4" />
      </ToolbarDropdownTrigger>
      <ToolbarDropdownContent className="p-2.5 flex-row items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={onChange}>Apply</Button>
      </ToolbarDropdownContent>
    </ToolbarDropdown>
  );
};

export default LinkButton;
