import { Extension } from "@tiptap/core";
import { PluginKey, Plugin } from "@tiptap/pm/state";
import { SupportedLocales } from "@/middleware";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import SlashCommandMenu from "@/components/editor/menu/SlashCommandMenu";

export interface SlashCommandOptions {
  lang: SupportedLocales;
}

export const SlashCommandKey = new PluginKey("slash-command");

export const SlashCommand = (options: SlashCommandOptions) => {
  return Extension.create({
    name: "slash-command",

    // Add storage for slash command state
    addStorage() {
      return {
        isActive: false,
        slashPos: -1,
      };
    },

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: SlashCommandKey,
          props: {
            // Handle keydown events to prevent editor from capturing them when menu is active
            handleKeyDown: (view, event) => {
              // Check if slash command menu is active
              const isActive = this.storage.isActive;

              if (
                isActive &&
                (event.key === "ArrowUp" ||
                  event.key === "ArrowDown" ||
                  event.key === "Enter" ||
                  event.key === "Tab" ||
                  event.key === "Escape")
              ) {
                // Prevent the editor from handling these keys
                event.preventDefault();

                // If Escape is pressed, delete the slash command text and close the menu
                if (event.key === "Escape") {
                  const slashPos = this.storage.slashPos;
                  const currentPos = this.editor.state.selection.from;

                  // Delete the slash command text if we have valid positions
                  if (slashPos >= 0 && currentPos > slashPos) {
                    this.editor
                      .chain()
                      .focus()
                      .deleteRange({
                        from: slashPos,
                        to: currentPos,
                      })
                      .run();
                  }

                  // Mark menu as inactive
                  this.storage.isActive = false;
                  return true;
                }

                // Forward other key events to the menu's handler
                if (document.querySelector(".slash-command-wrapper")) {
                  const customEvent = new KeyboardEvent("keydown", {
                    key: event.key,
                    code: event.code,
                    shiftKey: event.shiftKey,
                    altKey: event.altKey,
                    ctrlKey: event.ctrlKey,
                    metaKey: event.metaKey,
                    bubbles: true,
                  });

                  document
                    .querySelector(".slash-command-wrapper")
                    ?.dispatchEvent(customEvent);
                  return true;
                }
              }

              return false;
            },
          },
          view: () => {
            let tippyInstance: TippyInstance | null = null;
            let reactRenderer: ReactRenderer | null = null;
            let searchText = "";

            // Helper to clean up resources
            const destroyMenu = () => {
              if (tippyInstance) {
                tippyInstance.destroy();
                tippyInstance = null;
              }
              if (reactRenderer) {
                reactRenderer.destroy();
                reactRenderer = null;
              }

              // Reset storage state
              this.storage.isActive = false;
              this.storage.slashPos = -1;
            };

            return {
              update: (view) => {
                const { state } = view;
                const { selection } = state;
                const { $from } = selection;

                // Check for clicks outside the command menu
                if (this.storage.isActive && !selection.empty) {
                  destroyMenu();
                  return true;
                }

                // Get the text content of the current line up to the cursor position
                const textBefore = $from.parent.textContent.slice(
                  0,
                  $from.parentOffset
                );

                // Detect slash command scenarios
                const justTypedSlash = textBefore === "/";
                const lineHasSlash = textBefore.includes("/");

                // Check if the slash is at the beginning of a line or after whitespace
                const slashIndex = textBefore.lastIndexOf("/");
                const validSlashPosition = slashIndex === 0;

                const shouldShowMenu =
                  (justTypedSlash || (lineHasSlash && validSlashPosition)) &&
                  selection.empty;

                // If backspace was pressed and the slash is gone, hide menu
                if (this.storage.isActive && textBefore.length === 0) {
                  destroyMenu();
                  return true;
                }

                if (shouldShowMenu) {
                  // Set active state in storage
                  this.storage.isActive = true;

                  // Extract text typed after the last slash
                  if (justTypedSlash) {
                    searchText = "";
                    // Store the position of the slash
                    this.storage.slashPos = $from.pos - 1;
                  } else if (validSlashPosition) {
                    searchText = textBefore.substring(slashIndex + 1);

                    // If this is the first time we're showing the menu for this slash
                    if (this.storage.slashPos === -1) {
                      // Store position where the slash is
                      const slashNodeStart = $from.start();
                      this.storage.slashPos = slashNodeStart + slashIndex;
                    }
                  }

                  // Create or update the menu
                  if (!tippyInstance) {
                    // Create menu on first detection
                    reactRenderer = new ReactRenderer(SlashCommandMenu, {
                      props: {
                        editor: this.editor,
                        lang: options.lang,
                        initialQuery: searchText,
                        onCommand: (commandTitle: string) => {
                          try {
                            const currentPos = this.editor.state.selection.from;
                            const slashPos = this.storage.slashPos;

                            // Only delete the slash command text if we have valid positions
                            if (slashPos >= 0 && currentPos > slashPos) {
                              this.editor
                                .chain()
                                .focus()
                                .deleteRange({
                                  from: slashPos,
                                  to: currentPos,
                                })
                                .run();
                            }

                            // Cleanup
                            destroyMenu();

                            // If ESC was pressed, commandTitle will be empty
                            if (!commandTitle) {
                              return;
                            }
                          } catch (error) {
                            console.error("Error handling command:", error);
                            destroyMenu();
                          }
                        },
                      },
                      editor: this.editor,
                    });

                    const element = view.dom;

                    tippyInstance = tippy(element, {
                      getReferenceClientRect: () => {
                        try {
                          // Get coordinates for the menu position
                          const coords = view.coordsAtPos($from.pos);
                          return new DOMRect(coords.left, coords.top, 0, 24);
                        } catch (error) {
                          console.error("Error calculating position:", error);
                          // Fallback positioning
                          const element = view.dom.getBoundingClientRect();
                          return new DOMRect(
                            element.left,
                            element.top + 24,
                            0,
                            24
                          );
                        }
                      },
                      appendTo: () => document.body,
                      content: reactRenderer.element,
                      showOnCreate: true,
                      interactive: true,
                      trigger: "manual",
                      placement: "bottom-start",
                      onHidden: () => {
                        // Clean up when tippy is hidden for any reason
                        destroyMenu();
                      },
                      // Hide when clicking outside
                      onClickOutside: () => {
                        // Delete the slash command text if we have valid positions
                        const currentPos = this.editor.state.selection.from;
                        const slashPos = this.storage.slashPos;

                        if (slashPos >= 0 && currentPos > slashPos) {
                          this.editor
                            .chain()
                            .focus()
                            .deleteRange({
                              from: slashPos,
                              to: currentPos,
                            })
                            .run();
                          this.storage.isActive = false;
                        }
                      },
                    });
                  } else {
                    // Update existing menu with new search text
                    if (reactRenderer) {
                      reactRenderer.updateProps({
                        editor: this.editor,
                        lang: options.lang,
                        initialQuery: searchText,
                        onCommand: (commandTitle: string) => {
                          try {
                            const currentPos = this.editor.state.selection.from;
                            const slashPos = this.storage.slashPos;

                            // Only delete the slash command text if we have valid positions
                            if (slashPos >= 0 && currentPos > slashPos) {
                              this.editor
                                .chain()
                                .focus()
                                .deleteRange({
                                  from: slashPos,
                                  to: currentPos,
                                })
                                .run();
                            }

                            // Cleanup
                            destroyMenu();

                            // If ESC was pressed, commandTitle will be empty
                            if (!commandTitle) {
                              return;
                            }
                          } catch (error) {
                            console.error("Error handling command:", error);
                            destroyMenu();
                          }
                        },
                      });
                    }

                    // Update tippy position
                    tippyInstance.setProps({
                      getReferenceClientRect: () => {
                        try {
                          const coords = view.coordsAtPos($from.pos);
                          return new DOMRect(coords.left, coords.top, 0, 24);
                        } catch (error) {
                          console.error("Error calculating position:", error);
                          const element = view.dom.getBoundingClientRect();
                          return new DOMRect(
                            element.left,
                            element.top + 24,
                            0,
                            24
                          );
                        }
                      },
                    });

                    tippyInstance.show();
                  }
                } else if (tippyInstance && this.storage.isActive) {
                  // Hide the menu when conditions no longer match
                  destroyMenu();
                }

                return true;
              },
              destroy: () => {
                // Clean up resources when editor is destroyed
                destroyMenu();
              },
            };
          },
        }),
      ];
    },
  });
};
