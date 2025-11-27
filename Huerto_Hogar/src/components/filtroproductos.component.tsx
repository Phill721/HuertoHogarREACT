import { useState } from "react";

interface Props {
    onFilter: (categoria: string | null) => void;
}

export function FiltroProductos({ onFilter }: Props) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const handleFilter = (categoriaCode: string | null, displayName?: string) => {
        setActiveCategory(categoriaCode);
        onFilter(categoriaCode);
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
                                className={`btn me-2 mb-2 ${activeCategory === 'frutas'
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter('frutas')}
                            >
                                Frutas frescas
                            </button>

                            <button
                                className={`btn me-2 mb-2 ${activeCategory === 'verduras'
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter('verduras')}
                            >
                                Verduras orgánicas
                            </button>

                            <button
                                className={`btn me-2 mb-2 ${activeCategory === 'organicos'
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter('organicos')}
                            >
                                Productos orgánicos
                            </button>

                            <button
                                className={`btn me-2 mb-2 ${activeCategory === 'lacteos'
                                        ? "btn-light text-success fw-bold"
                                        : "btn-outline-light"
                                    }`}
                                onClick={() => handleFilter('lacteos')}
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
