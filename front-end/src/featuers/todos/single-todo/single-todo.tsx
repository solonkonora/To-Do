"use client";
import { useState } from "react";
import { LucideImport, Share2, Share2Icon } from "lucide-react";
// import { ShareIcon } from "@heroicons/react/solid";
// export default function SingleTodo() {
//   return (
//     <main className="w-full flex items-center justify-center">
//        View Todos
//     </main>
// )}

export default function SingleTodo() {
  const [priorityValue, setPriorityValue] = useState('medium');
  const [statusValue, setStatusValue] = useState('in progress');

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityValue(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(event.target.value);
  };

  return (
    <main >
      <p className="text-primary-color text-2l m-auto md:pr-14 lg:pr-14 xl:pr-14">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti nostrum animi sint quaerat consequatur delectus exercitationem aut qui quis veniam!
      </p>

      <div className="flex flex-col sm:flex-column lg:flex-row sm:justify-around pt-10">
        <div className="sm:w-1/2">
          <div className="flex flex-col items-start text-primary-color pb-5">
            <label htmlFor="priority" className="font-semibold">Priority Level</label>
            <select
              id="priority"
              value={priorityValue}
              onChange={handlePriorityChange}
              className="border-2 border-black sm:w-1/2 p-[5px] pr-[100px] rounded-md"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="sm:w-1/2">
          <div className="flex flex-col items-start text-primary-color">
            <label htmlFor="status" className="font-semibold">Status</label>
            <select
              id="status"
              value={statusValue}
              onChange={handleStatusChange}
              className="border-2 border-black sm:w-1/2 p-[5px] pr-[100px] rounded-md"
            >
              <option value="todo">Todo</option>
              <option value="in progress">In Progress</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
        <button className=" text-black font-bold py-2 px-4 rounded mt-4 sm:mt-0">
          <Share2Icon className="h-6 w-6 size-20 flex items-left" />
        </button>
      </div>
    </main>
  );
};
