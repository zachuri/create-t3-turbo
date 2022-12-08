import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  all: publicProcedure
    .input(z.object({ user_id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({ where: { user_id: input.user_id } });
    }),
  byId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.post.findFirst({ where: { id: input } });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        user_id: z.string().uuid(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({ data: input });
    }),
});
