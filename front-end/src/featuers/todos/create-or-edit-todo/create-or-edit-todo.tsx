"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { Todo, Priority, Status } from "../api/type";
import { createTodo, editTodo, getSingleTodo } from "../api/todo-api";
import { useAppContext } from "@/providers/context/app-context";
import { toast } from "sonner";
import Link from "next/link";
import { TodoSelectDropDown } from "@/components/molecules";

interface Props {
  pageType: "Create-Page" | "Edit-Page";
}

export default function CreateOrEditTodoPage({ pageType }: Props) {
  const params = useParams<{ todoId: string }>();
  const { currentUser, setTodos } = useAppContext();

  const getDefaultEdits = useCallback(
    (): Partial<Todo> => ({
      userId: currentUser?.id || "",
      todo: "",
      priority: "Medium",
      status: "In Progress",
    }),
    [currentUser]
  );

  const [loading, setLoading] = useState<boolean>(pageType === "Edit-Page"); // if page type is edit page, then we'll fetch, hence loading is true from start

  const [editData, setEditData] = useState<Partial<Todo>>(getDefaultEdits());

  const warnMissingField = (description: string) =>
    toast.warning("Missing Field", {
      description,
    });

  const handleChange = (val: string, key: keyof Todo) => {
    setEditData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!editData.todo?.trim())
      return warnMissingField("Todo must not be assigned a value");

    if (!editData.priority?.trim())
      return warnMissingField("Priority field must be assigned a value");

    setLoading(true);

    if (pageType === "Edit-Page") {
      toast.promise(() => editTodo(params.todoId, editData), {
        loading: "Editing...",
        success: ({ data, status, message }) => {
          const { updatedAt, createdAt, id, userId, ...rest } = data;

          setTodos((prev) =>
            prev.map((t) => {
              if (t.id === id) return data;

              return t;
            })
          );

          setEditData((prev) => ({ ...prev, ...rest }));

          toast.success("Task updated successfully", {
            action: {
              label: <Link href={`/todos/view/${id}`}>View Task</Link>,
              onClick: () => null,
            },
          });
          return "Update Done";
        },
        error: (er) => {
          return er?.message || "An error occurred";
        },
        finally: () => setLoading(false),
      });

      return;
    }

    // Else creating a new task

    toast.promise(() => createTodo(editData), {
      loading: "Creating...",
      success: ({ data, status, message }) => {
        setEditData(getDefaultEdits()); // clearing form after creation

        toast.success("Task created successfully", {
          action: {
            label: <Link href={`/todos/view/${data.id}`}>View Task</Link>,
            onClick: () => null,
          },
        });
        return "Creation Done";
      },
      error: (er) => {
        return er?.message || "An error occurred";
      },
      finally: () => setLoading(false),
    });
  };

  useEffect(() => {
    if (pageType === "Edit-Page" && params.todoId) {
      toast.promise(() => getSingleTodo(params.todoId), {
        loading: "Getting prev todo ...",
        success: ({
          data: { updatedAt, createdAt, id, userId, ...rest },
          status,
          message,
        }) => {
          setEditData((prev) => ({ ...prev, ...rest }));

          return "Task retrieved";
        },
        error: (er) => {
          return er?.message || "An error occurred";
        },
        finally: () => setLoading(false),
      });
    }
  }, [pageType, params]);

  return (
    <main className="w-full flex flex-col items-center justify-start gap-12">
      <div className="w-full max-w-[min(95%,_600px)] flex items-center justify-center bg-secondary-color text-tertiary-color h-[90px] md:h-[120px]">
        <span className="text-nowrap text-xl md:text-3xl font-[600]">
          {(() => {
            const arr = pageType.split("-");

            arr.splice(1, 0, "Todo");

            return arr.join(" ");
          })()}
        </span>
      </div>

      <form
        className="w-full max-w-[min(95%,_600px)] flex flex-col items-center justify-center gap-8"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <Label
            htmlFor="priority"
            className="w-full flex flex-col items-start justify-center gap-3"
          >
            <span className="font-semibold">
              Priority ({editData.priority})
            </span>

            <TodoSelectDropDown
              property="Priority"
              defaultValue={editData.priority || ""}
              onValueChange={(val) => handleChange(val, "priority")}
              arrValues={Object.keys(Priority)}
            />
          </Label>

          <Label
            htmlFor="status"
            className="w-full flex flex-col items-start justify-center gap-3"
          >
            <span className="font-semibold">Status ({editData.status})</span>

            <TodoSelectDropDown
              disabled={pageType === "Create-Page"}
              property="Status"
              defaultValue={editData.status || ""}
              onValueChange={(val) => handleChange(val, "status")}
              arrValues={Object.keys(Status)}
            />
          </Label>
        </div>

        <Label
          htmlFor="todo"
          className="w-full mx-auto flex flex-col items-start justify-center gap-4"
        >
          <span className="font-semibold">Todo</span>

          <textarea
            id="todo"
            placeholder="Write Todo"
            className="w-full p-4 rounded-sm border border-secondary-color"
            rows={10}
            value={editData.todo}
            disabled={loading}
            onChange={(e) => handleChange(e.target.value, "todo")}
          />
        </Label>

        <Button
          type="submit"
          className="w-full max-w-[310px] bg-primary-color text-tertiary-color px-12 py-6"
          disabled={loading}
        >
          Save {pageType === "Edit-Page" ? "Edits" : "Task"}
        </Button>
      </form>
    </main>
  );
}
