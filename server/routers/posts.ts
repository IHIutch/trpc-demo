import { z } from "zod";
import { publicProcedure, router } from "../../utils/trpc";
import { PostSchema } from "@/utils/zod/schema";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/utils/prisma";

export const postRouter = router({
  getAll: publicProcedure
    .query(async () => {
      const data = await prisma.post.findMany()
      // By parsing the data our returned data, we can ensure its being returned to our client as expected
      // In the case with this application, we're using zod to handle the `enum` of post.status.
      // A db like Postgres could do this automatically with Prisma, but this example is using SQLite, which would accept any string.
      // If you hover `data` above vs `parsedData` below, you'll see that `status` is correctly typed as a union (or "enum" in this case)
      const parsedData = data.map(d => PostSchema.parse(d))
      return parsedData
    }),
  //
  getById: publicProcedure
    .input(
      z.object({
        where: PostSchema.pick({ id: true })
      }))
    .query(async ({ input }) => {
      const { where } = input
      const data = await prisma.post.findUnique({
        where
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${where.id}'`,
        })
      }
      // See comment about parsing above
      return PostSchema.parse(data)
    }),
  //
  create: publicProcedure
    .input(
      z.object({
        payload: PostSchema.omit({
          id: true,
          createdAt: true,
          updatedAt: true
        })
      })
    )
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prisma.post.create({
        data: payload
      })
      // See comment about parsing above
      return PostSchema.parse(data)
    }),
  //
  update: publicProcedure
    .input(
      z.object({
        where: PostSchema.pick({ id: true }),
        payload: PostSchema.omit({ id: true })
      })
    )
    .mutation(async ({ input }) => {
      const { where, payload } = input
      const data = await prisma.post.update({
        where,
        data: payload
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No block with id '${where.id}'`,
        })
      }
      // See comment about parsing above
      return PostSchema.parse(data)
    })
})
