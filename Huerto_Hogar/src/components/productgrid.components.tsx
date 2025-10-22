import type { Producto } from "../data/Productos";
import { CardComponent } from "./card.component";

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