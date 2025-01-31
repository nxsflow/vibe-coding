import { BaseEditor } from "@/components/editors/BaseEditor";
import { FC } from "react";

interface Props {
  params?: Promise<{
    docId?: string;
  }>;
}
const DocumentId: FC<Props> = async ({ params }) => {
  const docId = (await params)?.docId;

  return (
    <div>
      <h1>Document {docId}</h1>
      <div>
        <BaseEditor />
      </div>
    </div>
  );
};

export default DocumentId;
