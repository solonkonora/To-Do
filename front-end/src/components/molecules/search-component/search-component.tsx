"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { SearchX } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getUserTodos } from "@/featuers/todos/api/todo-api";
import { useAppContext } from "@/providers/context/app-context";
import { TodoQuerySelectDropDown } from "./search-components";
import { Priority, Status } from "@/featuers/todos/api/type";

interface Props {
  loadingTodos: boolean;
  setLoadingTodos: Dispatch<SetStateAction<boolean>>;
}

interface SearchValues {
  todo: string;
  priority: keyof typeof Priority | "All"; // using this as a way to extend the enum and add the "All" option for the general get request
  status: keyof typeof Status | "All";
}

const getDefaults = (): SearchValues => ({
  todo: "",
  priority: "All",
  status: "All",
});

export default function SearchComponent({ loadingTodos, setLoadingTodos }: Props) {
  const [searchValues, setSearchValues] = useState<SearchValues>(getDefaults());

  const [searchQuery, setSearchQuery] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setTodos } = useAppContext();

  const clearSearch = () => {
    setSearchQuery("");
    setSearchValues(getDefaults());
    router.replace(pathname);
  };

  const buildSearchQuery = () => {
    const queryObj = new URLSearchParams();

    /**
     * Building the search query from the other possibly available search params.
     */
    ["todo", "priority", "status"].forEach((allowedQuery) => {
      if (searchParams.get(allowedQuery)?.trim()) {
        queryObj.append(allowedQuery, searchParams.get(allowedQuery)!.trim());
      }
    });

    return queryObj;
  };

  const handleChange = (key: "todo" | "priority" | "status", value: string) => {
    const queryObj = buildSearchQuery();
    queryObj.set(key, value);

    setSearchValues((prev) => ({ ...prev, [key]: value }));
    setSearchQuery(queryObj.toString());

    router.replace(`${pathname}?${queryObj.toString()}`);
  };

  useEffect(() => {
    const queryObj = buildSearchQuery();

    setSearchValues({
      status: (queryObj.get("status") as SearchValues["status"]) || "All",
      priority: (queryObj.get("priority") as SearchValues["priority"]) || "All",
      todo: queryObj.get("todo") || "",
    });

    setSearchQuery(queryObj.toString());
  }, []);

  useEffect(() => {
    // this useEffect is acting like a debounce function.
    // debouncing off of search query
    // if (!searchQuery.trim()) return;
    // console.log({ searchQuery })

    setLoadingTodos(true);

    const timId = setTimeout(() => {
      getUserTodos(searchQuery)
        .then(({ data, message, status }) => {
          setTodos(data);
        })
        .finally(() => {
          setLoadingTodos(false);
        });
    }, 1200);

    return () => {
      clearTimeout(timId);
    };
  }, [searchQuery]);

  return (
    <div className="w-full max-w-[min(95%,_600px)] self-start flex items-end justify-start gap-4 flex-wrap">
      <search className="w-full max-w-[300px] px-[10px] border border-primary-color text-primary-color rounded-xl flex flex-nowrap items-center justify-center outline-none">
        <input
          type="text"
          name="search-task"
          placeholder=">_ search task"
          className="w-full rounded-xl outline-none bg-transparent border-none py-[10px]"
          value={searchValues.todo}
          onChange={(e) => handleChange("todo", e.target.value)}
          disabled={loadingTodos}
        />

        <SearchX
          size={30}
          className="text-primary-color cursor-pointer"
          onClick={clearSearch}
        />
      </search>

      <div className="flex items-center justify-center gap-4">
        <TodoQuerySelectDropDown
          label={`priority - ${searchValues.priority}`}
          property="priority"
          arrValues={["All", ...Object.values(Priority)]}
          defaultValue={searchValues.priority}
          disabled={loadingTodos}
          onValueChange={(val) => handleChange("priority", val)}
        />

        <TodoQuerySelectDropDown
          label={`status - ${searchValues.status}`}
          property="status"
          arrValues={["All", ...Object.values(Status)]}
          defaultValue={searchValues.status}
          disabled={loadingTodos}
          onValueChange={(val) => handleChange("status", val)}
        />
      </div>
    </div>
  );
}
