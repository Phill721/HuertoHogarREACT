import { BrowserRouter, Route, Routes } from "react-router";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { Home } from "./pages/home";
import { ProductosPage } from "./pages/productos";

export function AppNavegacion(){
    return(
        <>
            <BrowserRouter>
                <NavbarComponent/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/productos" element={<ProductosPage/>} />
                </Routes>
                <FooterComponent/>
                
            </BrowserRouter>
        </>
    )
}