import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookies = req.cookies.getAll()

  cookies.forEach(cookie => {
    const { name } = cookie
    req.cookies.delete(name)
  });

  return new NextResponse("Logout Successful")
}
