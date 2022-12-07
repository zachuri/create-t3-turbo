import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { supabase } from "../../../lib/supabase";

export const userRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User ID must not be null`,
        });
      }

      const user = ctx.prisma.user.findUnique({
        where: { id: input.id },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id '${input}'`,
        });
      }

      // Later for adding avatar picture
      // user.profilePicture =
      //   supabase.storage.from("avatars").getPublicUrl(user.profilePicture)
      //     .publicURL ?? "";

      return user;
      // return ctx.prisma.user.findFirst({ where: { id: input } });
    }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        profilePicture: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({ data: input });
    }),
});
