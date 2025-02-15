"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";

import { useToast } from "@/components/ui/use-toast";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import MediaTypeSelector from "@/components/MediaLayout/MediaTypeSelector";

import { fetchMediaFiles } from "@/lib/fetchMediaFiles";
import MediaLayout from "@/components/MediaLayout/MediaLayout";

export default function Page() {
  const { toast } = useToast();
  const [mediaType, setMediaType] = useState<string>("image");
  const [mediaFiles, setMediaFiles] = useState<any>([]);
  const [noData, setNoData] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const lastImageRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastImageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    const fetchMedia = async () => {
      setIsFetching(true)
      const data = await fetchMediaFiles(mediaType);

      if (data === "Error") {
        toast({
          title: "Unable to fetch images",
          description: "Please try again later",
          variant: "destructive",
        });
      } else if (data === "NoData") {
        setNoData(true);
      } else {
        setMediaFiles((prevData: any) => {
          setNoData(false);
          const updatedFiles = [...prevData, ...data];
          return updatedFiles;
        });
      }

      setIsFetching(false)
    };

    if (entry?.isIntersecting) {
      fetchMedia();
    }

    fetchMedia();
  }, [mediaType, entry]);

  return (
    <main className="h-screen flex flex-col">
      <HamburgerMenu />
      <MediaTypeSelector
        mediaType={mediaType}
        setMediaType={setMediaType}
        setMediaFiles={setMediaFiles}
      />

      <MediaLayout mediaType={mediaType} mediaFiles={mediaFiles} refProp={ref} noData={noData} isFetching={isFetching} />
    </main>
  );
}
