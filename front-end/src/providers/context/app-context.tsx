"use client"

import type { Dispatch, SetStateAction } from "react";
import { useState, createContext, useContext } from 'react';
import { User } from './api/types';

interface AppContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextType | null>(null);

function AppContextProvider({ children }: {
    children: React.ReactNode,
}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <AppContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => useContext(AppContext) as AppContextType;

export {
    AppContextProvider,
    useAppContext,
}
