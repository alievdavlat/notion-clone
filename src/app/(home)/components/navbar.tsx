"use client";

import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import useScrolled from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const scrolled = useScrolled();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed flex items-center w-full p-6 justify-between",
        scrolled && "border-b shadow-sm"
      )}>
      <Logo />
      <div className="flex items-center gap-x-2">
        <Button size={"sm"} variant={"ghost"}>
          Log in
        </Button>
        <Button size={"sm"}>Get Notion Free </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
