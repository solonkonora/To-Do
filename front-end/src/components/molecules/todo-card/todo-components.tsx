"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../../ui/select";

import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from "../../ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash, ChevronDown } from "lucide-react";

import { useAppContext } from "@/providers/context/app-context";
import { deleteTodo, editTodo } from "@/featuers/todos/api/todo-api";
import { useState } from "react";

interface SelectProps {
  disabled?: boolean; // weather or not select field is disabled;
  property: "Priority" | "Status";
  arrValues: string[];

  defaultValue: string;
  onValueChange: (e: string) => void;
};

interface ListProps {
  todoId: string;
  property: "Priority" | "Status";
  defaultValue: string;
  arrValues: string[];
  allowApiModifications?: boolean; // weather or not clicking any item on list should actually update todo
};

function TodoSelectDropDown({
  property,
  defaultValue,
  onValueChange,
  arrValues,

  disabled = false,
}: SelectProps) {
  return (
    <Select onValueChange={onValueChange} disabled={!!disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`updated ${property.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent className="">
        {
          arrValues.map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
};

function TodoDropDownList({ todoId, property, defaultValue, arrValues, allowApiModifications = false }: ListProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { todos, setTodos } = useAppContext();

  const handleUpdate = (value: string) => {
    if (!allowApiModifications) return;

    if (!todos.find(t => t.id === todoId)) return;

    setLoading(true);

    const update = { [property.toLowerCase()]: value }

    toast.promise(() => editTodo(todoId, update), {
      loading: `Updating ${property} ...`,
      success: ({ data, message, status }) => {
        setTodos(prev => prev.map(t => {
          // updating only on the UI
          if (t.id === todoId) return data;

          return t;
        }));

        return `${property} successfully updated`;
      },
      error: (er) => {
        return er?.message || `${property} could not be updated`;
      },
      finally: () => setLoading(false),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex flex-nowrap text-nowrap text-xs sm:text-base">
        <ChevronDown size={20} /> {defaultValue}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary-color text-tertiary-color">
        <DropdownMenuLabel>
          {property}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          arrValues.map((v) => (
            <DropdownMenuItem key={v} className="hover:bg-tertiary-color hover:text-primary-color"
              onClick={() => handleUpdate(v)}
              disabled={loading}
            >
              {v}
              {v === defaultValue && <span className="h-[5px] w-[5px] inline-block rounded-full ml-2 bg-tertiary-color animate-pulse" />}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function TodoDeleteDialog({ todoId }: { todoId: string }) {
  const { setTodos } = useAppContext();

  const handleDelete = () => {
    toast.promise(() => deleteTodo(todoId), {
      loading: "Deleting ...",
      success: ({ message }) => {
        setTodos(prev => prev.filter(task => task.id !== todoId));

        return message;
      },
      error: (er) => {
        return er?.message || "Something went wrong";
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash
          size={20}
          className="cursor-pointer text-red-500"
        />
      </DialogTrigger>
      <DialogContent className="max-w-[min(96vw,_450px)] rounded-sm bg-primary-color text-tertiary-color border-none">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-gray-300">
            This action cannot be undone. This will permanently delete your todo
            and remove all it's data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start gap-3">
          <DialogClose asChild className="bg-tertiary-color text-primary-color">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" variant="destructive" className="text-tertiary-color" onClick={handleDelete}>
            Delete this Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};

export {
  TodoSelectDropDown,
  TodoDropDownList,
  TodoDeleteDialog,
};
