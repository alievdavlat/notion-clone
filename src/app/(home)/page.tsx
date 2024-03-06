import React from "react";
import { Clients, Footer, Heroes, Priceing } from "./components";

const HomePage = () => {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex px-6 pb-10">
        <Heroes />
        <Clients/>
      </div>

      <Priceing/>
      <Footer/>
    </div>
  );
};

export default HomePage;
