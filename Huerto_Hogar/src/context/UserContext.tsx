import { createContext, useEffect, useState, type ReactNode } from "react";

interface UserData {
    user: string;
    correo: string;
}

interface UserContextType {
    currentUser: UserData | null;
    login: (user: string, correo: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    login: () => { },
    logout: () => { }
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<UserData | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("currentUser");
        if (stored) setCurrentUser(JSON.parse(stored));
    }, []);

    const login = (user: string, correo: string) => {
        const data = { user, correo };
        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);
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
