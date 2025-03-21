"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import { useState, useEffect } from "react";
import "@/styles/editor.css";

interface EditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
}

export default function Editor({
  initialContent = "",
  onChange,
  editable = true,
}: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ document: false }),
      Document.extend({
        content: "heading block+",
      }),
    ],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    editable,
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Handle client-side only mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
