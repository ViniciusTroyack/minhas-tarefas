import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/dashboard"];
    const isAuthRoute = pathName.startsWith("/");
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathName.startsWith(route)
    );

    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard", "/"],
};
