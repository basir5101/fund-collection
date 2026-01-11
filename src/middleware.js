import { NextResponse } from "next/server";

export function middleware(req) {
  const authHeader = req.headers.get("authorization");
  // Define the path you want to protect
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!authHeader) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }

    // Decode the Base64 credentials
    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    const user = auth[0];
    const pass = auth[1];

    // Check against environment variables
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
      return NextResponse.next();
    }

    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

// Optimization: Only run this middleware on admin routes
export const config = {
  matcher: "/admin/:path*",
};
