import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import productoService from '../services/productoService';
import usuarioService from '../services/usuarioService';
import ventaService from '../services/ventaService';

export default function Admin() {
  const [estadisticas, setEstadisticas] = useState({
    productos: 0,
    usuarios: 0,
    ventas: 0,
    ventasHoy: 0,
    ingresos: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [productos, usuarios, ventas] = await Promise.all([
          productoService.getAll(),
          usuarioService.getAll(),
          ventaService.getAll()
        ]);

        const hoy = new Date();
        const ventasHoy = (ventas || []).filter((v: any) => {
          try {
            return new Date(v.fecha).toDateString() === hoy.toDateString();
          } catch (e) { return false; }
        });

        const ingresos = (ventas || []).reduce((sum: number, v: any) => sum + (Number(v.total) || 0), 0);

        setEstadisticas({
          productos: (productos || []).filter((p: any) => p.activo !== false).length,
          usuarios: (usuarios || []).filter((u: any) => u.activo !== false).length,
          ventas: (ventas || []).length,
          ventasHoy: ventasHoy.length,
          ingresos
        });
      } catch (ex: any) {
        console.error('Error cargando estadísticas admin', ex);
        setError(ex?.message || 'Error cargando datos');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  return (
    <div className="container-fluid px-4">
      {loading && (
        <div className="alert alert-info">Cargando estadísticas...</div>
      )}
      {error && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      <div className="text-center mb-5">
        <h2 className="mb-3" style={{ color: 'var(--accent-green)' }}>
          Panel de Administración
        </h2>
        <p className="lead text-muted">
          Bienvenido al panel de administración de Huerto Hogar. 
          Desde aquí puedes gestionar los productos, usuarios y ventas de la tienda.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-xl-3">
          <div className="tarjeta-estadistica">
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <FaBox className="text-success" size={24} />
              </div>
              <div className="text-start">
                <h6 className="text-muted mb-1">Productos Activos</h6>
                <div className="numero mb-0">{estadisticas.productos}</div>
              </div>
            </div>
            <div className="progress" style={{ height: '4px' }}>
              <div 
                className="progress-bar bg-success" 
                style={{ width: '75%' }}
                role="progressbar" 
                aria-valuenow={75} 
                aria-valuemin={0} 
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="tarjeta-estadistica">
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <FaUsers className="text-primary" size={24} />
              </div>
              <div className="text-start">
                <h6 className="text-muted mb-1">Usuarios Activos</h6>
                <div className="numero mb-0">{estadisticas.usuarios}</div>
              </div>
            </div>
            <div className="progress" style={{ height: '4px' }}>
              <div 
                className="progress-bar bg-primary" 
                style={{ width: '60%' }}
                role="progressbar" 
                aria-valuenow={60} 
                aria-valuemin={0} 
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="tarjeta-estadistica">
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                <FaShoppingCart className="text-warning" size={24} />
              </div>
              <div className="text-start">
                <h6 className="text-muted mb-1">Ventas Hoy</h6>
                <div className="numero mb-0">{estadisticas.ventasHoy}</div>
              </div>
            </div>
            <div className="progress" style={{ height: '4px' }}>
              <div 
                className="progress-bar bg-warning" 
                style={{ width: '45%' }}
                role="progressbar" 
                aria-valuenow={45} 
                aria-valuemin={0} 
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="tarjeta-estadistica">
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                <FaChartLine className="text-info" size={24} />
              </div>
              <div className="text-start">
                <h6 className="text-muted mb-1">Ingresos Totales</h6>
                <div className="numero mb-0">{formatearPrecio(estadisticas.ingresos)}</div>
              </div>
            </div>
            <div className="progress" style={{ height: '4px' }}>
              <div 
                className="progress-bar bg-info" 
                style={{ width: '80%' }}
                role="progressbar" 
                aria-valuenow={80} 
                aria-valuemin={0} 
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Accesos Rápidos</h5>
              <div className="list-group">
                <Link to="/productos-admin" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <FaBox className="me-3" />
                    Gestionar Productos
                  </div>
                  <span className="badge bg-primary rounded-pill">{estadisticas.productos}</span>
                </Link>
                <Link to="/usuarios" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <FaUsers className="me-3" />
                    Gestionar Usuarios
                  </div>
                  <span className="badge bg-primary rounded-pill">{estadisticas.usuarios}</span>
                </Link>
                <Link to="/ventas" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <FaShoppingCart className="me-3" />
                    Ver Ventas
                  </div>
                  <span className="badge bg-primary rounded-pill">{estadisticas.ventas}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-4">Resumen de Ventas</h5>
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Ventas Totales</span>
                  <span className="h5 mb-0">{estadisticas.ventas}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Ventas Hoy</span>
                  <span className="h5 mb-0">{estadisticas.ventasHoy}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Ingresos Totales</span>
                  <span className="h5 mb-0 text-success">{formatearPrecio(estadisticas.ingresos)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
