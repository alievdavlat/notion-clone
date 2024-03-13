"use client"


import React from "react";
import { childProps } from "../../../types";
import Navbar from "./components/navbar";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

const HomeLayout = ({ children }: childProps) => {

  const { isAuthenticated } = useConvexAuth();

  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated) {
      return router.push('/documents')
    }
  }, [isAuthenticated])

  
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default HomeLayout;
