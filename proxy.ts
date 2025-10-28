import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { axiosInstance } from "./apiService/apiCaller";

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  if (
    req.nextUrl.pathname.startsWith("/api") &&
    !req.nextUrl.pathname.includes("check")
  ) {
    await axiosInstance.get("/api/streaks/checkStreak");
    await axiosInstance.get("/api/exercises/checkExercise");
  }

  return res;
}

// (optional) limit which paths this middleware applies to
export const config = {
  matcher: ["/api/:path*"],
};
