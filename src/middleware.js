// middleware.js
export const runtime = "nodejs"; // Add this to force Node.js runtime
export { auth as middleware } from "@/auth";

// This config ensures the middleware only runs on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
