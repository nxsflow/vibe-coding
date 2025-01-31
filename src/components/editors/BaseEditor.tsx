"use client";

import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Typography from "@tiptap/extension-typography";
import { debounce } from "lodash";
import { flow, replace, split, size } from "lodash/fp";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
  autofocus?: boolean;
  readonly?: boolean;
}

const handleUpdate = (setWords: Dispatch<SetStateAction<number>>) =>
  debounce(({ editor }: EditorEvents["update"]) => {
    flow(replace("\n", " "), split(" "), size, setWords)(editor.getText());
  }, 500);

export const BaseEditor: FC<Props> = ({ autofocus, readonly }) => {
  const [words, setWords] = useState(0);
  const editor = useEditor({
    extensions: [Document, Text, Paragraph, Heading, Typography],
    content: "<p>Hello World!</p>",
    onUpdate: handleUpdate(setWords),
    immediatelyRender: false,
    autofocus,
    editable: !readonly,
  });

  return (
    <>
      <EditorContent editor={editor} />
      <div className="text-xs">Wörter: {words}</div>
    </>
  );
};
