import { createRouter } from "./context";
import { z } from "zod";

export const authRouter = createRouter().mutation("updateUsername", {
  input: z.object({
    username: z.string().min(2).max(31).trim(),
  }),
  async resolve({ input, ctx }) {
    if (
      !/^[A-Za-z0-9-_ À-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]*$/.test(
        input.username
      ) ||
      /\s{2,}/g.test(input.username) ||
      /-{2,}/g.test(input.username) ||
      /_{2,}/g.test(input.username) ||
      !/[A-Za-zÀ-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(
        input.username
      )
      // A-Za-z0-9-_ À-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f
      // A-Za-z0-9-_  => alpha-numeric characters with - _ and spaces
      // À-ÖØ-öø-ÿ accept all french/german characters with accents
      // \u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f => accept all chinese/japanese characters
      // /\s{2,}/g.test(username) => block double space
      // !/[A-Za-zÀ-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/ => must include at least one letter or chinese/jap character
    ) {
      throw new Error("We couldn't save your changes. Try again.");
    }

    return await ctx.prisma.user.update({
      where: {
        id: ctx.session?.user?.id,
      },
      data: {
        name: input.username,
        role: "nameSet",
      },
    });
  },
});
