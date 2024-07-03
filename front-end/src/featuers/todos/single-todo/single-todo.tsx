"use client";

import { useEffect, useState } from "react";
import { Priority, Status, Todo } from "../api/type";
import { useParams } from "next/navigation";
import { getSingleTodo } from "../api/todo-api";
import { TodoDropDownList } from "@/components/molecules";


export default function SingleTodo() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const params = useParams<{ todoId: string }>();

  const [priorityValue, setPriorityValue] = useState("medium");
  const [statusValue, setStatusValue] = useState("in progress");

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityValue(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(event.target.value);
  };

  useEffect(() => {
    if (!params.todoId) return;

    getSingleTodo(params.todoId)
      .then(({ data, message, status }) => {
        setTodo(data)
      })
      .catch();
  }, [params.todoId]);

  return (
    <main className="container mx-auto p-4">
      {todo && (
        <p className="text-primary-color text-2xl mx-auto md:pr-14 lg:pr-14 xl:pr-14 max-w-[800px]">
          {todo.todo}
        </p>
      )}

      <div className="flex gap-2 sm:gap-8 sm:justify-around mt-10">
        <div className="flex flex-nowrap items-center justify-center gap-8">
          {
            todo && (
              <>
                <div className="border min-w-[170px] rounded-sm">
                  <TodoDropDownList
                    allowApiModifications
                    todoId={todo.id}
                    property={"Priority"}
                    defaultValue={todo.priority}
                    arrValues={Object.keys(Priority)}
                    onUpdateSuccessfull={setTodo}
                  />
                </div>

                <div className="border min-w-[170px] rounded-sm">
                  <TodoDropDownList
                    allowApiModifications
                    todoId={todo.id}
                    property={"Status"}
                    defaultValue={todo.status}
                    arrValues={Object.keys(Status)}
                    onUpdateSuccessfull={setTodo}
                  />
                </div>
              </>
            )
          }
        
        </div>
      </div>
    </main>
  );
}