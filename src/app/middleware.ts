import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "../utils/isTokenValid";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Request pathname:", pathname);
  const userToken = request.cookies.get("USER_INFO")?.value;
  console.log("User token:", userToken);

  if (pathname.startsWith("/tasks") || pathname.startsWith("/profile")) {
    console.log("Checking access for /tasks or /profile");
    if (!userToken || !(await isTokenValid(userToken))) {
      console.log("No valid token, redirecting to /login");
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if ((pathname === "/login" || pathname === "/signup") && userToken) {
    console.log("User is logged in, redirecting from /login or /signup to /");
    if (await isTokenValid(userToken)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/tasks", "/profile"],
};
