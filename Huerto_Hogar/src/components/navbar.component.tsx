import { useContext, type CSSProperties } from "react";
import { Link } from "react-router";
import { UserContext } from "../context/UserContext";


export const nodeco: CSSProperties = {
    textDecoration: 'none'
};

export function NavbarComponent() {
    
    const { currentUser, logout } = useContext(UserContext);
    
    return (
        <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#2E8B57' }}>
            <div className="container-fluid">
                <Link to="/" style={nodeco} className="navbar-brand d-flex align-items-center">
                    <img
                        src="/src/img/iconmain.png"
                        alt="Logo"
                        style={{ width: 40 }}
                        className="rounded-pill me-2"
                    />
                    Tienda Huerto Hogar
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0 text-center text-md-start">
                        <li className="nav-item">
                            <Link to="/productos" style={nodeco} className="nav-link nav-text">
                                Productos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/nosotros"} style={nodeco} className="nav-link nav-text">
                                Nosotros
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/blogs"} style={nodeco} className="nav-link nav-text" >
                                Blogs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contacto" style={nodeco} className="nav-link nav-text">
                                Contactos
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto text-center text-md-end">
                        {!currentUser ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/iniciarsesion" style={nodeco} className="nav-link nav-text">
                                        Iniciar sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registro" style={nodeco} className="nav-link nav-text">
                                        Registrar usuario
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Mi cuenta
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/perfil" className="dropdown-item">
                                            Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={logout}
                                        >
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}

                        <li className="nav-item">
                            <a
                                className="nav-link nav-text"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#carritoModal"
                            >
                                <i className="bi bi-cart" /> Carrito
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
