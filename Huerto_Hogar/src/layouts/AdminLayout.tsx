import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaLeaf } from 'react-icons/fa';

export default function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <div className="py-3 text-center">
          <h2 className="text-white h4">
            <FaLeaf className="me-2" />
            Huerto Hogar
          </h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                className={pathname === '/admin' ? 'active' : ''}
                to="/admin"
              >
                <FaHome /> Panel Principal
              </Link>
            </li>
            <li>
              <Link
                className={pathname === '/productos-admin' ? 'active' : ''}
                to="/productos-admin"
              >
                <FaBox /> Productos
              </Link>
            </li>
            <li>
              <Link
                className={pathname === '/usuarios' ? 'active' : ''}
                to="/usuarios"
              >
                <FaUsers /> Usuarios
              </Link>
            </li>
            <li>
              <Link
                className={pathname === '/ventas' ? 'active' : ''}
                to="/ventas"
              >
                <FaShoppingCart /> Ventas
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <header className="topbar">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h1>Panel de Administración</h1>
            </div>
            <div>
              <Link to="/admin" className="btn btn-outline-light me-2">
                <FaHome className="me-2" />
                Inicio
              </Link>
              <a 
                href="/" 
                className="btn btn-danger"
                onClick={(e) => {
                  if (!window.confirm('¿Está seguro de volver a la tienda?')) {
                    e.preventDefault();
                  }
                }}
              >
                Volver a la Tienda
              </a>
            </div>
          </div>
        </header>

        <main className="container-fluid py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
