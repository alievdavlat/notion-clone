import React from "react";
import { childProps } from "../../../types";
import Navbar from "./components/navbar";

const HomeLayout = ({ children }: childProps) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default HomeLayout;
