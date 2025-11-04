import type { CSSProperties } from "react";
import { Link } from "react-router";

const nodeco: CSSProperties = {
    textDecoration: 'none'
}

export function NavbarComponent(){
    return(
        <>
            <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: '#2E8B57' }}>
                <div className="container-fluid">
                    <Link to={"/"} style={nodeco}><a className="navbar-brand d-flex align-items-center" href="/">
                        <img src="/src/img/iconmain.png" alt="Logo" style={{ width: 40 }} className="rounded-pill me-2" />
                        Tienda Huerto Hogar
                    </a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0 text-center text-md-start">
                            <li className="nav-item">
                                
                                <Link to={"/productos"} style={nodeco}><a className="nav-link nav-text">Productos</a></Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text" href="nosotros.html">Nosotros</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text" href="blogs.html">Blogs</a>
                            </li>
                            <li className="nav-item">
                                <Link to={"/contacto"} style={nodeco}><a className="nav-link nav-text">Contactos</a></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto text-center text-md-end">
                            <li className="nav-item" id="login-link">
                                <a className="nav-link nav-text" href="iniciosesion.html">Iniciar sesión</a>
                            </li>
                            <li className="nav-item" id="register-link">
                                <Link to={"/registro"} style={nodeco}><a className="nav-link nav-text">Registrar usuario</a></Link>
                            </li>
                            <li className="nav-item dropdown" id="profile-menu" style={{ display: 'none' }}>
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">Mi cuenta</a>
                                <ul className="dropdown-menu">
                                    <li><a id="perfil-link" className="dropdown-item" href="#">Perfil</a></li>
                                    <li><a className="dropdown-item" href="#">Configuración</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#" id="logout-btn">Cerrar sesión</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text" href="#" data-bs-toggle="modal" data-bs-target="#carritoModal">
                                    <i className="bi bi-cart" /> Carrito
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}