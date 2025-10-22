import { BrowserRouter, Route, Routes } from "react-router";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { Home } from "./pages/home";

export function AppNavegacion(){
    return(
        <>
            <BrowserRouter>
                <NavbarComponent/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </>
    )
}