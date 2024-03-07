"use client";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Heroes = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Write , plan , share. WIth AI at your side.
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          Notion is the connected workspace where better, faster work happens
        </h3>

        {/* <Button>
            Get Notion Free <ArrowRight className="h-4 w-4 ml-2" />
          </Button> */}
      </div>

      <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex -tems-center">
          <div className="relative h-[400px] w-[400px] hidden md:block">
            <Image
              src={"/men.svg"}
              alt="men"
              fill
              className="object-cover dark:hidden"
            />
            <Image
              src={"/men-dark.svg"}
              alt="men"
              fill
              className="object-cover hidden dark:block"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Heroes;
