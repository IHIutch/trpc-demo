import { z } from 'zod'
import { publicProcedure, router } from '@/utils/trpc'
import { PostSchema } from '@/utils/zod/schema'
import { prisma } from '@/utils/prisma'

export const postRouter = router({
    getAll: publicProcedure.query(async () => {
        const data = await prisma.post.findMany()
        return data.map((d) => PostSchema.parse(d))
    }),

    create: publicProcedure
        .input(
            z.object({
                payload: PostSchema.omit({
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                }),
            }),
        )
        .mutation(async ({ input }) => {
            const { payload } = input
            const data = await prisma.post.create({
                data: payload,
            })
            return PostSchema.parse(data)
        }),
})