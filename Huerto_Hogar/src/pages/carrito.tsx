import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ModalComponent } from "../components/modal.component";
import { discountCodes } from "../data/descuentos";


export function CarritoDedicado() {
    const { cart, removeFromCart, clearCart, total } = useContext(CartContext);
    const [codigo, setCodigo] = useState("");
    const [descuento, setDescuento] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        //clearCart();
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

            {/* Modal de confirmación */}
            <ModalComponent
                title="✅ Compra realizada"
                message="Tu compra se ha realizado correctamente. En una versión en producción de esta web, serías redirigido hacia una página de pagos 💳"
                show={showModal}
                onClose={handleCloseModal}
            />
        </div>
    );
}
