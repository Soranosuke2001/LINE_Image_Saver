"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { FaLine } from "react-icons/fa";

import { Button } from "../ui/button";

const HomeButtons = () => {
  const router = useRouter();

  return (
    <div className="absolute bottom-20 w-full z-10 flex justify-around">
      <Button className="mt-2" onClick={() => router.push("/instructions")}>
        Instructions
      </Button>
      <Button
        className="mt-2 bg-green-500 px-3"
        onClick={() => router.push("/login")}
      >
        <FaLine size={30} />
        <span className="pl-2">LINE Login</span>
      </Button>
    </div>
  );
};

export default HomeButtons;
