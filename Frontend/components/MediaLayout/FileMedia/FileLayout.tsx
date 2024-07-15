import React from "react";

import FileFrame from "./FileFrame";

import { FileData } from "@/lib/types";

const FileLayout = ({
  fileData,
  noData,
  refProp,
}: {
  fileData: FileData[];
  noData: boolean;
  refProp: any;
}) => {
  return (
    <>
      {fileData.map((file, index) => {
        if (index === fileData.length - 1 && !noData) {
          return (
            <div key={file.file_id} className="mt-2 w-full" ref={refProp}>
              <FileFrame file={file} />
            </div>
          );
        } else {
          return (
            <div key={file.file_id} className="mt-2 w-full">
              <FileFrame file={file} />
            </div>
          );
        }
      })}
    </>
  );
};

export default FileLayout;
