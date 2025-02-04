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
import { useMenubarContent } from "./menubar-content";

const MenubarComponent = () => {
  const menubarContent = useMenubarContent();

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
