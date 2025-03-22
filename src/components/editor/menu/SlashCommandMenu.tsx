"use client";

import { useState, useCallback, forwardRef, useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Dictionary, SupportedLocales } from "@/middleware";
import { useSlashCommands } from "./useSlashCommands";
import { Icon } from "@/components/design/Icon";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

interface SlashCommandMenuProps {
  editor: Editor;
  lang: SupportedLocales;
  onCommand: (command: string) => void;
  initialQuery?: string;
}

const SlashCommandMenu = forwardRef<HTMLDivElement, SlashCommandMenuProps>(
  (props, ref) => {
    const { editor, lang, onCommand, initialQuery = "" } = props;
    const [query, setQuery] = useState(initialQuery);
    const dict = dictionary[lang];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const commands = useSlashCommands(lang, query);
    const menuRef = useRef<HTMLDivElement>(null);

    // Reset selected index when it's out of bounds
    useEffect(() => {
      if (selectedIndex >= commands.length) {
        setSelectedIndex(0);
      }
    }, [commands, selectedIndex]);

    // Update query when initialQuery changes from outside
    useEffect(() => {
      setQuery(initialQuery);
    }, [initialQuery]);

    // Focus the menu container when mounted
    useEffect(() => {
      if (menuRef.current) {
        menuRef.current.focus();
      }
    }, []);

    // Navigate through commands with arrow keys
    const navigateCommands = useCallback(
      (direction: "up" | "down") => {
        if (commands.length === 0) return;

        if (direction === "up") {
          setSelectedIndex((prev) =>
            prev <= 0 ? commands.length - 1 : prev - 1
          );
        } else {
          setSelectedIndex((prev) =>
            prev >= commands.length - 1 ? 0 : prev + 1
          );
        }
      },
      [commands]
    );

    // Execute the selected command
    const executeSelectedCommand = useCallback(() => {
      if (
        commands.length === 0 ||
        selectedIndex < 0 ||
        selectedIndex >= commands.length
      )
        return;

      const command = commands[selectedIndex];
      if (command) {
        // Execute command action
        command.action(editor);
        // Notify parent about executed command
        onCommand(command.title);
      }
    }, [commands, selectedIndex, editor, onCommand]);

    // Execute the command by title
    const selectItem = useCallback(
      (commandTitle: string) => {
        const command = commands.find((cmd) => cmd.title === commandTitle);
        if (command) {
          // Execute command action
          command.action(editor);
          // Notify parent about executed command
          onCommand(command.title);
        }
      },
      [commands, editor, onCommand]
    );

    // Handle escape key
    const handleEscape = useCallback(() => {
      // Signal to parent that menu should close without executing command
      onCommand("");
    }, [onCommand]);

    // Setup keyboard event handler for the menu component
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        // Only process if we received the event via our wrapper or the menu itself
        if (
          event.target instanceof Node &&
          menuRef.current?.contains(event.target)
        ) {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            event.stopPropagation();
            navigateCommands("up");
            return;
          }

          if (event.key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();
            navigateCommands("down");
            return;
          }

          if (event.key === "Enter" || event.key === "Tab") {
            event.preventDefault();
            event.stopPropagation();
            executeSelectedCommand();
            return;
          }

          if (event.key === "Escape") {
            event.preventDefault();
            handleEscape();
            return;
          }

          // For other keys, update our filter query
          if (!event.ctrlKey && !event.metaKey && !event.altKey) {
            if (event.key === "Backspace") {
              event.preventDefault();
              setQuery((prev) => prev.slice(0, -1));
            } else if (event.key.length === 1) {
              event.preventDefault();
              setQuery((prev) => prev + event.key);
            }
          }
        }
      },
      [navigateCommands, executeSelectedCommand, handleEscape]
    );

    return (
      <div
        className="slash-command-wrapper"
        ref={(node) => {
          // Combine refs
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          menuRef.current = node;
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Make div fully focusable
        data-testid="slash-command-menu"
      >
        {query.length === 0 && (
          <div className="border-b border-gray-200 p-2 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            {dict.placeholder}
          </div>
        )}
        <Command
          shouldFilter={false}
          loop={true}
          className="max-w-xs min-w-2xs"
        >
          <CommandList>
            {commands.length === 0 ? (
              <CommandEmpty className="px-4 py-2 text-base">
                {dict.noResults}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {commands.map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.title}
                    onSelect={() => selectItem(item.title)}
                    data-selected={index === selectedIndex}
                    className={
                      index === selectedIndex ? "bg-light dark:bg-dark" : ""
                    }
                  >
                    <Icon name={item.icon} className="mr-3" />
                    <span className="mr-3">{item.title}</span>
                    {item.shortcut && (
                      <CommandShortcut className="tracking-tighter text-dark/80 dark:text-light/80">
                        {item.shortcut}
                      </CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>
    );
  }
);

SlashCommandMenu.displayName = "SlashCommandMenu";

export default SlashCommandMenu;

type SlashCommandMenuDictionary = Record<
  "title" | "noResults" | "placeholder",
  string
>;
const de: SlashCommandMenuDictionary = {
  title: "Befehle",
  noResults: "Keine Optionen gefunden",
  placeholder: "Beginne zu tippen, um zu filtern...",
};
const dictionary: Dictionary<SlashCommandMenuDictionary> = {
  "en-US": {
    title: "Commands",
    noResults: "No options found",
    placeholder: "Type to filter commands...",
  },
  "de-DE": de,
  de,
};
