import React from "react";

import { cn } from "@/lib/utils";
import { outfit_font } from "@/app/fonts";
import { Separator } from "../ui/separator";

const SectionTitle = ({ year, month }: { year: string, month: string }) => {
  return (
    <>
      <h1 className={cn(outfit_font.className, 'ml-3 text-xl')}>
        {month} - {year}
      </h1>
      <Separator className="w-[95%] mx-auto bg-neutral-800 mb-5" />
    </>
  );
};

export default SectionTitle;
