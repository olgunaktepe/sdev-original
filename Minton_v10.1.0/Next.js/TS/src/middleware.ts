import { NextRequest, NextResponse } from "next/server"

export function middleware (request: NextRequest) {
  if (request.nextUrl.pathname == '/') {
    return NextResponse.redirect(new URL('/dashboard/analytics', request.url))
  }
  return null
}

export const config = {
  matcher: '/',
}

export { default } from "next-auth/middleware"