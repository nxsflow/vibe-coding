"use client";

import { Button } from "../ui/button";
import { Icon } from "../design/Icon";
import { useRouter } from "next/navigation";

// TODO: Add functionality to add a new note

const AddButton = () => {
  const router = useRouter();
  return (
    <div className="absolute left-2 flex items-center">
      <Button variant="ghost" size="icon" onClick={() => router.push("/notes")}>
        <Icon name="Plus" />
      </Button>
    </div>
  );
};

export default AddButton;
