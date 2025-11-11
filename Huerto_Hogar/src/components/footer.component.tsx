import { Link, useNavigate } from "react-router";
import { nodeco } from "./navbar.component";

export function FooterComponent(){
    const navigate = useNavigate();

    const handleCategoryClick = (categoria: string) => {
        navigate(`/productos?categoria=${encodeURIComponent(categoria)}`);
    };
    return(
        <>
            <footer className="p-2 p-md-4" style={{ backgroundColor: '#2E8B57', color: 'white' }}>
                <div className="container">
                    <div className="row text-center text-md-start">
                        {/* Sección 1: Nombre y slogan */}
                        <div className="col-12 col-md-3 mb-3">
                            <h4>HuertoHogar</h4>
                            <p className="mb-1">Frescura natural desde el huerto directa a tu mesa</p>
                        </div>
                        {/* Sección 2: Enlaces rápidos */}
                        <div className="col-12 col-md-3 mb-3">
                            <h5>Enlaces rápidos</h5>
                            <ul className="list-unstyled mb-0">
                                <li><Link to={"/"} style={nodeco} className="text-white text-decoration-none">Inicio</Link></li>
                                <li><Link to={"/productos"} style={nodeco} className="text-white text-decoration-none">Productos</Link></li>
                                <li><Link to={"/nosotros"} style={nodeco} className="text-white text-decoration-none">Nosotros</Link></li>
                                <li><a href="blogs.html" className="text-white text-decoration-none">Blogs</a></li>
                                <li><Link to={"/contacto"} style={nodeco} className="text-white text-decoration-none">Contacto</Link></li>
                            </ul>
                        </div>
                        {/* Sección 3: Categorías */}
                    <div className="col-12 col-md-3 mb-3">
                        <h5>Categorías</h5>
                        <ul className="list-unstyled mb-0">
                            <li>
                                <a
                                    onClick={() => handleCategoryClick("Frutas frescas")}
                                    className="text-white text-decoration-none"
                                    role="button"
                                >
                                    Frutas frescas
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleCategoryClick("Verduras Organicas")}
                                    className="text-white text-decoration-none"
                                    role="button"
                                >
                                    Verduras orgánicas
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleCategoryClick("Productos Organicos")}
                                    className="text-white text-decoration-none"
                                    role="button"
                                >
                                    Productos orgánicos
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => handleCategoryClick("Productos Lacteos")}
                                    className="text-white text-decoration-none"
                                    role="button"
                                >
                                    Productos lácteos
                                </a>
                            </li>
                        </ul>
                    </div>
                        {/* Sección 4: Contacto */}
                        <div className="col-12 col-md-3 mb-3">
                            <h5>Contacto</h5>
                            <ul className="list-unstyled mb-0">
                                <li className="d-flex align-items-center justify-content-center justify-content-md-start mb-1">
                                    <i className="bi bi-map me-2" />
                                    <span>Av. Principal 123, Santiago</span>
                                </li>
                                <li className="d-flex align-items-center justify-content-center justify-content-md-start mb-1">
                                    <i className="bi bi-telephone me-2" />
                                    <span>+56 9 2345 6789</span>
                                </li>
                                <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                                    <i className="bi bi-envelope me-2" />
                                    <span>contacto@huertohogar.cl</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Línea inferior */}
                    <div className="text-center mt-3 border-top pt-2">
                        <small>© 2025 HuertoHogar. Todos los derechos reservados.</small>
                    </div>
                </div>
            </footer>

        </>
    )
}