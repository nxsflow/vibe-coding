import DocumentExtension from "@tiptap/extension-document";

export const Document = DocumentExtension.extend({
  content: "heading block+",
});
