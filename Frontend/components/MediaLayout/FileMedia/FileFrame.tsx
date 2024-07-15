"use client";

import React, { useState } from "react";

import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeDoc } from "react-icons/bs";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypeCsv } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypePpt } from "react-icons/bs";
import { BsFiletypeXls } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";

import FileModal from "./FileModal";
import { Separator } from "@/components/ui/separator";
import { FileData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

const fileTypes = {
  txt: <BsFiletypeTxt size={90} />,
  doc: <BsFiletypeDoc size={90} />,
  docx: <BsFiletypeDocx size={90} />,
  csv: <BsFiletypeCsv size={90} />,
  ppt: <BsFiletypePpt size={90} />,
  pdf: <BsFiletypePdf size={90} />,
  xls: <BsFiletypeXls size={90} />,
};

function fileTypeIcon(extension: string) {
  if (extension in fileTypes) {
    // @ts-ignore
    return fileTypes[extension];
  }

  return <CiFileOn size={90} />;
}

const FileFrame = ({ file }: { file: FileData }) => {
  const handleDownload = () => {
    saveAs(file.file_url, file.filename);
  };

  return (
    <div className="w-full rounded-lg border border-black border-solid">
      <div className="w-full h-56 flex justify-center items-center">
        {fileTypeIcon(file.extension)}
      </div>
      <div className="flex flex-col p-2">
        <Separator className="w-[95%] mx-auto bg-neutral-600" />
        <span className="mt-2 font-bold text-lg truncate">{file.filename}</span>
        <span className="flex justify-between font-light">
          <span>Size:</span>
          <span>{file.filesize}</span>
        </span>
        <Button onClick={handleDownload} className="mt-2 bg-black">
          Download File
        </Button>
      </div>
    </div>
  );
};

export default FileFrame;
