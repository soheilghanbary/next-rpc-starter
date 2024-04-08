"use client"
import { Icons } from "@components/extras/icons"
import { TextField } from "@components/extras/text-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@server/api/client"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const schema = z.object({
  text: z.string().min(3).max(255),
})

type Schema = z.infer<typeof schema>

export const AddTodo = () => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const addMutate = api.todo.create.useMutation({
    onSettled(res) {
      const getTodosKey = [
        ["todo", "all"],
        {
          type: "query",
        },
      ]
      queryClient.setQueryData(getTodosKey, (oldTodos: any[]) => {
        return [res, ...oldTodos]
      })
      reset()
      toast.success("Todo Was Added!")
    },
  })
  return (
    <form
      onSubmit={handleSubmit((data) => addMutate.mutate(data))}
      className="flex items-end gap-2 rounded-md border bg-background p-4 shadow-sm"
    >
      <TextField
        label="Todo"
        placeholder="Add a todo"
        className="grow"
        {...register("text")}
      />
      <Button disabled={addMutate.isPending}>
        Save
        <Icons.plus className="ml-2 size-4" />
      </Button>
    </form>
  )
}
