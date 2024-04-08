"use client"
import { Icons } from "@components/extras/icons"
import { getCurrentDate } from "@lib/functions/current-date"
import { cn } from "@lib/utils"
import { type Todo } from "@prisma/client"
import { api } from "@server/api/client"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@ui/button"
import { toast } from "sonner"

const getTodosKey = [
  ["todo", "all"],
  {
    type: "query",
  },
]

export const TodoCard = (t: Todo) => {
  const queryClient = useQueryClient()
  const deleteMutate = api.todo.delete.useMutation({
    onMutate() {
      queryClient.setQueryData(getTodosKey, (oldTodos: any[]) => {
        return oldTodos.filter((todo: any) => todo.id !== t.id)
      })
    },
    onSettled() {
      toast.error("Todo Was Deleted!")
    },
  })
  const doneMutate = api.todo.done.useMutation({
    onMutate() {
      queryClient.setQueryData(getTodosKey, (oldTodos: any[]) => {
        return oldTodos.map((todo) => {
          if (todo.id === t.id) {
            return { ...todo, done: !t.done }
          }
          return todo
        })
      })
    },
  })
  return (
    <div
      key={t.id}
      className="flex items-center justify-between rounded-md border bg-muted/30 p-3 py-2"
    >
      <div className="grow space-y-0.5">
        <h2
          className={cn("text-sm font-medium text-foreground/85", {
            "text-muted-foreground line-through": t.done,
          })}
        >
          {t.text}
        </h2>
        <p className="text-xs text-muted-foreground">
          {getCurrentDate(t.createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size={"icon"}
          variant={"outline"}
          disabled={deleteMutate.isPending}
          onClick={() => doneMutate.mutate({ id: t.id, done: !t.done })}
        >
          <Icons.check className="size-4 text-blue-500" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          disabled={doneMutate.isPending}
          onClick={() => deleteMutate.mutate(t.id)}
        >
          <Icons.trash className="size-4 text-rose-500" />
        </Button>
      </div>
    </div>
  )
}
