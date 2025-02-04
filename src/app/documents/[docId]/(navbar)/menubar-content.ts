import { useCurrentEditor } from "@tiptap/react";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { Menu } from "./types";
import { insertTable } from "./menu-insert-table";
import { onSaveHtml, onSaveJson, onSaveText } from "./on-download";

export const useMenubarContent = (): Menu[] => {
  const { editor } = useCurrentEditor();

  return [
    {
      label: "File",
      sections: [
        {
          menuItems: [
            {
              label: "Save",
              icon: FileIcon,
              subItems: [
                {
                  label: "JSON",
                  icon: FileJsonIcon,
                  onClick: () => onSaveJson(editor),
                },
                {
                  label: "HTML",
                  icon: GlobeIcon,
                  onClick: () => onSaveHtml(editor),
                },
                {
                  label: "PDF",
                  icon: BsFilePdf,
                  onClick: () => window.print(),
                },
                {
                  label: "Text",
                  icon: FileTextIcon,
                  onClick: () => onSaveText(editor),
                },
              ],
            },
            {
              label: "New Document",
              icon: FilePlusIcon,
            },
          ],
        },
        {
          menuItems: [
            {
              label: "Rename",
              icon: FilePenIcon,
            },
            {
              label: "Remove",
              icon: TrashIcon,
            },
          ],
        },
        {
          menuItems: [
            {
              label: "Print",
              icon: PrinterIcon,
              shortcut: "⌘P",
              onClick: () => window.print(),
            },
          ],
        },
      ],
    },
    {
      label: "Edit",
      sections: [
        {
          menuItems: [
            {
              label: "Undo",
              icon: Undo2Icon,
              shortcut: "⌘Z",
              onClick: () => editor?.chain().focus().undo().run(),
            },
            {
              label: "Redo",
              icon: Redo2Icon,
              shortcut: "⌘Y",
              onClick: () => editor?.chain().focus().redo().run(),
            },
          ],
        },
      ],
    },
    {
      label: "Insert",
      sections: [
        {
          menuItems: [
            {
              label: "Table",
              icon: TableIcon,
              subItems: [
                {
                  label: "1 x 1",
                  onClick: insertTable({ rows: 1, cols: 1, editor }),
                },
                {
                  label: "2 x 2",
                  onClick: insertTable({ rows: 2, cols: 2, editor }),
                },
                {
                  label: "4 x 4",
                  onClick: insertTable({ rows: 4, cols: 4, editor }),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Format",
      sections: [
        {
          menuItems: [
            {
              label: "Text",
              icon: TextIcon,
              subItems: [
                {
                  label: "Bold",
                  icon: BoldIcon,
                  shortcut: "⌘B",
                  onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                  label: "Italic",
                  icon: ItalicIcon,
                  shortcut: "⌘I",
                  onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                  label: "Underline",
                  icon: UnderlineIcon,
                  shortcut: "⌘U",
                  onClick: () =>
                    editor?.chain().focus().toggleUnderline().run(),
                },
                {
                  label: "Strikethrough",
                  icon: StrikethroughIcon,
                  shortcut: "⌘+Shift+S",
                  onClick: () => editor?.chain().focus().toggleStrike().run(),
                },
              ],
            },
            {
              label: "Clear",
              icon: RemoveFormattingIcon,
              onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
          ],
        },
      ],
    },
  ] as Menu[];
};
