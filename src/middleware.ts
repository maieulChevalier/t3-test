import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/")) {
  }
}

// export { default } from "next-auth/middleware";

// export const config = {
//   pages: {
//     signIn: "/auth/signin",
//   },
// };
