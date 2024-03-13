import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ItemProps {
  label?: string;
  id?: Id<"documents">;
  level?: number;
  expanded?: boolean;
  onExpend?: () => void;
  onClick?: () => void;
  active?: boolean;
  documentIcon?: string;
  icon?: LucideIcon;
}

const Item = ({
  label,
  id,
  level,
  expanded,
  onExpend,
  onClick,
  active,
  documentIcon,
  icon: Icon,
}: ItemProps) => {
  const { user } = useUser();

  const createDocument = useMutation(api.docuement.createDocument);

  const onCreateDocument = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!id) return;
  
  const promise =   createDocument({
      title: "Untitled",
      parentDocument: id,
    }).then((document) => {
      if (!expanded) {
        onExpend?.();
      }
    });

    toast.promise(promise, {
      loading: "creating a new blank...",
      success: "new blank has been created",
      error:"somthing went error while creating blank"
    });
  };

  const handelExpanded = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpend?.();
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm pr-3 py-1 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}>
      {!!id && (
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          role="button"
          onClick={handelExpanded}>
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : Icon && (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount>
              <DropdownMenuItem>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <div>
                Last Edit by{" "}
                <span className="font-medium">{user?.fullName}</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
            role="button"
            onClick={onCreateDocument}>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex gap-x-2 py-[3px]">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
