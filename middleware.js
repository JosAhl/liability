import { updateSession } from "/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow unauthenticated access to /register
  if (pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  // Apply session logic for other routes
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .css (CSS files)
     * - .js (JavaScript files)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
