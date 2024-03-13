"use client";

import React, { useMemo } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  return <div className="pb-40">{params.documentId}</div>;
};

export default DocumentIdPage;
