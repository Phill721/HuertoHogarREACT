import { createContext, useEffect, useState, type ReactNode } from "react";

interface UserData {
    user: string;
    correo: string;
    rol?: 'admin' | 'user';
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

    const login = (user: string, correo: string, rol: 'admin' | 'user' = 'user') => {
        const data: UserData = { user, correo, rol };
        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);
        // Emitir evento global para que otros contextos (ej. carrito) sincronicen
        try {
            window.dispatchEvent(new CustomEvent('user-logged-in', { detail: { correo } }));
        } catch (e) {
            // en entornos sin CustomEvent (muy antiguos) ignorar
        }
    };

    const logout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        // Emitir evento de logout para que otros contextos (ej. carrito) limpien/ajusten
        try {
            window.dispatchEvent(new Event('user-logged-out'));
        } catch (e) { }
    };

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
