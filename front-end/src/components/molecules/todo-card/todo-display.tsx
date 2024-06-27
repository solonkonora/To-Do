import { Todo } from "@/featuers/todos/api/type";
import TodoCard from "./todo-card";

interface Props {
  todos: Todo[];
  loadingTodos: boolean;
}

export default function TodoDisplay({ todos, loadingTodos }: Props) {
  return (
    <div className="flex flex-col l w-full gap-8 py-4">
      {
        todos?.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))
      }
    </div>
  );
};
