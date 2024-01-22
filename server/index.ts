import {
    type inferRouterInputs,
    type inferRouterOutputs,
} from '@trpc/server'
import { router } from '@/utils/trpc'
import { postRouter } from './routers/posts'

export const appRouter = router({
    post: postRouter, // creates an API route like api/trpc/post.*
    // myProcedure: {...}
})

// export type definition of API
export type AppRouter = typeof appRouter

export type RouterOutputs = inferRouterOutputs<AppRouter>
export type RouterInputs = inferRouterInputs<AppRouter>