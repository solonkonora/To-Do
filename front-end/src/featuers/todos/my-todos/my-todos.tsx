"use client";

import { useEffect } from "react";
import { getUserTodos } from "../api/todo-api";
import { TodoCard } from "@/components/molecules";
import { useAppContext } from "@/providers/context/app-context";

export default function MyTodosPage() {
  const { todos, setTodos } = useAppContext();

  useEffect(() => {
    getUserTodos()
      .then(({ data, message, status }) => {
        setTodos(data)
      })
  }, []);

  return (
    <main className="w-full flex flex-col items-center justify-start">
      My To Dos is

      <div className="flex flex-col l w-full gap-8 p-4">
        {
          todos?.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))
        }
      </div>
    </main>
  );
}
