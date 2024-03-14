"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";

import { SearchCommand } from "@/components/shared/search-command";
import { childProps } from "../../../types";
import Loader from "@/components/ui/loader";
import { Sidebar } from "../(secret)/components";

const SecretLayout = ({ children }: childProps) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default SecretLayout;