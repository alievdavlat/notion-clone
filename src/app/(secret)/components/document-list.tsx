import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Item from "./item";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Trash } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
}
const DocumentList = ({ level = 0, parentDocumentId }: DocumentListProps) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const router = useRouter();
  const params = useParams();

  
  const documents = useQuery(api.docuement.getDocuments, {
    parentDocument: parentDocumentId,
  });

  const onExpend = (docuementId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [docuementId]: !prev[docuementId],
    }));
  };

  const onRedirect = (docuementId: string) => {
    router.push(`/documents/${docuementId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}>
        No documents found.
      </p>

      {documents.map((item, index) => (
        <div key={item._id}>
          <Item
            label={item.title}
            id={item._id}
            level={level}
            expanded={expanded[item._id]}
            onExpend={() => onExpend(item._id)}
            onClick={() => onRedirect(item._id)}
            active={params.documentId === item._id}
            documentIcon = {item.icon}
          />
          {expanded[item._id] && (
            <DocumentList parentDocumentId={item._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
