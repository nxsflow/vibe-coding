"use client";

import {
  EditorConsumer,
  EditorContent,
  EditorContext,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, ReactNode } from "react";
import Tasks from "@/extensions/tasks";
import Table from "@/extensions/table";
import Image from "@/extensions/image";
import Fonts from "@/extensions/fonts";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Colors from "@/extensions/colors";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtension } from "@/extensions/font-size";
import { cn } from "@/lib/utils";

// import { debounce } from "lodash";
// import { flow, replace, split, size } from "lodash/fp";
// import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  children?: ReactNode;
  slotBefore?: ReactNode;
  slotAfter?: ReactNode;
  autofocus?: boolean;
  readonly?: boolean;
  className?: string;
}

// const handleUpdate = (setWords: Dispatch<SetStateAction<number>>) =>
//   debounce(({ editor }: EditorEvents["update"]) => {
//     flow(replace("\n", " "), split(" "), size, setWords)(editor.getText());
//   }, 500);

export const BaseEditor: FC<Props> = ({
  autofocus,
  readonly,
  slotBefore,
  children,
  slotAfter,
  className,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSizeExtension,
      ...Table,
      ...Image,
      ...Fonts,
      ...Tasks,
      ...Colors,
    ],
    content: `
      <p>
        I like lists. Let’s add one:
      </p>
      <ul>
        <li>This is a bullet list.</li>
        <li>And it has three list items.</li>
        <li>Here is the third one.</li>
      </ul>
      <p>
        Do you want to see one more? I bet! Here is another one:
      </p>
      <ol>
        <li>That’s a different list, actually it’s an ordered list.</li>
        <li>It also has three list items.</li>
        <li>And all of them are numbered.</li>
      </ol>
      <p>
        Lists would be nothing without list items.
      </p>
    `,
    immediatelyRender: false,
    autofocus,
    editable: !readonly,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none border print:border-0 bg-white border-slate-400 flex flex-col min-h-[1054px] w-[816px] pt-10 px-14 pb-10 cursor-text",
      },
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      {slotBefore}
      <div className="size-full overflow-x-auto bg-slate-50 px-4 print:p-0 print:bg-white print:overflow-visible">
        <div
          className={cn(
            "min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0",
            className
          )}
        >
          <EditorConsumer>
            {({ editor: currentEditor }) => (
              <EditorContent
                editor={currentEditor}
                className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0"
              />
            )}
          </EditorConsumer>
        </div>
        {children}
        {slotAfter}
      </div>
    </EditorContext.Provider>
  );
};
