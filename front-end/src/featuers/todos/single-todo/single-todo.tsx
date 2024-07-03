// "use client";

// import { useEffect, useState } from "react";
// import { LucideImport, Share2, Share2Icon } from "lucide-react";
// import { Todo } from "../api/type";
// import { useParams } from "next/navigation";

// export default function SingleTodo() {
//   const [todo, setTodo] = useState<Todo | null>(null);
//   const params = useParams<{todoId: string}>();

//   const [priorityValue, setPriorityValue] = useState('medium');
//   const [statusValue, setStatusValue] = useState('in progress');

//   const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setPriorityValue(event.target.value);
//   };

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setStatusValue(event.target.value);
//   };

//   useEffect(()=> {}, []);

//   return (
//     <main >
//       <p className="text-primary-color text-2l mx-auto md:pr-14 lg:pr-14 xl:pr-14 max-w-[800px]">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum animi sint quaerat consequatur delectus exercitationem aut qui quis veniam!
//       </p>

//       <div className="flex flex-wrap gap-2 sm:gap-8 sm:justify-around mt-10">
//         <div className="flex flex-col items-start text-primary-color pb-5">
//           <label htmlFor="priority" className="font-semibold">Priority Level</label>
//           <select
//             id="priority"
//             value={priorityValue}
//             onChange={handlePriorityChange}
//             className="w-full max-w-[200px] border-2 border-black p-[5px] pr-[100px] rounded-md"
//           >
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//         </div>

//         <div className="flex flex-col items-start text-primary-color">
//           <label htmlFor="status" className="font-semibold">Status</label>
//           <select
//             id="status"
//             value={statusValue}
//             onChange={handleStatusChange}
//             className="w-full max-w-[200px] border-2 border-black p-[5px] pr-[100px] rounded-md"
//           >
//             <option value="todo">Todo</option>
//             <option value="in progress">In Progress</option>
//             <option value="blocked">Blocked</option>
//           </select>
//         </div>

//         <button className=" text-black font-bold py-2 px-4 rounded mt-4 sm:mt-0">
//           <Share2Icon className="h-6 w-6 size-20 flex items-left" />
//         </button>
//       </div>
//     </main>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import { LucideImport, Share2, Share2Icon } from "lucide-react";
import { Priority, Status, Todo } from "../api/type";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
          {/* <div className="flex flex-col text-primary-color">
            <Label htmlFor="priority" className="font-semibold mb-3 text-2l">
              Priority Level
            </Label>
            <Select>
              <SelectTrigger className="w-full max-w-[200px] p-[5px] pr-[100px] rounded-md">
                {priorityValue}
              </SelectTrigger>
              <SelectContent className="text-primary-color">
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col text-primary-color">
            <Label htmlFor="status" className="font-semibold mb-3">
              Status
            </Label>
            <Select>
              <SelectTrigger className="w-full max-w-[200px] p-[5px] pr-[100px] rounded-md">
                {statusValue}
              </SelectTrigger>
              <SelectContent className="text-primary-color">
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
      </div>

      <Button className="text-white bg-primary-color font-bold py-2 px-4 rounded mt-4 sm:mt-0">
        <Share2Icon className="h-6 w-6 size-20 flex items-left" />
      </Button>
    </main>
  );
}