import { getSession } from "next-auth/react";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/")) {
    const session = await getSession();

    console.log("sessiooooooooooon: ", session);
  }
}

// export { default } from "next-auth/middleware";

// export const config = {
//   pages: {
//     signIn: "/auth/signin",
//   },
// };
