import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";
import ToolbarDropdown from "./toolbar-dropdown";
import ToolbarDropdownTrigger from "./toolbar-dropdown-trigger";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import ToolbarDropdownContent from "./toolbar-dropdown-content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ImageBtn = () => {
  const { editor } = useCurrentEditor();
  const [imgUrl, setImgUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onChange = () => {
    editor?.chain().focus().setImage({ src: imgUrl }).run();
    setImgUrl("");
    setDropdownOpen(false);
    setDialogOpen(false);
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      editor?.chain().focus().setImage({ src: url }).run();
      setImgUrl("");
      setDropdownOpen(false);
    };
    input.click();
  };

  const handleImageUrlSubmit = () => imgUrl && onChange();

  const onOpenChange = (open: boolean) => {
    setDropdownOpen(open);
    if (!open) return;
    setImgUrl(editor?.getAttributes("link").href ?? "");
  };

  return (
    <>
      <ToolbarDropdown {...{ open: dropdownOpen, onOpenChange }}>
        <ToolbarDropdownTrigger
          className="min-w-7 flex-col justify-center"
          hideChevron
        >
          <ImageIcon className="size-4" />
        </ToolbarDropdownTrigger>
        <ToolbarDropdownContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </ToolbarDropdownContent>
      </ToolbarDropdown>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleImageUrlSubmit()}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageBtn;
