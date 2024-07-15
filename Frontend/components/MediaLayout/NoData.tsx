"use client"

import React from "react";

import { FiInbox } from "react-icons/fi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const NoData = () => {
  const router = useRouter()

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col w-[85%] items-center gap-4">
        <FiInbox size={50} />
        <h1 className="font-bold text-3xl">No Data to Show</h1>
        <p className="font-light text-center">
          It looks like you haven't uploaded any files that the system was not
          able to detect.
        </p>
        <p className="font-light text-center">
          Follow the instructions to get started!
        </p>
        <Button onClick={() => router.push('/instructions')}>Instructions</Button>
      </div>
    </div>
  );
};

export default NoData;
