"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import "@/styles/editor.css";
import { SupportedLocales } from "@/middleware";
import { ExtensionsKit } from "./extensions-kit";

type EditorProps = {
  initialContent?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
  lang: SupportedLocales;
};

export default function Editor({
  initialContent = "",
  onChange,
  editable = true,
  lang,
}: EditorProps) {
  const editor = useEditor({
    extensions: ExtensionsKit({ lang }),
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    editable,
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div className="animate-fade">
      <div>
        <EditorContent
          editor={editor}
          className="w-full flex justify-center mx-auto print:w-full print:min-w-0"
        />
      </div>
    </div>
  );
}
