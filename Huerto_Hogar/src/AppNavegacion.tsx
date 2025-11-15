import { BrowserRouter, Route, Routes } from "react-router";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { Home } from "./pages/home";
import { ProductosPage } from "./pages/productos";
import { DetalleProducto } from "./pages/detalleproducto";
import Contacto from "./pages/contacto";
import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/nosotros";
import { Blogs } from "./pages/blogs";
import { CarritoDedicado } from "./pages/carrito";
import { useEffect } from "react";
import { initializeStorageData } from "./data/storage";
import Admin from "./pages/Admin";
import ProductosAdmin from "./pages/ProductosAdmin";
import UsuariosAdmin from "./pages/UsuariosAdmin";
import VentasAdmin from "./pages/VentasAdmin";

export function AppNavegacion() {
    useEffect(() => {
        // Inicializar datos en localStorage si no existen
        initializeStorageData();
    }, []);
    return (
        <>
            <BrowserRouter>
                <NavbarComponent />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<ProductosPage />} />
                    <Route path="/productos/:nombre" element={<DetalleProducto />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/registro" element={<SignUp />} />
                    <Route path="/iniciarsesion" element={<Login />} />
                    <Route path="/nosotros" element={<AboutUs />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/checkout" element={<CarritoDedicado />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/productos-admin" element={<ProductosAdmin />} />
                    <Route path="/usuarios" element={<UsuariosAdmin />} />
                    <Route path="/ventas" element={<VentasAdmin />} />
                </Routes>
                <FooterComponent />
            </BrowserRouter>
        </>
    )
}