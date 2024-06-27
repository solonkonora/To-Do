"use client"

import type { Dispatch, SetStateAction } from "react";
import { useState, createContext, useContext } from 'react';
import type { User } from './api/types';
import type { Todo } from "@/featuers/todos/api/type";

interface AppContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const AppContext = createContext<AppContextType | null>(null);

function AppContextProvider({ children }: {
    children: React.ReactNode,
}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);

    return (
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser,
            todos,
            setTodos
        }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => useContext(AppContext) as AppContextType;

export {
    AppContextProvider,
    useAppContext,
}
