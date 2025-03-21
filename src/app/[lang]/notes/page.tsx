import Editor from "@/components/editor/Editor";
import { SupportedLocales } from "@/middleware";
import { FC } from "react";

interface NotePageProps {
  params: Promise<{ lang: SupportedLocales }>;
}

const NotePage: FC<NotePageProps> = async ({ params }) => {
  const { lang } = await params;

  return <Editor initialContent="" lang={lang} />;
};

export default NotePage;
