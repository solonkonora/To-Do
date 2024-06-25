"use client"

import * as React from 'react';
import { getCurrentUser } from './api/get-current-user';
import { User } from './api/type';

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const useUserAuth = () => React.useContext(UserContext);

export default function UserAuthGuardProvider({ children }: {
    children: React.ReactNode
}) {
    const [user, setUser] = React.useState<User>({} as User);

    React.useEffect(() => {
        getCurrentUser().then((user) => setUser(user))
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
