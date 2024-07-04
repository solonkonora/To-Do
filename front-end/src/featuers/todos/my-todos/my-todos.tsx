"use client";

import { useState } from "react";
import { SearchComponent, TodoDisplay } from "@/components/molecules";
import { useAppContext } from "@/providers/context/app-context";

export default function MyTodosPage() {
  const { todos } = useAppContext();
  const [loadingTodos, setLoadingTodos] = useState<boolean>(true);

  return (
    <main className="w-full flex flex-col items-center justify-start gap-8">
      <SearchComponent // passing down this props here since there's absolutely no reason to make it globally available in context
        setLoadingTodos={setLoadingTodos}
      />

      <TodoDisplay todos={todos} loadingTodos={loadingTodos} />
    </main>
  );
}
