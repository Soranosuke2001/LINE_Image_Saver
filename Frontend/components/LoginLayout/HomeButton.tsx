"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();

  return (
    <div className="w-[90%] flex justify-end mt-2">
      <Button variant="secondary" onClick={() => router.push("/")}>
        Return to Home
      </Button>
    </div>
  );
};

export default HomeButton;
