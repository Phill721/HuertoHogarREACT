import type { Producto } from "../data/Productos"

interface CardProps{
    producto : Producto
}
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