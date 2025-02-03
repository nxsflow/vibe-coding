"use client";

import { EditorProvider, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC } from "react";
import Tasks from "./extensions/Tasks";
import Table from "./extensions/Table";
import Image from "./extensions/Image";
import Fonts from "./extensions/Fonts";
import Toolbar from "@/app/documents/[docId]/(toolbar)/toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Colors from "./extensions/Colors";
import TextAlign from "@tiptap/extension-text-align";
// import { debounce } from "lodash";
// import { flow, replace, split, size } from "lodash/fp";
// import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  autofocus?: boolean;
  readonly?: boolean;
}

// const handleUpdate = (setWords: Dispatch<SetStateAction<number>>) =>
//   debounce(({ editor }: EditorEvents["update"]) => {
//     flow(replace("\n", " "), split(" "), size, setWords)(editor.getText());
//   }, 500);

export const BaseEditor: FC<Props> = ({ autofocus, readonly }) => {
  const editorOptions = {
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
        style: "padding-left: 56px; padding-right: 56px",
        class:
          "focus:outline-none border print:border-0 bg-white border-neutral-400 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
  } as UseEditorOptions;

  return (
    <div className="size-full overflow-x-auto bg-slate-50 pt-10 px-4 print:p-0 print:bg-white print:overflow-visible">
      <EditorProvider
        {...editorOptions}
        editorContainerProps={{
          className:
            "min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0",
        }}
      >
        <Toolbar />
      </EditorProvider>
    </div>
  );
};
