"use client"

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";

import { useToast } from "@/components/ui/use-toast";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import ImageLayout from "@/components/MediaLayout/ImageLayout";
import MediaTypeSelector from "@/components/MediaLayout/MediaTypeSelector";

import { fetchMediaFiles } from "@/lib/fetchMediaFiles";

export default function Page() {
  const { toast } = useToast()
  const [mediaType, setMediaType] = useState<string>("image");
  const [mediaFiles, setMediaFiles] = useState<any>([])
  const [noData, setNoData] = useState<boolean>(false)

  const lastImageRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastImageRef.current,
    threshold: 1
  })

  useEffect(() => {
    const fetchMedia = async () => {
      const data = await fetchMediaFiles(mediaType)

      if (data === 'Error') {
        toast({
          title: "Unable to fetch images",
          description: "Please try again later",
          variant: "destructive"
        })
      } else if (data === "NoData") {
        setNoData(true)
      } else {
        setMediaFiles((prevData: any) => {
          const updatedFiles = [...prevData, ...data]
          return updatedFiles
        })
      }
    }

    if (entry?.isIntersecting) {
      fetchMedia()
    }

    fetchMedia()
  }, [mediaType, entry])

  return (
    <main className="h-screen flex flex-col">
      <HamburgerMenu />
      <MediaTypeSelector mediaType={mediaType} setMediaType={setMediaType} setMediaFiles={setMediaFiles} />

      {mediaType === 'image' && (
        <ImageLayout mediaFiles={mediaFiles} refProp={ref} noData={noData} />
      )}
    </main>
  );
}
