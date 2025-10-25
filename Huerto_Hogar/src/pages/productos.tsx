import { ProductosGrid2 } from "../components/productgrid.components";
import { productos } from "../data/Productos";

export function ProductosPage(){
    return(
        <>
        <div className="row p-3">
            <ProductosGrid2 productos={productos}/>
        </div>
        </>
    )
}