import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "1c601bf2-57e9-4e9e-adde-6d3764385273");
  requestHeaders.set("x-createxyz-project-group-id", "f3ed3cc4-6cb2-46cf-9e69-3c8d1248ba6f");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}