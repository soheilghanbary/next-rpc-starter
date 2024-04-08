"use client"
import { cn } from "@lib/utils"
import { api } from "@server/api/client"
import { Button } from "@ui/button"
import { ScrollArea } from "@ui/scroll-area"
import { TodoCard } from "./todo-card"

export const TodoList = () => {
  const { data, isPending, refetch } = api.todo.all.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const clearMutate = api.todo.clear.useMutation({
    onSettled() {
      refetch()
    },
  })
  if (isPending) return <p>Loading Todos...</p>
  if (!data) return <p>Empty Todo</p>
  return (
    <div className="space-y-2 rounded-md border bg-background p-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground/85">
          Todos: <span className="text-foreground">{data.length}</span>
        </h2>
        <Button
          size={"sm"}
          variant={"ghost"}
          disabled={clearMutate.isPending || !data.length}
          onClick={() => clearMutate.mutate()}
        >
          {clearMutate.isPending ? "Clearning" : "Clear"}
        </Button>
      </div>
      {Boolean(data.length) ? (
        <ScrollArea className={cn("", { "h-96": data.length >= 6 })}>
          <div className="space-y-2">
            {data.map((t) => (
              <TodoCard key={t.id} {...t} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p className="py-4 text-center text-sm font-medium text-foreground/85">
          Todo List is Empty 😢
        </p>
      )}
    </div>
  )
}
