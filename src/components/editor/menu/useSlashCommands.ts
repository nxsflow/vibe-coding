import { Editor } from "@tiptap/react";
import { icons } from "lucide-react";
import { Dictionary, SupportedLocales } from "@/middleware";

export type CommandItem = {
  title: string;
  icon: keyof typeof icons;
  action: (editor: Editor) => void;
  shortcut?: string;
  keywords?: string[];
};

export const useSlashCommands = (lang: SupportedLocales, query?: string) => {
  const dict = dictionary[lang];
  const commands: CommandItem[] = [
    {
      title: dict.heading1,
      icon: "Heading1",
      action: (editor) => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      shortcut: "#",
      keywords: ["h1", "title", "header"],
    },
    {
      title: dict.heading2,
      icon: "Heading2",
      action: (editor) => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
      shortcut: "##",
      keywords: ["h2", "subtitle", "header"],
    },
    {
      title: dict.heading3,
      icon: "Heading3",
      action: (editor) => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
      shortcut: "###",
      keywords: ["h3", "subheader", "header"],
    },
    {
      title: dict.paragraph,
      icon: "Pilcrow",
      action: (editor) => {
        editor.chain().focus().setParagraph().run();
      },
      keywords: ["p", "text", "normal"],
    },
    {
      title: dict.bulletList,
      icon: "List",
      action: (editor) => {
        editor.chain().focus().toggleBulletList().run();
      },
      shortcut: "-",
      keywords: ["ul", "bullet", "unordered"],
    },
    {
      title: dict.orderedList,
      icon: "ListOrdered",
      action: (editor) => {
        editor.chain().focus().toggleOrderedList().run();
      },
      shortcut: "1.",
      keywords: ["ol", "number", "ordered"],
    },
    {
      title: dict.blockquote,
      icon: "Quote",
      action: (editor) => {
        editor.chain().focus().toggleBlockquote().run();
      },
      shortcut: ">",
      keywords: ["quote", "blockquote", "cite"],
    },
    {
      title: dict.horizontalRule,
      icon: "Minus",
      action: (editor) => {
        editor.chain().focus().setHorizontalRule().run();
      },
      shortcut: "---",
      keywords: ["hr", "divider", "line"],
    },
    {
      title: dict.codeBlock,
      icon: "Code",
      action: (editor) => {
        editor.chain().focus().toggleCodeBlock().run();
      },
      shortcut: "```",
      keywords: ["code", "codeblock", "pre"],
    },
    {
      title: dict.bold,
      icon: "Bold",
      action: (editor) => {
        editor.chain().focus().toggleBold().run();
      },
      shortcut: "**",
      keywords: ["b", "strong", "bold"],
    },
    {
      title: dict.italic,
      icon: "Italic",
      action: (editor) => {
        editor.chain().focus().toggleItalic().run();
      },
      shortcut: "*",
      keywords: ["i", "em", "italic"],
    },
    {
      title: dict.strike,
      icon: "Strikethrough",
      action: (editor) => {
        editor.chain().focus().toggleStrike().run();
      },
      shortcut: "~~",
      keywords: ["s", "del", "strike", "strikethrough"],
    },
  ];

  // Filter commands based on query
  if (!query || query.trim() === "") {
    return commands;
  }

  const normalizedQuery = query.toLowerCase().trim();
  return commands.filter((command) => {
    // Check if title contains query
    if (command.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Check if any keyword contains query
    if (
      command.keywords &&
      command.keywords.some((keyword) =>
        keyword.toLowerCase().includes(normalizedQuery)
      )
    ) {
      return true;
    }

    return false;
  });
};

// Dictionary definitions
type SlashCommandMenuDictionary = Record<
  | "heading1"
  | "heading2"
  | "heading3"
  | "paragraph"
  | "bulletList"
  | "orderedList"
  | "blockquote"
  | "horizontalRule"
  | "codeBlock"
  | "bold"
  | "italic"
  | "strike",
  string
>;
const de: SlashCommandMenuDictionary = {
  heading1: "Überschrift 1",
  heading2: "Überschrift 2",
  heading3: "Überschrift 3",
  paragraph: "Normaler Text",
  bulletList: "Aufzählungsliste",
  orderedList: "Nummerierte Liste",
  blockquote: "Zitat",
  horizontalRule: "Trennlinie",
  codeBlock: "Codeblock",
  bold: "Fett",
  italic: "Kursiv",
  strike: "Durchgestrichen",
};
const dictionary: Dictionary<SlashCommandMenuDictionary> = {
  "en-US": {
    heading1: "Heading 1",
    heading2: "Heading 2",
    heading3: "Heading 3",
    paragraph: "Normal text",
    bulletList: "Bullet list",
    orderedList: "Numbered list",
    blockquote: "Quote",
    horizontalRule: "Divider",
    codeBlock: "Code block",
    bold: "Bold",
    italic: "Italic",
    strike: "Strikethrough",
  },
  "de-DE": de,
  de,
};
