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
      ...Table,
      ...Image,
      ...Fonts,
      ...Tasks,
      ...Colors,
    ],
    content: `
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
        <div>Text under the table</div>
      </div>
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
