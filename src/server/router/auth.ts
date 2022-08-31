import { createRouter } from "./context";
import { z } from "zod";

export const authRouter = createRouter()
  .mutation("updateUsername", {
    input: z
      .object({
        username: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user?.id,
        },
        data: {
          name: input?.username,
          role:"nameSet"
        }
      })
    },
  })

