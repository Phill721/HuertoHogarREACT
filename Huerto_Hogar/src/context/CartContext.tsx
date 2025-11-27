import { createContext, useState, useEffect, type ReactNode } from "react";
import carritoService from '../services/carritoService';
import usuarioService from '../services/usuarioService';

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

        // Intentar persistir en backend si hay usuario logueado (buscar por correo en localStorage)
        (async () => {
            try {
                const stored = localStorage.getItem('currentUser');
                if (!stored) return; // no hay usuario
                const parsed = JSON.parse(stored || '{}');
                const correo = parsed?.correo || parsed?.email || parsed?.user;
                if (!correo) return;

                // obtener usuario desde API para conocer su id
                const usuarios = await usuarioService.getAll();
                const usuario = usuarios.find((u: any) => {
                    const e = (u.email || u.correo || '').toLowerCase();
                    return e === String(correo).toLowerCase();
                });
                if (!usuario) return;

                // preparar payload compatible con CarritoItem en backend
                const payload = {
                    productoId: String(item.id),
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad
                };

                await carritoService.addItem(usuario.id, payload);
                // opcional: podríamos refrescar carrito local desde backend si queremos sincronizar ids
            } catch (err) {
                // no bloquear la UX si falla la persistencia; solo log
                console.error('No se pudo persistir item del carrito en backend:', err);
            }
        })();
    };

    const removeFromCart = (id: string) => {
        // persistir eliminación en backend restando la cantidad existente
        setCart((prev) => {
            const existing = prev.find((p) => p.id === id);
            if (existing) {
                (async () => {
                    try {
                        const stored = localStorage.getItem('currentUser');
                        if (!stored) return;
                        const parsed = JSON.parse(stored || '{}');
                        const correo = parsed?.correo || parsed?.email || parsed?.user;
                        if (!correo) return;
                        const usuarios = await usuarioService.getAll();
                        const usuario = usuarios.find((u: any) => {
                            const e = (u.email || u.correo || '').toLowerCase();
                            return e === String(correo).toLowerCase();
                        });
                        if (!usuario) return;
                        await carritoService.addItem(usuario.id, {
                            productoId: String(existing.id),
                            nombre: existing.nombre,
                            precio: existing.precio,
                            cantidad: -existing.cantidad
                        });
                    } catch (err) {
                        console.error('No se pudo sincronizar removeFromCart con backend:', err);
                    }
                })();
            }
            return prev.filter((p) => p.id !== id);
        });
    };

    const clearCart = () => {
        // intentar limpiar en backend restando todas las cantidades
        setCart((prev) => {
            const snapshot = [...prev];
            (async () => {
                try {
                    const stored = localStorage.getItem('currentUser');
                    if (!stored) return;
                    const parsed = JSON.parse(stored || '{}');
                    const correo = parsed?.correo || parsed?.email || parsed?.user;
                    if (!correo) return;
                    const usuarios = await usuarioService.getAll();
                    const usuario = usuarios.find((u: any) => {
                        const e = (u.email || u.correo || '').toLowerCase();
                        return e === String(correo).toLowerCase();
                    });
                    if (!usuario) return;
                    for (const existing of snapshot) {
                        await carritoService.addItem(usuario.id, {
                            productoId: String(existing.id),
                            nombre: existing.nombre,
                            precio: existing.precio,
                            cantidad: -existing.cantidad
                        });
                    }
                } catch (err) {
                    console.error('No se pudo sincronizar clearCart con backend:', err);
                }
            })();
            return [];
        });
    };

    const updateQuantity = (id: string, cantidad: number) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === id);
            if (!existing) return prev;
            if (cantidad < 1) {
                // remove
                (async () => {
                    try {
                        const stored = localStorage.getItem('currentUser');
                        if (!stored) return;
                        const parsed = JSON.parse(stored || '{}');
                        const correo = parsed?.correo || parsed?.email || parsed?.user;
                        if (!correo) return;
                        const usuarios = await usuarioService.getAll();
                        const usuario = usuarios.find((u: any) => {
                            const e = (u.email || u.correo || '').toLowerCase();
                            return e === String(correo).toLowerCase();
                        });
                        if (!usuario) return;
                        await carritoService.addItem(usuario.id, {
                            productoId: String(existing.id),
                            nombre: existing.nombre,
                            precio: existing.precio,
                            cantidad: -existing.cantidad
                        });
                    } catch (err) {
                        console.error('No se pudo sincronizar updateQuantity(remove) con backend:', err);
                    }
                })();
                return prev.filter((p) => p.id !== id);
            }

            const delta = cantidad - existing.cantidad;
            if (delta !== 0) {
                (async () => {
                    try {
                        const stored = localStorage.getItem('currentUser');
                        if (!stored) return;
                        const parsed = JSON.parse(stored || '{}');
                        const correo = parsed?.correo || parsed?.email || parsed?.user;
                        if (!correo) return;
                        const usuarios = await usuarioService.getAll();
                        const usuario = usuarios.find((u: any) => {
                            const e = (u.email || u.correo || '').toLowerCase();
                            return e === String(correo).toLowerCase();
                        });
                        if (!usuario) return;
                        await carritoService.addItem(usuario.id, {
                            productoId: String(existing.id),
                            nombre: existing.nombre,
                            precio: existing.precio,
                            cantidad: delta
                        });
                    } catch (err) {
                        console.error('No se pudo sincronizar updateQuantity con backend:', err);
                    }
                })();
            }

            return prev.map((p) => (p.id === id ? { ...p, cantidad } : p));
        });
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
