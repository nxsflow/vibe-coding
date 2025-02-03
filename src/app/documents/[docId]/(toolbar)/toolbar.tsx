"use client";

import { FC } from "react";
import { Section } from "./types";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import ToolbarButton from "./toolbar-button";
import { useCurrentEditor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import FontFamilyBtn from "./font-family-btn";
import HeadingLevelBtn from "./heading-level-btn";
import TextColorBtn from "./text-color-btn";
import HighlightColorBtn from "./highlight-color-btn";
import LinkButton from "./link-btn";
import ImageBtn from "./image-btn";

interface Props {
  test?: string;
}

const Toolbar: FC<Props> = () => {
  const { editor } = useCurrentEditor();

  const sections: Section[] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      { label: "Print", icon: PrinterIcon, onClick: () => window.print() },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [FontFamilyBtn],
    [HeadingLevelBtn],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
      TextColorBtn,
      HighlightColorBtn,
    ],
    [
      LinkButton,
      ImageBtn,
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Add a comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-10 print:hidden p-2">
      <div className="bg-neutral-200/95 px-2.5 py-0.5 rounded-3xl min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
        {sections.map((section, index) => (
          <div key={index} className="flex items-center gap-x-0.5">
            {index > 0 && (
              <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300"
              />
            )}
            {section.map((item) => {
              if (typeof item === "function") {
                const FnComponent = item;
                return <FnComponent key={item.name} />;
              }

              return <ToolbarButton key={item.label} {...item} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
