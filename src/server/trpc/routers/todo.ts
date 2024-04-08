import { createTRPCRouter, publicProcedure } from ".."

export const todoRouter = createTRPCRouter({
  all: publicProcedure.query(async () => {
    return { data: "hello wolrd from trpc" }
  }),
})
