// src/huerto-admin/pages/VentasAdmin.tsx
import { useState, useEffect } from 'react';
import { Tabla } from '../components/Tabla';
import { Toast } from '../components/Toast';
import { Loader } from '../components/Loader';
import type { Venta } from '../types/venta';
import { getVentas, setVentas } from '../data/storage';
import { FaChartLine, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

interface FormVenta {
  fecha: string;
  total: number;
  productos: Array<{
    productoId: string;
    nombre: string;
    cantidad: number;
    subtotal: number;
  }>;
}

const initialFormData: FormVenta = {
  fecha: new Date().toISOString().split('T')[0],
  total: 0,
  productos: []
};

export default function VentasAdmin() {
  const [ventas, setVentasState] = useState<Venta[]>([]);
  const [filtroFecha, setFiltroFecha] = useState<'hoy' | 'semana' | 'mes' | 'todo'>('todo');
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    tipo: 'success' | 'error';
  } | null>(null);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    setVentasState(getVentas());
  }, []);
  
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  const calcularTotalVentas = () => ventas.reduce((sum, v) => sum + v.total, 0);
  
  const ventasFiltradas = () => {
    const hoy = new Date();
    const unaSemanaAtras = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
    const unMesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());

    return ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      switch (filtroFecha) {
        case 'hoy':
          return fechaVenta.toDateString() === hoy.toDateString();
        case 'semana':
          return fechaVenta >= unaSemanaAtras;
        case 'mes':
          return fechaVenta >= unMesAtras;
        default:
          return true;
      }
    });
  };

  const ventasMostradas = ventasFiltradas();
  const totalPeriodo = ventasMostradas.reduce((sum, v) => sum + v.total, 0);

  return (
    <div className={`container-fluid px-4 ${cargando ? 'loading' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Registro de Ventas</h2>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FaChartLine className="text-success" size={24} />
                </div>
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Ventas Totales</h6>
                  <h3 className="card-title text-success mb-0">
                    {formatearPrecio(calcularTotalVentas())}
                  </h3>
                </div>
              </div>
              <div className="progress" style={{ height: '4px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: '100%' }}
                  role="progressbar" 
                  aria-valuenow={100} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <FaShoppingCart className="text-primary" size={24} />
                </div>
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Cantidad de Ventas</h6>
                  <h3 className="card-title text-primary mb-0">{ventas.length}</h3>
                </div>
              </div>
              <div className="progress" style={{ height: '4px' }}>
                <div 
                  className="progress-bar bg-primary" 
                  style={{ width: '75%' }}
                  role="progressbar" 
                  aria-valuenow={75} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <FaDollarSign className="text-warning" size={24} />
                </div>
                <div>
                  <h6 className="card-subtitle mb-1 text-muted">Total Periodo</h6>
                  <h3 className="card-title text-warning mb-0">
                    {formatearPrecio(totalPeriodo)}
                  </h3>
                </div>
              </div>
              <div className="progress" style={{ height: '4px' }}>
                <div 
                  className="progress-bar bg-warning" 
                  style={{ width: '60%' }}
                  role="progressbar" 
                  aria-valuenow={60} 
                  aria-valuemin={0} 
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-3 text-muted">Filtrar por fecha</h6>
              <div className="btn-group w-100">
                <button 
                  className={`btn ${filtroFecha === 'hoy' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFiltroFecha('hoy')}
                >
                  Hoy
                </button>
                <button 
                  className={`btn ${filtroFecha === 'semana' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFiltroFecha('semana')}
                >
                  Última Semana
                </button>
                <button 
                  className={`btn ${filtroFecha === 'mes' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFiltroFecha('mes')}
                >
                  Último Mes
                </button>
                <button 
                  className={`btn ${filtroFecha === 'todo' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setFiltroFecha('todo')}
                >
                  Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">
            Historial de Ventas
            {cargando && <Loader size="small" className="ms-2" />}
          </h3>
          <Tabla<Venta>
            data={ventasMostradas}
            cols={[
              { 
                key: 'id', 
                header: 'ID Venta',
                render: (r) => (
                  <span className="text-muted">
                    #{r.id}
                  </span>
                )
              },
              { 
                key: 'fecha', 
                header: 'Fecha',
                render: (r) => formatearFecha(r.fecha)
              },
              { 
                key: 'total', 
                header: 'Total',
                render: (r) => formatearPrecio(r.total),
                className: 'text-end'
              },
              {
                key: 'detalles',
                header: 'Detalles',
                render: (r) => (
                  <div className="dropdown">
                    <button 
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Ver Detalles
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: '300px' }}>
                      <li className="px-2 py-1">
                        <h6 className="mb-2 text-muted">Productos en esta venta:</h6>
                        {r.detalles.map((detalle, index) => (
                          <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                              <span className="fw-bold">{detalle.cantidad}x</span> {detalle.nombre}
                            </div>
                            <span className="text-end ms-3">
                              {formatearPrecio(detalle.subtotal)}
                            </span>
                          </div>
                        ))}
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between align-items-center">
                          <strong>Total:</strong>
                          <span className="text-success fw-bold">
                            {formatearPrecio(r.total)}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                ),
                className: 'text-center'
              }
            ]}
          />
        </div>
      </div>

      {notificacion && (
        <Toast
          message={notificacion.mensaje}
          type={notificacion.tipo}
          onClose={() => setNotificacion(null)}
        />
      )}
    </div>
  );
}
