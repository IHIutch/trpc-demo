import { z } from "zod";
import { publicProcedure, router } from "../../utils/trpc";
import { PostSchema } from "@/utils/zod/schema";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/utils/prisma";

export const postRouter = router({
  getAll: publicProcedure
    .query(async () => {
      const data = await prisma.post.findMany()
      return data
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
      return data
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
    ).output(PostSchema)
    .mutation(async ({ input }) => {
      const { payload } = input
      const data = await prisma.post.create({
        data: payload
      })
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
      return data
    })
})
