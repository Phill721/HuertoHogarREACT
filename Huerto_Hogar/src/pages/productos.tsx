import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ProductosGrid2 } from "../components/productgrid.components";
import { productos, Categoria } from "../data/Productos";
import { FiltroProductos } from "../components/filtroproductos.component";

export function ProductosPage() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
    const location = useLocation();

    // 👇 Detectar si hay ?categoria en la URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoriaParam = params.get("categoria");

        if (categoriaParam) {
            // Buscar coincidencia exacta con los valores del enum
            const categoriaEncontrada = Object.values(Categoria).find(
                (cat) => cat.toLowerCase() === categoriaParam.toLowerCase()
            ) as Categoria | undefined;

            setCategoriaSeleccionada(categoriaEncontrada || null);
        } else {
            setCategoriaSeleccionada(null);
        }
    }, [location.search]);

    // Filtrado de productos
    const productosFiltrados =
        categoriaSeleccionada === null
            ? productos
            : productos.filter((p) => p.categoria === categoriaSeleccionada);

    return (
        <>
            <div className="row p-3">
                {productosFiltrados.length > 0 ? (
                    <ProductosGrid2 productos={productosFiltrados} />
                ) : (
                    <div className="text-center mt-3 fw-bold" style={{ color: "#2E8B57" }}>
                        Productos no disponibles.
                    </div>
                )}
            </div>

            <FiltroProductos onFilter={setCategoriaSeleccionada} />
        </>
    );
}
