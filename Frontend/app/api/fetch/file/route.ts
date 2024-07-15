import axios from "axios";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { monthMap } from "@/lib/constants";
import { formatBytes } from "@/lib/convertFileSize";

export async function GET() {
  const month = cookies().get('file_month')?.value
  const year = cookies().get('file_year')?.value

  // The initial case, when the user has not seen anything
  if (!month || !year) {
    const response = await axios.get(process.env.FETCH_FILES!, { params: {
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

    cookies().set('file_month', new_month.toString())
    cookies().set('file_year', new_year.toString())

    const formatted_files = media_files.map((file: any) => {
      return {
        ...file,
        filesize: formatBytes(file.filesize_bytes),
        timestamp: new Date(file.timestamp),
      };
    });

    // @ts-ignore
    return NextResponse.json({ message: formatted_files, month: monthMap[month], year }, { status: 200 })
  }

  // The other case, fetching the next month
  const response = await axios.get(process.env.FETCH_FILES!, { params: {
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

  cookies().set('file_month', new_month.toString())
  cookies().set('file_year', new_year.toString())

  const formatted_files = response.data.map((file: any) => {
    return {
      ...file,
      filesize: formatBytes(file.filesize_bytes),
      timestamp: new Date(file.timestamp),
    };
  });

  // @ts-ignore
  return NextResponse.json({ message: formatted_files, month: monthMap[month], year }, { status: 200 })
}
