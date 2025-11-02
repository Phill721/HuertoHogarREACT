import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';

export default function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <div className="py-3 text-center">
          <h2 className="text-white h4">Huerto Hogar</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                className={pathname === '/admin' ? 'active' : ''}
                to="/admin"
              >
                <FaHome className="me-2" /> Panel Principal
              </Link>
            </li>
            <li>
              <Link
                className={pathname === '/productos-admin' ? 'active' : ''}
                to="/productos-admin"
              >
                <FaBox className="me-2" /> Productos
              </Link>
            </li>
            <li>
              <Link
                className={pathname === '/usuarios' ? 'active' : ''}
                to="/usuarios"
              >
                <FaUsers className="me-2" /> Usuarios
              </Link>
            </li>
            <li>
              <Link
                className={pathname === '/ventas' ? 'active' : ''}
                to="/ventas"
              >
                <FaShoppingCart className="me-2" /> Ventas
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <header className="topbar">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Panel de Administración</h1>
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">Admin</span>
              <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                A
              </div>
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
