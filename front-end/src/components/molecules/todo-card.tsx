import { Priority, Status, type Todo } from "../../featuers/todos/api/type";
import {
    Card,
    CardContent,
} from "@/components/ui/card"

//import edit icon from lucid-react
import { Edit, Trash, InfoIcon, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel
} from "../ui/dropdown-menu";
import Link from "next/link";

// todo card props
export interface TodoProps {
    todo: Todo
};

function DropDownBuilder({ property, value, arrKeys }: { property: string; value: string; arrKeys: string[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex flex-nowrap text-nowrap">
                <ChevronDown /> {value}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary-color text-tertiary-color">
                <DropdownMenuLabel>
                    {property}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {value}
                </DropdownMenuItem>
                {
                    arrKeys.filter((k) => k !== value).map((k) => (
                        <DropdownMenuItem key={k}>
                            {k}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default function TodoCard({ todo }: TodoProps) {
    return (
        <Card className="bg-primary-color text-tertiary-color py-2">
            <CardContent className="flex gap-10 items-center justify-between">
                <div className="w-full min-h-[90px] flex flex-col gap-3 items-start justify-between">
                    <div className=" ">
                        {todo.todo}
                    </div>

                    <div className="flex justify-between flex-wrap sm:flex-nowrap">
                        <div className="w-fit flex items-center justify-between gap-2 mr-4">
                            <DropDownBuilder property="Priority" value={todo.priority} arrKeys={Object.values(Priority)} />

                            <DropDownBuilder property="Status" value={todo.status} arrKeys={Object.values(Status)} />
                        </div>

                        <div className="flex items-center">
                            <span className="text-nowrap">Start Date: &nbsp;</span>
                            <span>{new Date(todo.createdAt).toDateString()}</span>
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

                    <Trash
                        size={20}
                        className="cursor-pointer text-red-500"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
