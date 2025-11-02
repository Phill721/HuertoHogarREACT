import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Admin from './pages/Admin';
import ProductosAdmin from './pages/ProductosAdmin';
import UsuariosAdmin from './pages/UsuariosAdmin';
import VentasAdmin from './pages/VentasAdmin';
import './styles/navbar.css';
import './styles/admin.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<Admin />} />
          <Route path="productos-admin" element={<ProductosAdmin />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="ventas" element={<VentasAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
