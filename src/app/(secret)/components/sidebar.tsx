import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Rocket,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import React, { ElementRef, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";
import DocumentList from "./document-list";
import Item from "./item";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import UserBox from "./user-box";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashBox from "./trash-box";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width:770px)");
  const sidebarRef = useRef<ElementRef<"div">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const isResizing = useRef(false);

  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [isReseting, setIsReseting] = React.useState<boolean>(false);

  const createDocument = useMutation(api.docuement.createDocument);

  const router = useRouter();

  React.useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      handleReset();
    }
  }, [isMobile]);

  const handleCollapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsReseting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.width = "100%";
      navbarRef.current.style.left = "0";

      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };

  const handleReset = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsReseting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.width = isMobile ? "0" : "calc(100% - 240px)";
      navbarRef.current.style.left = isMobile ? "100%" : "240px";
      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) {
      return;
    }

    let newWidth = e.clientX;

    if (newWidth < 240) {
      return (newWidth = 240);
    }

    if (newWidth > 400) {
      return (newWidth = 400);
    }

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const onCreateDocument = () => {
    const promise = createDocument({
      title: "Untitled",
    }).then((docId) => router.push(`/documents/${docId}`));

    toast.promise(promise, {
      loading: "creating a new blank...",
      success: "new blank has been created",
      error: "somthing went error while creating blank",
    });
  };

  const arr = [1];
  return (
    <>
      <div
        className={cn(
          "h-screen h-fullgroup/sidebar bg-secondary overflow-y-auto flex w-60 flex-col z-50 sticky left-0 top-0",
          isReseting && "transition-all ease-in duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}>
        <div
          role="button"
          className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3  right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
          onClick={handleCollapse}>
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div className="my-1">
          <UserBox />
          <Item label="Search" icon={Search} />
          <Item label="Settings" icon={Settings} />
          <Item
            label="New Document"
            icon={PlusCircle}
            onClick={onCreateDocument}
          />
        </div>

        <div className="mt-4">
          <DocumentList />
          <Item label="Add a page" icon={Plus} onClick={onCreateDocument} />

          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}>
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition"
          onMouseDown={handleMouseDown}
        />

        <div className="absolute bottom-0 px-2 bg-white/50 dark:bg-black/50 py-4 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-[13px]">
              <Rocket />
              <p className="opacity-70 font-bold">Free plan</p>
            </div>
            <p className="text-[13px] opacity-70">{arr.length}/3</p>
          </div>
          <Progress
            className="mt-2"
            value={arr.length >= 3 ? 100 : arr.length * 33.33}
          />
        </div>
      </div>

      <div
        className={cn(
          "absolute top-0 z-50 left-60 w=[calc(100% - 240px)]",
          isReseting && "transition-all ease-in duration-300",
          isMobile && "w-full left-0"
        )}
        ref={navbarRef}>
        <nav className="bg-trasnparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              className="h-6 w-6 text-muted-foreground"
              role="button"
              onClick={handleReset}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
