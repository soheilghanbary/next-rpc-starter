"use client"
import { Icons } from "@components/extras/icons"
import { TextField } from "@components/extras/text-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@server/trpc/client"
import { Button } from "@ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  text: z.string().min(3).max(255),
})

type Schema = z.infer<typeof schema>

export const AddTodo = () => {
  const { register, handleSubmit, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { mutate, isPending } = api.todo.create.useMutation()
  const onSubmit = async (data: Schema) => {
    await mutate(data, {
      onSuccess(res) {
        console.log(res)
        reset()
      },
    })
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-end gap-2 rounded-md border bg-background p-4 shadow-sm"
    >
      <TextField
        label="Todo"
        placeholder="Add a todo"
        className="grow"
        {...register("text")}
      />
      <Button disabled={isPending}>
        Save
        <Icons.plus className="ml-2 size-4" />
      </Button>
    </form>
  )
}
