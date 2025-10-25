import type { Producto } from "../data/Productos";
import { CardComponent, CardComponent2 } from "./card.component";

interface ProductosGridProps {
    productos: Producto[]
}

export function ProductosGrid({ productos }: ProductosGridProps) {
    return (
        <div className="row">
            {productos.map((producto, index) => (
                <CardComponent key={index} producto={producto} />
            ))}
        </div>
    )
}

export function ProductosGrid2({ productos }: ProductosGridProps) {
    return (
        <div className="row">
            {productos.map((producto, index) => (
                <CardComponent2 key={index} producto={producto} />
            ))}
        </div>
    )
}