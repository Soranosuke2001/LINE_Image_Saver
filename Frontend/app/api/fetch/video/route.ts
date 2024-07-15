import axios from "axios";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { monthMap } from "@/lib/constants";

export async function GET() {
  const month = cookies().get('video_month')?.value
  const year = cookies().get('video_year')?.value

  // The initial case, when the user has not seen anything
  if (!month || !year) {
    const response = await axios.get(process.env.FETCH_VIDEOS!, { params: {
      'initial': true
    }})

    if (response.status !== 200) {
      return new NextResponse("Unable to fetch media files", { status: response.status })
    }

    const { media_files, month, year } = response.data

    if (media_files.length === 0 && !month && !year) {
      return NextResponse.json({ message: media_files, month: undefined, year: undefined })
    }

    let new_month: number = +month
    let new_year: number = +year

    if (media_files.length !== 0) {
      new_month -= 1

      if (new_month === 0) {
        new_month = 12
        new_year -= 1
      }
    }

    cookies().set('video_month', new_month.toString())
    cookies().set('video_year', new_year.toString())

    const formatted_files = media_files.map((video: any) => {
      return {
        ...video,
        timestamp: new Date(video.timestamp),
      };
    });

    // @ts-ignore
    return NextResponse.json({ message: formatted_files, month: monthMap[month], year }, { status: 200 })
  }

  // The other case, fetching the next month
  const response = await axios.get(process.env.FETCH_VIDEOS!, { params: {
    month,
    year
  }})

  if (response.status !== 200) {
    return new NextResponse("Unable to fetch media files", { status: response.status })
  }

  let new_month: number = +month
  let new_year: number = +year

  if (response.data.length !== 0) {
    new_month -= 1

    if (new_month === 0) {
      new_month = 12
      new_year -= 1
    }
  }

  cookies().set('video_month', new_month.toString())
  cookies().set('video_year', new_year.toString())

  const formatted_files = response.data.map((video: any) => {
    return {
      ...video,
      timestamp: new Date(video.timestamp),
    };
  });

  // @ts-ignore
  return NextResponse.json({ message: formatted_files, month: monthMap[month], year }, { status: 200 })
}
