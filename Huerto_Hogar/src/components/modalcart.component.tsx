import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function CarritoModal() {
    const { cart, updateQuantity, removeFromCart, total } = useContext(CartContext);

    return (
        <div
            className="modal fade"
            id="carritoModal"
            tabIndex={-1}
            aria-labelledby="carritoModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="carritoModalLabel">
                            Tu carrito
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <ul className="list-group mb-3">
                            {cart.length === 0 ? (
                                <li className="list-group-item text-center">
                                    Tu carrito está vacío 🛒
                                </li>
                            ) : (
                                cart.map((item) => (
                                    <li
                                        key={item.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div>
                                            <strong>{item.nombre}</strong>
                                            <br />
                                            <small>${item.precio} c/u</small>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-sm btn-outline-secondary me-1"
                                                onClick={() =>
                                                    updateQuantity(item.id, item.cantidad + 1)
                                                }
                                            >
                                                +
                                            </button>
                                            <span className="mx-1">{item.cantidad}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary ms-1"
                                                onClick={() =>
                                                    updateQuantity(item.id, item.cantidad - 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger ms-2"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                x
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                        <h5>Total: ${total.toLocaleString()}</h5>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn"
                            style={{ backgroundColor: "#2E8B57", color: "white" }}
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <a
                            href="/carrito"
                            className="btn"
                            style={{ backgroundColor: "#2E8B57", color: "white" }}
                        >
                            Ir al carrito
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
