import { createContext, useEffect, useState, type ReactNode } from "react";

interface UserContextType {
    currentUser: string | null;
    login: (user: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    login: () => { },
    logout: () => { }
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) setCurrentUser(storedUser);
    }, []);

    const login = (user: string) => {
        localStorage.setItem("currentUser", user);
        setCurrentUser(user);
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
