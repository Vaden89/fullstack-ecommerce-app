import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/(auth)/auth";
import { UserRole } from "./types/user";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const authPages = ["/login", "/register", "/forgot-password"];

  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    if (session?.user.role === UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else if (session?.user.role === UserRole.USER) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!session || !("user" in session)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password", "/admin/:path*"],
};
