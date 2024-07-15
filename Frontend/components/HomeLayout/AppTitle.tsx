"use client"

import React from "react";

import { TypeAnimation } from "react-type-animation";

import { cn } from "@/lib/utils";
import { josefin_sans } from "@/app/fonts";

const AppTitle = () => {
  return (
    <div className="absolute top-44 w-full text-center">
      <div className="z-10 border bg-white w-[85%] mx-auto p-3 rounded-xl">
        <h1 className={cn(josefin_sans.className, "text-4xl font-bold")}>
          Welcome to
        </h1>
        <h1 className="text-4xl font-bold text-green-600">
          <TypeAnimation
            sequence={["LIS App!", 1000, "LINE Image Saver!", 1000]}
            wrapper="span"
            speed={30}
            repeat={Infinity}
          />
        </h1>
      </div>
    </div>
  );
};

export default AppTitle;
