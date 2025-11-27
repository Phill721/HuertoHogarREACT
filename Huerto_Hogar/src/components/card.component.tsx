import { Link } from "react-router"
import { nodeco } from "./navbar.component"

type ProductoDisplay = {
    id: string | number;
    nombre: string;
    descripcion?: string;
    precio: number;
    imagen: string;
    imagen2?: string;
    imagen3?: string;
    imagen4?: string;
    categoria?: string;
    stock?: number;
}

interface CardProps{
    producto : ProductoDisplay
}
// Este primer componente es para que la card sea mas grande, para productos destacados en home por ejemplo
export function CardComponent({ producto }: CardProps){
    return(
        <>
            <div className="col-md-4 col-sm-6 col-12 d-flex">
                <div className="card m-1 rounded h-100 w-100">
                    <img className="card-img-top" src={producto.imagen} alt={producto.nombre} />
                    <div className="card-body d-flex flex-column">
                        <h4 className="card-title main-text">{producto.nombre}</h4>
                        <p className="card-text main-text">{producto.descripcion}</p>
                        <div className="mt-2">
                            {typeof producto.stock === 'number' ? (
                                <div className={`mb-2 ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                                    Stock: {producto.stock}
                                </div>
                            ) : null}
                            <Link to={`/productos/${String(producto.nombre).toLowerCase().replace(/\s+/g, "-")}`} style={{...nodeco, display: "block"}} className={`btn mt-auto main-text btn-buy ${producto.stock === 0 ? 'disabled' : ''}`}>
                                {producto.stock === 0 ? 'Agotado' : `Comprar: $${producto.precio.toLocaleString()}`}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Este otro componente es para que la card sea mas pequeña, para usarse en paginas de catalogo completo por ejemplo
export function CardComponent2({ producto }: CardProps){
    return(
        <>
            <div className="col-md-3 mb-3">
                <div className="card m-1 rounded h-100">
                    <img className="card-img-top" src={producto.imagen} alt={producto.nombre} style={{ width: '100%' }} />
                    <div className="card-body d-flex flex-column">
                        <h4 className="card-title main-text">{producto.nombre}</h4>
                        <p className="card-text main-text">{producto.descripcion}</p>
                        <div className="mt-2">
                            {typeof producto.stock === 'number' ? (
                                <div className={`mb-2 ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                                    Stock: {producto.stock}
                                </div>
                            ) : null}
                            <Link to={`/productos/${String(producto.nombre).toLowerCase().replace(/\s+/g, "-")}`} style={{...nodeco, display: "block"}} className={`btn mt-auto main-text btn-buy ${producto.stock === 0 ? 'disabled' : ''}`}>
                                {producto.stock === 0 ? 'Agotado' : `Comprar: $${producto.precio.toLocaleString()}`}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}