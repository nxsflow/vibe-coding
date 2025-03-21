"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LegalPage = () => {
  const { replace } = useRouter();
  useEffect(() => {
    replace("/legal/legal");
  }, [replace]);
  return null;
};

export default LegalPage;
