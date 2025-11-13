import { createContext, useState, useEffect, type ReactNode } from "react";

type CartItem = {
    id: string;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, cantidad: number) => void;
    total: number;
};

export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    updateQuantity: () => { },
    total: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    // 🧠 guarda el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // 🔁 sincroniza entre pestañas (cuando cambian en otra)
    useEffect(() => {
        const syncCart = (e: StorageEvent) => {
            if (e.key === "cart" && e.newValue) {
                setCart(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", syncCart);
        return () => window.removeEventListener("storage", syncCart);
    }, []);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                // si ya existe, solo suma la cantidad
                return prev.map((p) =>
                    p.id === item.id ? { ...p, cantidad: p.cantidad + item.cantidad } : p
                );
            } else {
                // si no existe, lo agrega nuevo
                return [...prev, item];
            }
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateQuantity = (id: string, cantidad: number) => {
        if (cantidad < 1) return;
        setCart((prev) =>
            prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
        );
    };

    const total = cart.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    );
}
