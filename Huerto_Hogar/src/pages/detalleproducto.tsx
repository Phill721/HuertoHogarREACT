import { useParams } from "react-router";
import { productos, type Producto } from "../data/Productos";
import { useState } from "react";
import { ReviewSection } from "../components/reviewsection.component";

export function DetalleProducto() {
    const { nombre } = useParams();
    const producto: Producto | undefined = productos.find(
        (p) => p.id.toLowerCase().replace(/\s+/g, "-") === nombre
    );
    const [imagenPrincipal, setImagenPrincipal] = useState(producto?.imagen);
    if (!producto) {
        return <>
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
    }

    return (
        <>
            <div className="container my-4">
                {/* Breadcrumb */}
                <div className="my-3">
                    <small>
                        <a href="/" style={{ color: "#2E8B57" }}>Inicio</a> &gt;{" "}
                        <a href={`/productos?categoria=${producto.categoria}`} style={{ color: "#2E8B57" }}>
                            {producto.categoria}
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
                        <button className="btn btn-success mt-3">
                            Añadir al carrito
                        </button>
                        <hr />
                    </div>
                </div>
                <ReviewSection productId={producto.id}/>
            </div>

        </>
    )
}