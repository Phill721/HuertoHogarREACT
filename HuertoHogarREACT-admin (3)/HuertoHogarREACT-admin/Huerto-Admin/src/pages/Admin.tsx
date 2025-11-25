import { useState, useEffect } from 'react';
import { MOCK_PRODUCTOS, MOCK_USUARIOS, MOCK_VENTAS } from '../data/mock';
import { FaBox, FaUsers, FaShoppingCart, FaChartLine } from 'react-icons/fa';

export default function Admin() {
  const [estadisticas, setEstadisticas] = useState({
    productos: 0,
    usuarios: 0,
    ventas: 0,
    ventasHoy: 0,
    ingresos: 0
  });

  useEffect(() => {
    const hoy = new Date();
    const ventasHoy = MOCK_VENTAS.filter(v => 
      new Date(v.fecha).toDateString() === hoy.toDateString()
    );

    setEstadisticas({
      productos: MOCK_PRODUCTOS.filter(p => p.activo).length,
      usuarios: MOCK_USUARIOS.filter(u => u.activo).length,
      ventas: MOCK_VENTAS.length,
      ventasHoy: ventasHoy.length,
      ingresos: MOCK_VENTAS.reduce((sum, v) => sum + v.total, 0)
    });
  }, []);

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  return (
    <div className="container-fluid px-4">
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
                <a href="/productos-admin" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <FaBox className="me-3" />
                    Gestionar Productos
                  </div>
                  <span className="badge bg-primary rounded-pill">{estadisticas.productos}</span>
                </a>
                <a href="/usuarios" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <FaUsers className="me-3" />
                    Gestionar Usuarios
                  </div>
                  <span className="badge bg-primary rounded-pill">{estadisticas.usuarios}</span>
                </a>
                <a href="/ventas" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <FaShoppingCart className="me-3" />
                    Ver Ventas
                  </div>
                  <span className="badge bg-primary rounded-pill">{estadisticas.ventas}</span>
                </a>
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
