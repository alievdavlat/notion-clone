"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  ChevronsLeftRight,
  GripHorizontal,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import React, { use } from "react";

const UserBox = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
          role="button">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.fullName || "avatar"}
              />
            </Avatar>

            <span className="text-start font-medium line-clamp-1 ml-1">
              {user?.firstName}&apos;s ...
            </span>
          </div>

          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground flex items-center justify-between">
            {user?.emailAddresses[0].emailAddress}{" "}
            <MoreHorizontal className="cursor-pointer" />
          </p>

          <div className="gap-x-2 flex items-center ">
            <GripHorizontal className="rotate-90 text-muted-foreground" />

            <div className="rounded-md bg-secondary p-1">
              <Avatar className=" h-8  w-8">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={user?.fullName || "avatar"}
                />
              </Avatar>
            </div>

            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignInButton>
            <Button variant={"ghost"} className="text-muted-foreground">
              Add another account
            </Button>
          </SignInButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton>
            <Button
              variant={"ghost"}
              className="flex gap-2 text-muted-foreground">
              Log out
              <LogOut size={18} />
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;
