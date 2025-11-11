import { useState } from "react";
import { Categoria } from "../data/Productos";

interface Props {
    onFilter: (categoria: Categoria | null) => void;
}

export function FiltroProductos({ onFilter }: Props) {
    const [activeCategory, setActiveCategory] = useState<Categoria | null>(null);

    const handleFilter = (categoria: Categoria | null) => {
        setActiveCategory(categoria);
        onFilter(categoria);
    };

    return (
        <div className="container-fluid my-3">
            <div
                className="p-3 rounded shadow-sm"
                style={{ backgroundColor: "#2E8B57", color: "white" }}
            >
                <div className="row align-items-center">
                    <div className="col-12 text-center">
                        <h4 className="mb-2">¡Frescura natural y calidad garantizada!</h4>
                        <p className="mb-3" style={{ fontSize: "0.95rem" }}>
                            En Huerto Hogar creemos que cada fruto y verdura debe llegar
                            directo del campo chileno a tu mesa, 100% orgánicos y trabajados
                            con dedicación por agricultores locales.
                        </p>
                    </div>

                    <div className="col-12 text-center">
                        <p className="mb-2 fw-bold">Categorías:</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            <button
                                className={`btn me-2 mb-2 ${activeCategory === Categoria.FrutasFrescas
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter(Categoria.FrutasFrescas)}
                            >
                                Frutas frescas
                            </button>

                            <button
                                className={`btn me-2 mb-2 ${activeCategory === Categoria.VerdurasOrganicas
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter(Categoria.VerdurasOrganicas)}
                            >
                                Verduras orgánicas
                            </button>

                            <button
                                className={`btn me-2 mb-2 ${activeCategory === Categoria.ProductosOrganicos
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter(Categoria.ProductosOrganicos)}
                            >
                                Productos orgánicos
                            </button>

                            <button
                                className={`btn me-2 mb-2 ${activeCategory === Categoria.ProductosLacteos
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter(Categoria.ProductosLacteos)}
                            >
                                Productos lácteos
                            </button>

                            <button
                                className="btn btn-outline-light mb-2"
                                onClick={() => handleFilter(null)}
                            >
                                Reiniciar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
