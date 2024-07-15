import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hasSession = req.cookies.has('session')
  const hasCode = req.cookies.has('code')
  const hasUserId = req.cookies.has('user_id')
  const hasState = req.cookies.has('state')

  if (!hasSession && !hasCode && !hasUserId && !hasState) {
    if (req.nextUrl.pathname.startsWith('/') || req.nextUrl.pathname.startsWith('/instructions')) {
    return NextResponse.next()
  }

    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  const previousUrl = req.headers.get('referer')
  
  if (previousUrl?.includes('/media')) {
    const allCookies = req.cookies.getAll();
    const response = NextResponse.next()

    allCookies.forEach(cookie => {
      if (cookie.name.endsWith('_month') || cookie.name.endsWith('_year')) {
        response.cookies.delete(cookie.name)
      }
    });

    return response
  }
}

export const config = {
  matcher: [
    '/',
    '/error',
    '/media',
    '/instructions',
  ]
}
