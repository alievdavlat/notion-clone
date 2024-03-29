import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import Title  from "./title";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Publish from "./publish";
import Menu from "./menu";

interface NavbarProps {
  isCollapsed: boolean;
  reset: () => void;
}

 const Navbar = ({ isCollapsed, reset }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.docuement.getDocumentById, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            className="h-6 w-6 text-muted-foreground"
            role="button"
            onClick={reset}
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title document={document} />
          <div className="fle items-center gap-x-2">
            <Publish document={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>

      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar