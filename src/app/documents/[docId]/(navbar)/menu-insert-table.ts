import { Editor } from "@tiptap/core";

interface Props {
  editor?: Editor | null;
  rows: number;
  cols: number;
}

export const insertTable =
  ({ rows, cols, editor }: Props) =>
  () =>
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: rows + 1, cols, withHeaderRow: true })
      .run();
