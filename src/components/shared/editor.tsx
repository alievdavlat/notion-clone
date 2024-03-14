import { useTheme } from "next-themes";
import React from "react";
import { BlockNoteView , useCreateBlockNote} from "@blocknote/react";
import { useEdgeStore } from "@/lib/edgestore";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";


interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({
  onChange,
  editable = true,
  initialContent,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });

    return res.url;
  };

 const editor = useCreateBlockNote({
  initialContent:initialContent 
  ? (JSON.parse(initialContent) as PartialBlock[])
  : undefined, 
 
  uploadFile:handleUpload,
  
 })

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
