import { AddTodo } from "@/app/add-todo"
import { Header } from "@components/shared/header"
import { TodoList } from "@components/shared/todo/todo-list"
import { api } from "@server/api/server"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description: "hey there, this is a Home Page",
}

const msg = "I'm Ready to Use"

export default async function HomePage() {
  const res = await api.todo.all()
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-sm space-y-4 p-4">
        <AddTodo />
        <TodoList />
      </div>
    </>
  )
}
