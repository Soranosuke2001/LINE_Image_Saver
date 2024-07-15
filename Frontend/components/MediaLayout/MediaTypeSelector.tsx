"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";

import { CiImageOn } from "react-icons/ci";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { AiFillAudio } from "react-icons/ai";
import { PiFiles } from "react-icons/pi";
import { useCookies } from "next-client-cookies";

const mediaSelections = [
  {
    title: "Images",
    type: "image",
    icon: <CiImageOn />,
  },
  {
    title: "Videos",
    type: "video",
    icon: <MdOutlineOndemandVideo />,
  },
  {
    title: "Audio Files",
    type: "audio",
    icon: <AiFillAudio />,
  },
  {
    title: "Other Files",
    type: "file",
    icon: <PiFiles />,
  },
];

const MediaTypeSelector = ({
  mediaType,
  setMediaType,
}: {
  mediaType: string;
  setMediaType: Dispatch<SetStateAction<string>>;
}) => {
  const cookieStore = useCookies();

  return (
    <Menubar className="absolute top-1 right-1 bg-white z-50 rounded-lg">
      <MenubarMenu>
        <MenubarTrigger className="font-medium">
          Filter: {mediaType}
        </MenubarTrigger>

        <MenubarContent className="min-w-[10rem]">
          {mediaSelections.map(({ title, type, icon }, index) => (
            <MenubarItem
              key={index}
              className="flex gap-2"
              onClick={() => {
                cookieStore.remove(`${mediaType}_month`);
                cookieStore.remove(`${mediaType}_year`);
                setMediaType(type);
              }}
            >
              {icon}
              {title}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MediaTypeSelector;
