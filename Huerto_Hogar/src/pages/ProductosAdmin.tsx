// src/huerto-admin/pages/ProductosAdmin.tsx
import { useState, useEffect } from 'react';
import { Tabla } from '../components/Tabla';
import { Toast } from '../components/Toast';
import { Loader } from '../components/Loader';
import type { Producto } from '../types/producto';
import productoService from '../services/productoService';
import axios from 'axios';

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
  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);
  const [imagesPreview, setImagesPreview] = useState<(string | null)[]>([null, null, null, null]);
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    tipo: 'success' | 'error';
  } | null>(null);

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    (async () => {
      try {
        setCargando(true);
        const data = await productoService.getAll();
        // adaptar ids a string y validar categorías permitidas
        const allowed = ['frutas', 'verduras', 'organicos', 'lacteos'];
        const mapped: Producto[] = data.map((p: any) => ({
          id: String(p.id),
          nombre: p.nombre,
          categoria: allowed.includes(p.categoria) ? p.categoria : 'verduras',
          precio: Number(p.precio) || 0,
          stock: Number(p.stock) || 0,
          descripcion: p.descripcion,
          activo: p.activo == null ? true : !!p.activo,
          imagen: p.imagen || null,
          imagen2: p.imagen2 || null,
          imagen3: p.imagen3 || null,
          imagen4: p.imagen4 || null,
        }));
        setProductosState(mapped);
      } catch (err) {
        console.error('Error cargando productos desde API:', err);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  // Actualizar localStorage cuando cambian los productos
  useEffect(() => {
    // ya no usamos localStorage; opcional: podríamos sincronizar localStorage si lo deseas
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
    console.log('[ProductosAdmin] handleSubmit start', { editando, formData, images });
    if (!validarFormulario()) return;
    // Confirmar antes de agregar o actualizar
    if (editando) {
      const confirmar = window.confirm('¿Confirma que desea actualizar este producto?');
      if (!confirmar) return;
    } else {
      const confirmar = window.confirm('¿Confirma que desea agregar este nuevo producto?');
      if (!confirmar) return;
    }

    setCargando(true);
    try {
      if (editando) {
        // actualizar en backend (primero datos)
        console.log('[ProductosAdmin] calling update (data only) with images pending:', images);
        let updated = await productoService.update(formData.id, {
          nombre: formData.nombre,
          categoria: formData.categoria,
          precio: formData.precio,
          stock: formData.stock,
          descripcion: formData.descripcion,
          activo: formData.activo
        });
        console.log('[ProductosAdmin] update (data) result:', updated);
        // Si existen archivos seleccionados, subir imágenes en una segunda petición
        const hasFiles = images.some(f => f instanceof File && f != null);
        if (hasFiles) {
          console.log('[ProductosAdmin] uploading images for product', updated.id, images);
          try {
            if (typeof (productoService as any).uploadImages === 'function') {
              const withImgs = await (productoService as any).uploadImages(updated.id, images);
              console.log('[ProductosAdmin] uploadImages result:', withImgs);
              updated = { ...updated, ...(withImgs as any) };
            } else {
              // fallback: post FormData directly with axios
              const form = new FormData();
              if (images[0]) form.append('imagen', images[0] as File);
              if (images[1]) form.append('imagen2', images[1] as File);
              if (images[2]) form.append('imagen3', images[2] as File);
              if (images[3]) form.append('imagen4', images[3] as File);
              const resp = await axios.post(`http://localhost:8080/api/productos/${updated.id}/imagenes`, form);
              console.log('[ProductosAdmin] axios uploadImages result', resp.status, resp.data);
              updated = { ...updated, ...(resp.data as any) };
            }
          } catch (e) {
            console.error('Error subiendo imágenes:', e);
          }
        }
        const nuevosProductos = productos.map(p => (String(p.id) === String(updated.id) ? {
          id: String(updated.id),
          nombre: updated.nombre,
          categoria: (['frutas','verduras','organicos','lacteos'].includes(updated.categoria) ? updated.categoria : 'verduras') as Producto['categoria'],
          precio: Number(updated.precio) || 0,
          stock: Number(updated.stock) || 0,
          descripcion: updated.descripcion,
          activo: updated.activo == null ? true : !!updated.activo,
          imagen: updated.imagen || null,
          imagen2: updated.imagen2 || null,
          imagen3: updated.imagen3 || null,
          imagen4: updated.imagen4 || null,
        } : p));
        setProductosState(nuevosProductos);
        setNotificacion({ mensaje: 'Producto actualizado exitosamente', tipo: 'success' });
        window.alert('Producto actualizado exitosamente');
      } else {
        // crear en backend: primero crear el producto (JSON), luego subir imágenes si hay archivos
        console.log('[ProductosAdmin] creating product (data only), images pending:', images);
        const created = await productoService.create({
          nombre: formData.nombre,
          categoria: formData.categoria,
          precio: formData.precio,
          stock: formData.stock,
          descripcion: formData.descripcion,
          activo: formData.activo
        });
        console.log('[ProductosAdmin] product created (data):', created);

        // Si existen archivos seleccionados, subir imágenes en una segunda petición
        const hasFiles = images.some(f => f instanceof File && f != null);
        let finalCreated = created as any;
        if (hasFiles) {
          console.log('[ProductosAdmin] uploading images for new product', created.id, images);
          try {
            if (typeof (productoService as any).uploadImages === 'function') {
              const withImgs = await (productoService as any).uploadImages(created.id, images);
              console.log('[ProductosAdmin] uploadImages result:', withImgs);
              finalCreated = { ...finalCreated, ...(withImgs as any) };
            } else {
              const form = new FormData();
              if (images[0]) form.append('imagen', images[0] as File);
              if (images[1]) form.append('imagen2', images[1] as File);
              if (images[2]) form.append('imagen3', images[2] as File);
              if (images[3]) form.append('imagen4', images[3] as File);
              const resp = await axios.post(`http://localhost:8080/api/productos/${created.id}/imagenes`, form);
              console.log('[ProductosAdmin] axios uploadImages result', resp.status, resp.data);
              finalCreated = { ...finalCreated, ...(resp.data as any) };
            }
          } catch (e) {
            console.error('Error subiendo imágenes al crear producto:', e);
          }
        }

        const nuevo: Producto = {
          id: String(finalCreated.id),
          nombre: finalCreated.nombre,
          categoria: (['frutas','verduras','organicos','lacteos'].includes(finalCreated.categoria) ? finalCreated.categoria : 'verduras') as Producto['categoria'],
          precio: Number(finalCreated.precio) || 0,
          stock: Number(finalCreated.stock) || 0,
          descripcion: finalCreated.descripcion,
          activo: finalCreated.activo == null ? true : !!finalCreated.activo,
          imagen: finalCreated.imagen || null,
          imagen2: finalCreated.imagen2 || null,
          imagen3: finalCreated.imagen3 || null,
          imagen4: finalCreated.imagen4 || null,
        };
        setProductosState([...productos, nuevo]);
        setNotificacion({ mensaje: 'Producto agregado exitosamente', tipo: 'success' });
        window.alert('Producto agregado exitosamente');
      }
      handleCancelar();
    } catch (error) {
      setNotificacion({
        mensaje: 'Error al procesar la operación',
        tipo: 'error'
      });
      console.error('Error en handleSubmit productos:', error);
      // if it's an Axios error show response
      try { console.error('error.response', (error as any).response); } catch (e) {}
    } finally {
      setCargando(false);
    }
  };

  const handleImageChange = (index: number, file?: File | null) => {
    const copia = [...images];
    const copiaPreview = [...imagesPreview];
    // revoke previous blob URL if it exists and was created locally
    const prev = copiaPreview[index];
    if (prev && prev.startsWith('blob:')) {
      try { URL.revokeObjectURL(prev); } catch (e) { /* ignore */ }
    }
    copia[index] = file || null;
    if (file) {
      copiaPreview[index] = URL.createObjectURL(file);
    } else {
      copiaPreview[index] = null;
    }
    setImages(copia);
    setImagesPreview(copiaPreview);
  };

  const handleCancelar = () => {
    setFormData(initialFormData);
    setMostrarFormulario(false);
    setEditando(false);
    setErrores({});
    // revoke any created blob URLs
    imagesPreview.forEach(url => { if (url && url.startsWith('blob:')) { try { URL.revokeObjectURL(url); } catch(e){} } });
    setImages([null, null, null, null]);
    setImagesPreview([null, null, null, null]);
  };

  const handleEditar = (producto: Producto) => {
    setFormData({ ...producto, descripcion: producto.descripcion || '' });
    // show existing images as previews (they are URLs returned from backend)
    setImagesPreview([
      producto.imagen || null,
      producto.imagen2 || null,
      producto.imagen3 || null,
      producto.imagen4 || null,
    ]);
    // reset local File selection
    setImages([null, null, null, null]);
    setMostrarFormulario(true);
    setEditando(true);
  };

  const handleEliminar = async (producto: Producto) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;
    setCargando(true);
    try {
      await productoService.remove(producto.id);
      const nuevosProductos = productos.filter(p => String(p.id) !== String(producto.id));
      setProductosState(nuevosProductos);
      setNotificacion({ mensaje: 'Producto eliminado exitosamente', tipo: 'success' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setNotificacion({ mensaje: 'Error al eliminar el producto', tipo: 'error' });
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
                  <option value="" disabled hidden>Selecciona una categoría</option>
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

              <div className="mb-3">
                <label className="form-label">Imágenes (opcional)</label>
                <div className="d-flex gap-3 flex-wrap">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="d-flex flex-column align-items-start" style={{minWidth: 160}}>
                      <label className="form-label">Imagen {i + 1}</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(i, e.target.files?.[0] || null)}
                        className="form-control mb-2"
                      />
                      {imagesPreview[i] ? (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <img src={imagesPreview[i] || ''} alt={`preview-${i}`} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }} />
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleImageChange(i, null)}>Eliminar</button>
                        </div>
                      ) : (
                        <div style={{ width: 100, height: 80, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                          Sin imagen
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={cargando}
                  onClick={() => console.log('[ProductosAdmin] submit button clicked')}
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
              { key: 'categoria', header: 'Categoría', render: (r) => (r.categoria ? r.categoria.charAt(0).toUpperCase() + r.categoria.slice(1) : '') },
              { key: 'precio', header: 'Precio', render: (r) => formatearPrecio(r.precio) },
              { key: 'stock', header: 'Stock', render: (r) => {
                  const s = Number(r.stock || 0);
                  const low = !isNaN(s) && s <= 5;
                  return (
                    <span className={low ? 'text-danger fw-bold' : ''}>
                      {s}
                    </span>
                  );
                }
              },
              { 
                key: 'activo', 
                header: 'Estado', 
                render: (r) => (
                  <span
                      className={`badge admin-badge ${r.activo ? 'admin-badge--success' : 'admin-badge--danger'}`}
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
