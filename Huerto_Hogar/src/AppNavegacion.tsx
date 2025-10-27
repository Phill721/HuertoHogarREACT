import { BrowserRouter, Route, Routes } from "react-router";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { Home } from "./pages/home";
import { ProductosPage } from "./pages/productos";
import { DetalleProducto } from "./pages/detalleproducto";
import Contacto from "./pages/contacto";

export function AppNavegacion(){
    return(
        <>
            <BrowserRouter>
                <NavbarComponent/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/productos" element={<ProductosPage/>} />
                    <Route path="/productos/:nombre" element={<DetalleProducto/>} />
                    <Route path="/contacto" element={<Contacto/>} />
                </Routes>
                <FooterComponent/>
                
            </BrowserRouter>
        </>
    )
}