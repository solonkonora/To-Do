"use client";

import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { SearchX } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getUserTodos } from "@/featuers/todos/api/todo-api";
import { useAppContext } from "@/providers/context/app-context";

interface Props {
  setLoadingTodos: Dispatch<SetStateAction<boolean>>;
}

export default function SearchComponent({ setLoadingTodos }: Props) {
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setTodos } = useAppContext();

  const clearSearch = () => {
    setSearchQuery("");
    setSearchVal("");
    router.replace(pathname);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const queryObj = new URLSearchParams();
    queryObj.append("todo", e.target.value.trim());
    setSearchVal(e.target.value);

    /**
     * Building the search query from the other possibly available search params.
    */
    ["priority", "status"].forEach((allowedQuery) => {
      if (searchParams.get(allowedQuery)?.trim()) {
        queryObj.append(allowedQuery, searchParams.get(allowedQuery)!.trim());
      }
    });

    router.replace(`${pathname}?${queryObj.toString()}`);
    setSearchQuery(queryObj.toString());
  };

  useEffect(() => {
    if (searchParams.get("todo")?.trim()) {
      setSearchVal(searchParams.get("todo")!.trim()!)
    };
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
    }
  }, [searchQuery]);

  return (
    <div className="w-full max-w-[min(95%,_600px)] self-start">
      <search className="w-full max-w-[300px] px-[10px] border border-primary-color text-primary-color rounded-xl flex flex-nowrap items-center justify-center outline-none">
        <input
          type="text"
          name="search-task"
          placeholder=">_ search task"
          className="w-full rounded-xl outline-none bg-transparent border-none py-[10px]"
          value={searchVal}
          onChange={handleChange}
        />
        <SearchX
          size={30}
          className="text-primary-color cursor-pointer"
          onClick={clearSearch}
        />
      </search>
    </div>
  );
};
