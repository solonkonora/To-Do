import { Todo } from "@/featuers/todos/api/type";
import { TodoCard, TodoCardShimmer } from "./todo-card";

interface Props {
  todos: Todo[];
  loadingTodos: boolean;
}

export default function TodoDisplay({ todos, loadingTodos }: Props) {
  if (loadingTodos) return <TodoCardShimmer />;

  return (
    <div className="flex flex-col l w-full gap-8 py-4">
      {todos?.length ? (
        todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
      ) : (
        <p className="w-full text-center font-semibold mt-8">No Todos Found</p>
      )}
    </div>
  );
}
