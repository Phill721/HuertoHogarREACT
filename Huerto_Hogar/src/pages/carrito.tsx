import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ModalComponent } from "../components/modal.component";
import { discountCodes } from "../data/descuentos";
import carritoService from '../services/carritoService';
import usuarioService from '../services/usuarioService';
import { UserContext } from '../context/UserContext';


export function CarritoDedicado() {
    const { cart, removeFromCart, clearCart, total } = useContext(CartContext);
    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [ventaCreada, setVentaCreada] = useState<any | null>(null);

    const aplicarDescuento = () => {
        const encontrado = discountCodes.find(
            (d) => d.codigo.toLowerCase() === codigo.toLowerCase().trim()
        );

        if (encontrado) {
            setDescuento(encontrado.porcentaje);
            setMensaje(`✅ Se aplicó un ${encontrado.porcentaje}% de descuento.`);
        } else {
            setDescuento(0);
            setMensaje("❌ Código inválido o expirado.");
        }
    };

    const totalConDescuento = total - (total * descuento) / 100;

    const handleComprar = () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío 😅");
            return;
        }
        realizarCheckout();
    };

    const realizarCheckout = async () => {
        setCargando(true);
        try {
            // intentar obtener id de usuario por correo almacenado en UserContext
            const current = ({} as any);
            // obtener current user desde localStorage o contexto
            // preferir UserContext si está disponible
            let correo: string | undefined;
            try {
                const ctx = JSON.parse(localStorage.getItem('currentUser') || 'null');
                if (ctx && ctx.correo) correo = ctx.correo;
            } catch (e) {}

            if (!correo) {
                alert('Debes iniciar sesión para completar la compra');
                return;
            }

            // buscar usuario por email
            const usuarios = await usuarioService.getAll();
            const usuario = usuarios.find((u: any) => (u.email || u.correo || '').toLowerCase() === correo!.toLowerCase());
            if (!usuario) {
                alert('Usuario no encontrado en el servidor. Crea una cuenta o contacta al administrador.');
                return;
            }

            // Si el backend gestiona carrito por usuario, aseguramos items en carrito persistente si fuera necesario
            // Realizar checkout enviando los items del carrito al backend
            const venta = await carritoService.checkout(usuario.id, cart.map((it: any) => ({
                productoId: String(it.id),
                nombre: it.nombre,
                precio: it.precio,
                cantidad: it.cantidad
            })));
            console.log('Venta creada:', venta);
            // guardar la venta para mostrar boleta
            setVentaCreada(venta);
            setShowModal(true);
            // limpiar carrito local
            clearCart();
        } catch (error) {
            console.error('Error al realizar checkout:', error);
            const msg = (error as any)?.message || String(error);
            if (msg && msg.toLowerCase().includes('stock')) {
                alert(`No fue posible completar la compra: ${msg}`);
            } else {
                alert('Error al procesar la compra. Revisa la consola para más detalles.');
            }
        } finally {
            setCargando(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // si cerramos la boleta, limpiar estado de venta y refrescar UI para stock
        if (ventaCreada) {
            setVentaCreada(null);
            setTimeout(() => window.location.reload(), 400);
        }
        setCodigo("");
        setDescuento(0);
        setMensaje("");
    };

    return (
        <div className="container my-5">
            <h2 className="mb-4 fw-bold" style={{ color: "#2E8B57" }}>
                Mi carrito de compras
            </h2>
            <div className="row">
                {/* Columna izquierda: productos */}
                <div className="col-md-8" id="carrito-productos">
                    {cart.length === 0 ? (
                        <div className="alert alert-info text-center">
                            🛒 Tu carrito está vacío
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="card mb-3 shadow-sm border-0"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={item.imagen}
                                            className="img-fluid rounded-start"
                                            alt={item.nombre}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title mb-1">{item.nombre}</h5>
                                            <p className="card-text text-muted mb-2">
                                                Cantidad: {item.cantidad}
                                            </p>
                                            <p className="card-text fw-semibold">
                                                ${item.precio.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 text-end pe-4">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {cart.length > 0 && (
                        <div className="text-end mt-3">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={clearCart}
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    )}
                </div>

                {/* Columna derecha: resumen */}
                <div className="col-md-4">
                    <div className="border p-4 rounded shadow-sm">
                        <h4>
                            Total:{" "}
                            <span id="carrito-total">
                                ${total.toLocaleString()}
                            </span>
                        </h4>

                        {descuento > 0 && (
                            <h5 className="text-success mt-2">
                                Descuento: -{descuento}% → Nuevo total:{" "}
                                <strong>${totalConDescuento.toLocaleString()}</strong>
                            </h5>
                        )}

                        <hr />
                        <label htmlFor="codigo" className="form-label">
                            Código de descuento
                        </label>
                        <input
                            type="text"
                            id="codigo"
                            className="form-control mb-2"
                            placeholder="Ingresa tu código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        <button
                            className="btn w-100 mb-2"
                            style={{ backgroundColor: "#2E8B57", color: "white" }}
                            onClick={aplicarDescuento}
                        >
                            Aplicar descuento
                        </button>

                        {mensaje && (
                            <p className="text-center mt-2 mb-0">{mensaje}</p>
                        )}

                        <button
                            id="btn-comprar"
                            className="btn w-100 mt-3"
                            style={{ backgroundColor: "#2E8B57", color: "white" }}
                            onClick={handleComprar}
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal: boleta de la venta si existe, sino mensaje genérico */}
            {ventaCreada ? (
                <ModalComponent
                    title={`Boleta #${ventaCreada.id ?? ''}`}
                    show={showModal}
                    onClose={handleCloseModal}
                    size="sm"
                >
                    <div>
                        <p className="mb-1"><strong>Fecha:</strong> {ventaCreada.fecha ? new Date(ventaCreada.fecha).toLocaleString() : ''}</p>
                        <p className="mb-2"><strong>Cliente:</strong> {ventaCreada.usuario ? (ventaCreada.usuario.nombre || ventaCreada.usuario.email) : ''}</p>
                        <hr />
                        <div>
                            {(ventaCreada.items || []).map((it: any, idx: number) => (
                                <div key={idx} className="d-flex justify-content-between mb-2">
                                    <div>
                                        <span className="fw-bold">{it.cantidad}x</span> {it.nombre}
                                    </div>
                                    <div className="text-end">
                                        {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format((it.precio || 0) * (it.cantidad || 0))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Total:</strong>
                            <strong className="text-success">{ventaCreada.total ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(ventaCreada.total) : ''}</strong>
                        </div>
                    </div>
                </ModalComponent>
            ) : (
                <ModalComponent
                    title="✅ Compra realizada"
                    message="Tu compra se ha realizado correctamente. En una versión en producción de esta web, serías redirigido hacia una página de pagos 💳"
                    show={showModal}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
