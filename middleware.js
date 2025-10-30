import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Public routes that don't need protection
  const publicPaths = ["/", "/signin", "/signup"];
  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  //  Get JWT token (auth session)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const userRole = token?.role || token?.user?.role;

  //  Optional terminal log (visible in Git Bash / VSCode terminal)
  console.log(`[MIDDLEWARE] Path: ${pathname} | Role: ${userRole || "No token"}`);

  //  Create base response for allowed access
  const res = NextResponse.next();
  res.headers.set("x-debug-path", pathname);
  res.headers.set("x-debug-role", userRole || "no token");

  //  Redirect logged-in users away from /signin
  if (token && pathname.startsWith("/signin")) {
    let redirectPath = "/";
    if (userRole === "admin") redirectPath = "/admin_dashboard";
    else if (userRole === "student") redirectPath = "/student_dashboard";

    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = redirectPath;

    return NextResponse.redirect(dashboardUrl);
  }

  // 🟢 Allow public paths
  if (isPublic) return res;

  // 🔴 Redirect unauthenticated users to signin
  if (!token) {
    const signinUrl = req.nextUrl.clone();
    signinUrl.pathname = "/signin";
    signinUrl.searchParams.set("callbackUrl", pathname);

    return new NextResponse(
      `<h1 style="font-family:sans-serif;color:#e11d48;text-align:center;margin-top:3rem;">
      [MIDDLEWARE] No token found.<br>Redirecting to /signin from ${pathname}.
      </h1>`,
      {
        status: 302,
        headers: { Location: signinUrl.toString() },
      }
    );
  }

  // 🔒 Admin-only route protection
  if (pathname.startsWith("/admin_dashboard") && userRole !== "admin") {
    let redirectPath = userRole === "student" ? "/student_dashboard" : "/";
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = redirectPath;

    return new NextResponse(
      `<h1 style="font-family:sans-serif;color:#2563eb;text-align:center;margin-top:3rem;">
      [MIDDLEWARE] Access denied.<br>
      Role: ${userRole}<br>
      Redirecting to ${redirectPath}.
      </h1>`,
      {
        status: 302,
        headers: { Location: dashboardUrl.toString() },
      }
    );
  }

  // 🔒 Student-only route protection
  if (pathname.startsWith("/student_dashboard") && userRole !== "student") {
    let redirectPath = userRole === "admin" ? "/admin_dashboard" : "/";
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = redirectPath;

    return new NextResponse(
      `<h1 style="font-family:sans-serif;color:#16a34a;text-align:center;margin-top:3rem;">
      [MIDDLEWARE] Access denied.<br>
      Role: ${userRole}<br>
      Redirecting to ${redirectPath}.
      </h1>`,
      {
        status: 302,
        headers: { Location: dashboardUrl.toString() },
      }
    );
  }

  // ✅ Allow access for valid users
  return res;
}

// 📍 Apply middleware to dashboard routes only
export const config = {
  matcher: ["/admin_dashboard/:path*", "/student_dashboard/:path*"],
};
