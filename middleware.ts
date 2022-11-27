import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const token = request.cookies.get(`${process.env.MY_LITTLE_SECRET}`)?.name

  // checking if user is authenticated or not
  if (!token || token === undefined) {
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// only access if user is signed in
export const config = { matcher: ['/', '/playlist', '/library'] }