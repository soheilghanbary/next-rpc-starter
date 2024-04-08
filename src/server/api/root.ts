import { todoRouter } from "./routes/todo"
import { createCallerFactory, createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  todo: todoRouter,
})

export const createCaller = createCallerFactory(appRouter)
export type AppRouter = typeof appRouter
