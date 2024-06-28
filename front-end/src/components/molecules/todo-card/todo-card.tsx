import { Priority, Status, type Todo } from "../../../featuers/todos/api/type";

//import edit icon from lucid-react
import { Edit, InfoIcon, } from "lucide-react";
import Link from "next/link";
import { TodoDeleteDialog, TodoDropDownList } from "./todo-components";
import { addEllipsis } from "@/lib/utils";

// todo card props
export interface TodoProps {
  todo: Todo;
};

export default function TodoCard({ todo }: TodoProps) {
  return (
    <div className="w-full flex gap-10 items-start justify-between border bg-primary-color text-tertiary-color p-4 rounded-md">
      <div className="w-full flex flex-col gap-3 items-start justify-between">
        <div className="w-full min-h-[30px] md:min-h-[30px] text-sm sm:text-base">
          {addEllipsis(todo.todo)}
        </div>

        <div className="flex justify-between flex-wrap sm:flex-nowrap gap-2 mt-4">
          <div className="w-fit flex items-center justify-between gap-2 mr-4">
            <TodoDropDownList
              allowApiModifications
              todoId={todo.id}
              property="Priority"
              defaultValue={todo.priority}
              arrValues={Object.values(Priority)}
            />

            <TodoDropDownList
              allowApiModifications
              todoId={todo.id}
              property="Status"
              defaultValue={todo.status}
              arrValues={Object.values(Status)}
            />
          </div>

          <div className="flex items-center text-xs sm:text-base">
            <span className="text-nowrap">Start Date: &nbsp;</span>

            <span className="inline md:inline">{new Date(todo.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 justify-evenly">
        <Link href={`todos/view/${todo.id}`}>
          <InfoIcon
            size={20}
            className="bg-tertiary-color text-primary-color rounded-full border-none"
            onClick={() => null}
          />
        </Link>

        <Link href={`todos/edit/${todo.id}`}>
          <Edit
            size={20}
            className="cursor-pointer"
          />
        </Link>
        <TodoDeleteDialog todoId={todo.id} />
      </div>
    </div>
  );
}
