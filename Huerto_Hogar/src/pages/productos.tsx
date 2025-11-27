import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ProductosGrid2 } from "../components/productgrid.components";
import { FiltroProductos } from "../components/filtroproductos.component";
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

export function ProductosPage() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
    const [productosApi, setProductosApi] = useState<ProductoAPI[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    // 👇 Detectar si hay ?categoria en la URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoriaParam = params.get("categoria");

        if (categoriaParam) {
            // Normalizar valores aceptados: soportar tanto códigos ('frutas','organicos',...) como
            // nombres largos (p.e. 'Productos Organicos') provenientes de enlaces.
            const param = decodeURIComponent(categoriaParam || '').trim();
            const mapping: Record<string, string> = {
                'frutas': 'frutas',
                'verduras': 'verduras',
                'organicos': 'organicos',
                'lacteos': 'lacteos',
                'frutas frescas': 'frutas',
                'verduras organicas': 'verduras',
                'productos organicos': 'organicos',
                'productos lacteos': 'lacteos',
                // incluir variantes sin acentos / mayúsculas
            };
            const key = param.toLowerCase();
            const codigo = mapping[key] ?? null;
            setCategoriaSeleccionada(codigo);
        } else {
            setCategoriaSeleccionada(null);
        }
    }, [location.search]);

    // Cargar productos desde API
    useEffect(() => {
        setLoading(true);
        productoService.getAll()
            .then((res) => {
                // Normalizar respuesta: asegurar `stock` e `imagen`
                const mapping: Record<string,string> = {
                    'frutas frescas': 'frutas',
                    'verduras organicas': 'verduras',
                    'productos organicos': 'organicos',
                    'productos lacteos': 'lacteos',
                    'frutas': 'frutas',
                    'verduras': 'verduras',
                    'organicos': 'organicos',
                    'lacteos': 'lacteos'
                };
                const mapped = (res || []).map((p: any) => {
                    const rawCat = (p.categoria || '').toString();
                    const catKey = rawCat.toLowerCase();
                    const codigo = mapping[catKey] ?? null;
                    return {
                        ...p,
                        imagen: p.imagen || p.imagen1 || p.imagenUrl || '/espinaca4.jfif',
                        stock: typeof p.stock === 'number' ? p.stock : (p.cantidad || 0),
                        categoria: codigo // normalize category to the code used by UI
                    };
                });
                setProductosApi(mapped as any);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error cargando productos desde API:', err);
                setError('No fue posible cargar productos. Mostrando catálogo local.');
                setLoading(false);
            });
    }, []);

    const productosFiltrados = categoriaSeleccionada === null
        ? productosApi
        : productosApi.filter((p) => (p.categoria || '').toLowerCase() === categoriaSeleccionada?.toLowerCase());

    return (
        <>
            <div className="row p-3">
                {loading ? (
                    <div className="text-center">Cargando productos...</div>
                ) : productosFiltrados.length > 0 ? (
                    <ProductosGrid2 productos={productosFiltrados as any} />
                ) : (
                    <div className="text-center mt-3 fw-bold" style={{ color: "#2E8B57" }}>
                        Productos no disponibles.
                    </div>
                )}
            </div>

            <FiltroProductos onFilter={setCategoriaSeleccionada as any} />
        </>
    );
}
