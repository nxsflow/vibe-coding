"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
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

const MenubarComponent = () => {
  const menubarContent: Menu[] = [
    {
      label: "File",
      sections: [
        {
          menuItems: [
            {
              label: "Save",
              icon: FileIcon,
              subItems: [
                { label: "JSON", icon: FileJsonIcon },
                { label: "HTML", icon: GlobeIcon },
                { label: "PDF", icon: BsFilePdf },
                { label: "Text", icon: FileTextIcon },
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
            },
            {
              label: "Redo",
              icon: Redo2Icon,
              shortcut: "⌘Y",
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
                },
                {
                  label: "2 x 2",
                },
                {
                  label: "4 x 4",
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
                },
                {
                  label: "Italic",
                  icon: ItalicIcon,
                  shortcut: "⌘I",
                },
                {
                  label: "Underline",
                  icon: UnderlineIcon,
                  shortcut: "⌘U",
                },
                {
                  label: "Strikethrough",
                  icon: StrikethroughIcon,
                  shortcut: "⌘+Shift+S",
                },
              ],
            },
            {
              label: "Clear",
              icon: RemoveFormattingIcon,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="flex">
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
        {menubarContent.map((menu, midx) => (
          <MenubarMenu key={midx}>
            <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
              {menu.label}
            </MenubarTrigger>
            <MenubarContent className="print:hidden">
              {menu.sections.map((section, sidx) => (
                <div key={sidx}>
                  {sidx > 0 && <MenubarSeparator />}
                  {section.menuItems.map(
                    (
                      { subItems, label, icon: Icon, onClick, shortcut },
                      midx
                    ) =>
                      subItems ? (
                        <MenubarSub key={midx}>
                          <MenubarSubTrigger>
                            {Icon && <Icon className="size-4 mr-2" />}
                            {label}
                          </MenubarSubTrigger>
                          <MenubarSubContent>
                            {subItems.map(
                              (
                                { icon: Icon, label, onClick, shortcut },
                                siidx
                              ) => (
                                <MenubarItem key={siidx} {...{ onClick }}>
                                  {Icon && <Icon className="size-4 mr-2" />}
                                  {label}&nbsp;
                                  {shortcut && (
                                    <MenubarShortcut>
                                      {shortcut}
                                    </MenubarShortcut>
                                  )}
                                </MenubarItem>
                              )
                            )}
                          </MenubarSubContent>
                        </MenubarSub>
                      ) : (
                        <MenubarItem key={midx} {...{ onClick }}>
                          {Icon && <Icon className="size-4 mr-2" />}
                          {label}&nbsp;
                          {shortcut && (
                            <MenubarShortcut>{shortcut}</MenubarShortcut>
                          )}
                        </MenubarItem>
                      )
                  )}
                </div>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </div>
  );
};

export default MenubarComponent;
