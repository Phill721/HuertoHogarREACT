// src/huerto-admin/pages/ProductosAdmin.tsx
import { useState, useEffect } from 'react';
import { Tabla } from '../components/Tabla';
import { Toast } from '../components/Toast';
import { Loader } from '../components/Loader';
import type { Producto } from '../types/producto';
import { getProductos, setProductos } from '../data/storage';

interface FormData {
  id: string;
  nombre: string;
  categoria: 'frutas' | 'verduras' | 'organicos' | 'lacteos';
  precio: number;
  stock: number;
  descripcion: string;
  activo: boolean;
}

const initialFormData: FormData = {
  id: '',
  nombre: '',
  categoria: 'verduras',
  precio: 0,
  stock: 0,
  descripcion: '',
  activo: true
};

interface FormErrors {
  nombre?: string;
  categoria?: string;
  precio?: string;
  stock?: string;
}

export default function ProductosAdmin() {
  const [productos, setProductosState] = useState<Producto[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [editando, setEditando] = useState(false);
  const [errores, setErrores] = useState<FormErrors>({});
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    tipo: 'success' | 'error';
  } | null>(null);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    setProductosState(getProductos());
  }, []);

  // Actualizar localStorage cuando cambian los productos
  useEffect(() => {
    if (productos.length > 0) {
      setProductos(productos);
    }
  }, [productos]);

  const validarFormulario = (): boolean => {
    const nuevosErrores: FormErrors = {};
    
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    if (!formData.categoria) {
      nuevosErrores.categoria = 'Selecciona una categoría';
    }
    
    if (formData.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }
    
    if (formData.stock < 0) {
      nuevosErrores.stock = 'El stock debe ser mayor o igual a 0';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulación de latencia

      if (editando) {
        const nuevosProductos = productos.map(p => 
          p.id === formData.id ? { ...formData } : p
        );
        setProductosState(nuevosProductos);
        setProductos(nuevosProductos);
        setNotificacion({
          mensaje: 'Producto actualizado exitosamente',
          tipo: 'success'
        });
      } else {
        const nuevoProducto = { 
          ...formData, 
          id: Date.now().toString() 
        };
        const nuevosProductos = [...productos, nuevoProducto];
        setProductosState(nuevosProductos);
        setProductos(nuevosProductos);
        setNotificacion({
          mensaje: 'Producto agregado exitosamente',
          tipo: 'success'
        });
      }
      handleCancelar();
    } catch (error) {
      setNotificacion({
        mensaje: 'Error al procesar la operación',
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleCancelar = () => {
    setFormData(initialFormData);
    setMostrarFormulario(false);
    setEditando(false);
    setErrores({});
  };

  const handleEditar = (producto: Producto) => {
    setFormData({
      ...producto,
      descripcion: producto.descripcion || ''
    });
    setMostrarFormulario(true);
    setEditando(true);
  };

  const handleEliminar = async (producto: Producto) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;

    setCargando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulación de latencia
      
      const nuevosProductos = productos.filter(p => p.id !== producto.id);
      setProductosState(nuevosProductos);
      setProductos(nuevosProductos);
      setNotificacion({
        mensaje: 'Producto eliminado exitosamente',
        tipo: 'success'
      });
    } catch (error) {
      setNotificacion({
        mensaje: 'Error al eliminar el producto',
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(precio);
  };

  return (
    <div className={`container-fluid px-4 ${cargando ? 'loading' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestión de Productos</h2>
        <button 
          className="btn btn-success"
          onClick={() => setMostrarFormulario(true)}
          data-tooltip="Agregar un nuevo producto al catálogo"
        >
          <i className="fas fa-plus me-2"></i>Agregar Producto
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title mb-4">{editando ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del Producto *</label>
                <input
                  type="text"
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Nombre del producto"
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="categoria" className="form-label">Categoría *</label>
                <select
                  className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value as FormData['categoria']})}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="frutas">Frutas</option>
                  <option value="verduras">Verduras</option>
                  <option value="organicos">Productos Orgánicos</option>
                  <option value="lacteos">Productos Lácteos</option>
                </select>
                {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio ($ CLP) *</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                    id="precio"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: Number(e.target.value)})}
                    min="0"
                    step="10"
                  />
                  {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock *</label>
                <input
                  type="number"
                  className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                  id="stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: Math.floor(Number(e.target.value))})}
                  min="0"
                  step="1"
                  onKeyDown={(e) => {
                    // Prevenir el ingreso de punto decimal o coma
                    if (e.key === '.' || e.key === ',') {
                      e.preventDefault();
                    }
                  }}
                />
                {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows={3}
                  placeholder="Descripción del producto"
                />
              </div>

              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="activo"
                    checked={formData.activo}
                    onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="activo">
                    Producto Activo
                  </label>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <Loader size="small" color="white" />
                      <span className="ms-2">Procesando...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      {editando ? 'Guardar Cambios' : 'Agregar Producto'}
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleCancelar}
                  disabled={cargando}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Lista de Productos</h3>
          <Tabla<Producto>
            data={productos}
            cols={[
              { key: 'nombre', header: 'Nombre' },
              { key: 'categoria', header: 'Categoría', render: (r) => r.categoria.charAt(0).toUpperCase() + r.categoria.slice(1) },
              { key: 'precio', header: 'Precio', render: (r) => formatearPrecio(r.precio) },
              { key: 'stock', header: 'Stock' },
              { 
                key: 'activo', 
                header: 'Estado', 
                render: (r) => (
                  <span 
                    className={`badge ${r.activo ? 'badge-success' : 'badge-danger'}`}
                    data-tooltip={r.activo ? 'Producto disponible' : 'Producto no disponible'}
                  >
                    {r.activo ? 'Activo' : 'Inactivo'}
                  </span>
                ),
                className: 'text-center'
              },
            ]}
            onEdit={handleEditar}
            onDelete={handleEliminar}
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
