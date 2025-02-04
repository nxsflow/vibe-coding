import { BaseEditor } from "@/components/editors/BaseEditor";
import Toolbar from "@/components/toolbar/toolbar";
import { FC } from "react";
import Navbar from "./(navbar)/navbar";

interface Props {
  params?: Promise<{
    docId?: string;
  }>;
}

const DocumentId: FC<Props> = async () => {
  // const docId = (await params)?.docId;

  return (
    <div className="min-h-screen bg-slate-50">
      <BaseEditor
        className="pt-28"
        slotBefore={
          <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-inherit print:hidden">
            <Navbar />
            <Toolbar />
          </div>
        }
      />
    </div>
  );
};

export default DocumentId;
