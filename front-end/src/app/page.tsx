import { TodoType } from '@/components/api/type'
import { Todocard } from '@/components/todo-card/todo-card'
import React from 'react'

type Props = {
  todos: TodoType[],
}

const todos: TodoType[] = [
  {
    userId: "123",
    todo: "test todo",
    priority: "High",
    status: "To Do",
    notes: "test notes",
    dateCreated: new Date(),
    dateUpdated: new Date(),
  }
]

export default function Home({ todos }: Props) {

  todos = [
    {
      userId: "123",
      todo: "test todo",
      priority: "High",
      status: "To Do",
      notes: "test notes",
      dateCreated: new Date(),
      dateUpdated: new Date(),
    }
  ]
  return (
    <main className=' flex h-screen justify-center items-center '>
      <Todocard todo={todos[0]} />
    </main>
  )
}
