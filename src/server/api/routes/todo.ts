import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const todoRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.todo.findMany()
  }),
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input: { text }, ctx }) => {
      return await ctx.db.todo.create({ data: { text } })
    }),
})
