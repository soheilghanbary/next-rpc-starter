import { createCallerFactory, createTRPCRouter } from "."
import { todoRouter } from "./routers/todo"

export const appRouter = createTRPCRouter({
  todo: todoRouter,
})

export const createCaller = createCallerFactory(appRouter)
export type AppRouter = typeof appRouter
