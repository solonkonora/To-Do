import * as React from 'react';
import { TodoType } from '../api/type';
import {
    Card,
    CardContent,
} from "@/components/ui/card"

//import edit icon from lucid-react
import { Edit, Trash, InfoIcon, ChevronDown } from "lucide-react"

// todo card props
export interface ITodocardProps {
    todo: TodoType
}

export function Todocard({ todo }: ITodocardProps) {
    return (
        <Card className=' bg-[#006d77] text-white py-2 '>
            <CardContent className=' flex gap-10'>
                <div className=' flex flex-col gap-3 font-semibold '>
                    <div className=' '>
                        <p>{todo.todo}</p>
                    </div>
                    <div className=' flex   justify-between pr-10'>
                        <div className=' flex justify-between w-1/3'>
                            <div className=' flex items-center'> <span><ChevronDown /></span><span>{todo.priority}</span></div>
                            <div className=' flex items-center'> <span><ChevronDown /></span><span>{todo.status}</span></div>
                        </div>
                        <div className=' flex items-center'><span>Start date: &nbsp;&nbsp;</span> <span>{todo.dateCreated.toLocaleDateString()}</span></div>
                    </div>

                </div>
                <div className=' flex flex-col gap-3 justify-evenly'>
                    <InfoIcon className='bg-white text-[#006d77] rounded-full border-none' size={30} />
                    <Edit size={30} />
                    <Trash size={30} />
                </div>
            </CardContent>
        </Card>

    );
}
