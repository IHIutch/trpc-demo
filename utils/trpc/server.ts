import { appRouter } from '@/server'
import { createCallerFactory } from '@/utils/trpc'

const createCaller = createCallerFactory(appRouter)
export const caller = createCaller({})