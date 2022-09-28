// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {
  Session,
  unstable_getServerSession as getServerSession,
} from "next-auth";
// import { getToken, JWT } from "next-auth/jwt"; FOR JWT AUTH
import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";

type CreateContextOptions = {
  session: Session | null;
  // token: JWT | null; FOR JWT AUTH
};

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
// eslint-disable-next-line @typescript-eslint/require-await
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    // token: opts.token, FOR JWT AUTH
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts;
  const session = await getServerSession(req, res, nextAuthOptions);
  // const token = await getToken({ req }); FOR JWT AUTH

  return await createContextInner({
    session,
    // token, FOR JWT AUTH
  });
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
