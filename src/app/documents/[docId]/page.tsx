import { BaseEditor } from "@/components/editors/BaseEditor";
import { FC } from "react";

interface Props {
  params?: Promise<{
    docId?: string;
  }>;
}

const DocumentId: FC<Props> = async () => {
  // const docId = (await params)?.docId;

  return (
    <div className="min-h-screen bg-neutral-200">
      <BaseEditor />
    </div>
  );
};

export default DocumentId;
