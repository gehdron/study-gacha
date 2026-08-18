import { updateSession } from '@/app/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log("middleware ran:", request.nextUrl.pathname)
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}