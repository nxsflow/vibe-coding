import { Editor } from "@tiptap/core";

const onDownload = (blob: Blob, filename: string) => {
  console.log("Downloading", filename);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

export const onSaveJson = (editor: Editor | null) => {
  if (!editor) return;
  const content = editor.getJSON();
  const blob = new Blob([JSON.stringify(content, null, 2)], {
    type: "application/json",
  });
  onDownload(blob, "document.json");
};

export const onSaveHtml = (editor: Editor | null) => {
  if (!editor) return;
  const content = editor.getHTML();
  const blob = new Blob([content], { type: "text/html" });
  onDownload(blob, "document.html");
};

export const onSaveText = (editor: Editor | null) => {
  if (!editor) return;
  const content = editor.getText();
  const blob = new Blob([content], { type: "text/plain" });
  onDownload(blob, "document.txt");
};
