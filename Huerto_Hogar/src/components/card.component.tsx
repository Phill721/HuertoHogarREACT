import type { Producto } from "../data/Productos"

interface CardProps{
    producto : Producto
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
                        <a href="platanos.html" className="btn mt-auto main-text btn-buy">Comprar: ${producto.precio}</a>
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
                        <a href="detalleproductof1.html" className="btn mt-auto main-text" style={{ backgroundColor: '#2E8B57', color: 'white' }}>Comprar: ${producto.precio}</a>
                    </div>
                </div>
            </div>
        </>
    )
}