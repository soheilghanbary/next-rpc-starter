import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const todoRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  }),
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input: { text }, ctx }) => {
      return await ctx.db.todo.create({ data: { text } })
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.db.todo.delete({ where: { id: input } })
  }),
  done: publicProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input: { id, done } }) => {
      return await ctx.db.todo.update({ where: { id }, data: { done } })
    }),
  clear: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.db.todo.deleteMany()
  }),
})
