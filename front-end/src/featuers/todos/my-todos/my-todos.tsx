import { getUserTodos } from "../api/todo-queries";

export default async function MyTodosPage() {
  const todos = await getUserTodos()
    .catch(console.warn);

  return (
    <main className="w-full flex items-center justify-center">
      My To Dos;

      <pre>
        {JSON.stringify(todos, null, 4)}
      </pre>
    </main>
  );
}
