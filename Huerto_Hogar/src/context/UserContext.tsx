import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from 'axios';

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

    // Escuchar cambios en localStorage para sincronizar login/logout entre pestañas
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            // Cuando otra pestaña actualiza/elimina currentUser
            if (e.key === 'currentUser') {
                if (e.newValue) {
                    try {
                        setCurrentUser(JSON.parse(e.newValue));
                    } catch (err) {
                        setCurrentUser(null);
                    }
                    // emitir evento local para sincronizar otros contextos
                    try { window.dispatchEvent(new CustomEvent('user-logged-in', { detail: { correo: JSON.parse(e.newValue).correo } })); } catch (err) {}
                } else {
                    setCurrentUser(null);
                    try { window.dispatchEvent(new Event('user-logged-out')); } catch (err) {}
                    // Navegar a home en otras pestañas para reflejar el logout inmediato
                    try { window.location.replace('/'); } catch (err) {}
                }
            }

            // Cuando otra pestaña cambia el token de acceso
            if (e.key === 'accessToken') {
                if (e.newValue) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${e.newValue}`;
                } else {
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
        };

        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
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
        // also remove access token to ensure other tabs update axios headers
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
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
