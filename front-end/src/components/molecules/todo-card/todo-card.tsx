import { Priority, Status, type Todo } from "../../../featuers/todos/api/type";
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
import Link from "next/link";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { deleteTodo } from "@/featuers/todos/api/todo-api";
import { useAppContext } from "@/providers/context/app-context";

// todo card props
export interface TodoProps {
    todo: Todo
};

function DropDownBuilder({ property, value, arrKeys }: { property: string; value: string; arrKeys: string[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex flex-nowrap text-nowrap text-xs sm:text-base">
                <ChevronDown size={20}/> {value}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary-color text-tertiary-color">
                <DropdownMenuLabel>
                    {property}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-tertiary-color hover:text-primary-color">
                    {value} <span className="h-[5px] w-[5px] inline-block rounded-full ml-2 bg-tertiary-color animate-pulse" />
                </DropdownMenuItem>
                {
                    arrKeys.filter((k) => k !== value).map((k) => (
                        <DropdownMenuItem key={k} className="hover:bg-tertiary-color hover:text-primary-color">
                            {k}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

function DeleteDialog({ todoId }: { todoId: string }) {
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
        })
    }
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
}

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

                    <DeleteDialog todoId={todo.id} />
                </div>
            </CardContent>
        </Card>
    );
}
