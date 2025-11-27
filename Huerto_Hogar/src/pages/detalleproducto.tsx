import { useParams } from "react-router";
import { useState, useContext, useEffect } from "react";
import { ReviewSection } from "../components/reviewsection.component";
import { ModalComponent } from "../components/modal.component";
import { CartContext } from "../context/CartContext"; // <- asegúrate de que la ruta sea correcta
import productoService from '../services/productoService';

type ProductoAPI = {
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    imagen?: string;
    imagen2?: string;
    imagen3?: string;
    imagen4?: string;
    categoria?: string;
    stock?: number;
}

export function DetalleProducto() {
    const { addToCart, cart } = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        title: "",
        message: "",
    });

    const { nombre } = useParams();
    const [producto, setProducto] = useState<ProductoAPI | null>(null);
    const [imagenPrincipal, setImagenPrincipal] = useState<string | undefined>(undefined);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        (async () => {
            setCargando(true);
            try {
                const all = await productoService.getAll();
                const slug = String(nombre || '').toLowerCase();
                const found = (all as any[]).find((p: any) => String(p.nombre).toLowerCase().replace(/\s+/g, "-") === slug);
                if (found) {
                    // normalizar imagen y stock
                    const normalized = {
                        ...found,
                        imagen: (found as any).imagen || (found as any).imagen1 || '/espinaca4.jfif',
                        stock: typeof (found as any).stock === 'number' ? (found as any).stock : ((found as any).cantidad || 0)
                    } as ProductoAPI;
                    setProducto(normalized);
                    setImagenPrincipal(normalized.imagen);
                }
            } catch (err) {
                console.error('Error cargando producto desde API:', err);
            } finally {
                setCargando(false);
            }
        })();
    }, [nombre]);

    const handleAddToCart = () => {
        const input = document.getElementById("cantidad") as HTMLInputElement;
        const cantidad = Number(input?.value ?? 0);

        if (isNaN(cantidad) || cantidad < 1) {
            setModalInfo({
                title: "Error!",
                message: "Por favor ingresa una cantidad válida (mínimo 1)"
            });
            setShowModal(true);
            return;
        }

        if (!producto) return;

        // validar stock localmente antes de enviar al carrito
        const existente = cart.find((c) => String(c.id) === String(producto.id));
        const cantidadActual = existente ? existente.cantidad : 0;
        if (typeof producto.stock === 'number' && cantidadActual + cantidad > producto.stock) {
            setModalInfo({
                title: "Stock insuficiente",
                message: `No hay suficiente stock disponible. Stock actual: ${producto.stock}, solicitado: ${cantidadActual + cantidad}`
            });
            setShowModal(true);
            return;
        }

        addToCart({
            id: String(producto.id),
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen || '',
            cantidad,
        });

        setModalInfo({
            title: "Producto agregado!",
            message: `Se agregó ${cantidad} unidad${cantidad > 1 ? "es" : ""} de ${producto.nombre} al carrito.`,
        });
        setShowModal(true);
    };

        if (cargando) {
            return <div className="container my-5">Cargando...</div>;
        }

        if (!producto) {
        return (
            <>
                <div className="container-fluid my-5">
                    <div className="p-3" style={{ backgroundColor: '#2E8B57', color: 'white' }}>
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Producto no encontrado</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container my-4">
                {/* Breadcrumb */}
                <div className="my-3">
                    <small>
                        <a href="/" style={{ color: "#2E8B57" }}>Inicio</a> &gt;{" "}
                        <a href={`/productos?categoria=${producto.categoria}`} style={{ color: "#2E8B57" }}>
                            {(() => {
                                const map: Record<string,string> = { frutas: 'Frutas frescas', verduras: 'Verduras orgánicas', organicos: 'Productos orgánicos', lacteos: 'Productos lácteos' };
                                const code = (producto.categoria || '').toString().toLowerCase();
                                return map[code] || producto.categoria;
                            })()}
                        </a>{" "}
                        &gt; <span>{producto.nombre}</span>
                    </small>
                </div>

                {/* Detalle del producto */}
                <div className="row">
                    {/* Imagen principal */}
                    <div className="col-md-6">
                        <div className="card p-3">
                            <img
                                src={imagenPrincipal}
                                alt={producto.nombre}
                                className="img-fluid mb-2"
                            />
                            <div className="d-flex gap-2">
                                {[producto.imagen, producto.imagen2, producto.imagen3, producto.imagen4].map(
                                    (img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            className={`thumbnail-img ${img === imagenPrincipal ? "active" : ""}`}
                                            style={{ width: "60px", cursor: "pointer" }}
                                            onClick={() => setImagenPrincipal(img)}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Texto y compra */}
                    <div className="col-md-6">
                        <h2>{producto.nombre}</h2>
                        <h5>Precio: ${producto.precio.toLocaleString()}</h5>
                        <hr />
                        <p>{producto.descripcion}</p>
                        <hr />
                        <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            min={1}
                            defaultValue={1}
                            className="form-control mb-3"
                            style={{ maxWidth: 100 }}
                        />
                        <button className="btn btn-success mt-3" onClick={handleAddToCart}>
                            Añadir al carrito
                        </button>

                        <ModalComponent
                            title={modalInfo.title}
                            message={modalInfo.message}
                            show={showModal}
                            onClose={() => {
                                setShowModal(false);

                                // 🪄 Si el modal fue de "Producto agregado", abrir el carrito después de 500 ms
                                if (modalInfo.title === "Producto agregado!") {
                                    setTimeout(() => {
                                        const modalEl = document.getElementById("carritoModal");
                                        if (modalEl && (window as any).bootstrap) {
                                            const modal = new (window as any).bootstrap.Modal(modalEl);
                                            modal.show();
                                        }
                                    }, 500);
                                }
                            }}
                        />
                        <hr />
                    </div>
                </div>
                <ReviewSection productId={producto.id} />
            </div>
        </>
    );
}
