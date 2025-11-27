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
    persistToServer: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    updateQuantity: () => { },
    total: 0,
    persistToServer: async () => { },
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

    // Escuchar eventos globales de login/logout para sincronizar carrito con backend
    useEffect(() => {
        const onUserLogin = async (ev: Event) => {
            try {
                const detail: any = (ev as CustomEvent).detail || {};
                const correo = detail?.correo;
                if (!correo) return;

                // Obtener usuario para conocer su id
                const usuarios = await usuarioService.getAll();
                const usuario = usuarios.find((u: any) => {
                    const e = (u.email || u.correo || '').toLowerCase();
                    return e === String(correo).toLowerCase();
                });
                if (!usuario) {
                    setCart([]);
                    return;
                }

                // Obtener carrito desde backend y reemplazar el local
                const serverCart: any[] = await carritoService.getCart(usuario.id);
                if (!serverCart || !Array.isArray(serverCart)) {
                    setCart([]);
                    return;
                }

                const mapped = serverCart.map((it: any) => ({
                    id: String(it.productoId ?? it.producto?.id ?? it.id ?? ''),
                    nombre: it.nombre ?? it.producto?.nombre ?? '',
                    precio: Number(it.precio ?? it.producto?.precio ?? 0),
                    imagen: it.imagen ?? (it.producto && (it.producto.imagen || '')) ?? '',
                    cantidad: Number(it.cantidad ?? 0)
                }));

                setCart(mapped);
            } catch (err) {
                console.error('Error sincronizando carrito tras login:', err);
            }
        };

        const onUserLogout = () => {
            // Al cerrar sesión, limpiar carrito local para evitar mezcla entre usuarios
            setCart([]);
        };

        window.addEventListener('user-logged-in', onUserLogin as EventListener);
        window.addEventListener('user-logged-out', onUserLogout);

        return () => {
            window.removeEventListener('user-logged-in', onUserLogin as EventListener);
            window.removeEventListener('user-logged-out', onUserLogout);
        };
    }, []);

    // Al montar, si ya hay un usuario guardado (sesión persistente), sincronizar su carrito
    useEffect(() => {
        (async () => {
            try {
                const storedUser = localStorage.getItem('currentUser');
                if (!storedUser) return;
                const parsed = JSON.parse(storedUser || '{}');
                const correo = parsed?.correo || parsed?.email || parsed?.user;
                if (!correo) return;

                const usuarios = await usuarioService.getAll();
                const usuario = usuarios.find((u: any) => {
                    const e = (u.email || u.correo || '').toLowerCase();
                    return e === String(correo).toLowerCase();
                });
                if (!usuario) return;

                const serverCart: any[] = await carritoService.getCart(usuario.id);
                if (!serverCart || !Array.isArray(serverCart)) return;

                const mapped = serverCart.map((it: any) => ({
                    id: String(it.productoId ?? it.producto?.id ?? it.id ?? ''),
                    nombre: it.nombre ?? it.producto?.nombre ?? '',
                    precio: Number(it.precio ?? it.producto?.precio ?? 0),
                    imagen: it.imagen ?? (it.producto && (it.producto.imagen || '')) ?? '',
                    cantidad: Number(it.cantidad ?? 0)
                }));

                setCart(mapped);
            } catch (err) {
                // no bloquear si falla la sincronización inicial
                console.error('Error sincronizando carrito al iniciar la aplicación:', err);
            }
        })();
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
            value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, total, persistToServer }}
        >
            {children}
        </CartContext.Provider>
    );
}

async function persistToServer() {
    try {
        console.log('persistToServer: starting persist of local cart to server...');
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

        // Obtener cart actual desde localStorage para persistir (en caso el state haya cambiado)
        const storedCart = localStorage.getItem('cart');
        const currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
        if (!currentCart.length) { console.log('persistToServer: cart empty, nothing to persist'); return; }

        // Enviar cada item al backend (cantidad positiva)
        for (const item of currentCart) {
            try {
                const resp = await carritoService.addItem(usuario.id, {
                    productoId: String(item.id),
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad,
                });
                console.log('persistToServer: added item to server cart', item, resp);
            } catch (err) {
                console.error('Error persisting cart item on logout:', err);
            }
        }
    } catch (err) {
        console.error('Error persisting cart to server:', err);
    }
}
