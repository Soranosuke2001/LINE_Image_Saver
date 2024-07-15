"use client"

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

const ErrorButtons = () => {
  const router = useRouter()

  return (
    <div className="mt-1 flex gap-x-4">
      <Button className="hover:bg-neutral-600" onClick={() => router.push("/")}>
        Home
      </Button>
      <Button
        className="bg-green-500 hover:bg-green-700"
        onClick={() => router.push("login")}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorButtons;
