// src/huerto-admin/pages/UsuariosAdmin.tsx
import { useState, useEffect } from 'react';
import { Tabla } from '../components/Tabla';
import { Toast } from '../components/Toast';
import { Loader } from '../components/Loader';
import type { Usuario } from '../types/usuario';
import { getUsuarios, setUsuarios } from '../data/storage';

interface FormData {
  id: string;
  nombre: string;
  email: string;
  rol: 'admin' | 'user';
  activo: boolean;
}

const initialFormData: FormData = {
  id: '',
  nombre: '',
  email: '',
  rol: 'user',
  activo: true
};

interface FormErrors {
  nombre?: string;
  email?: string;
}

export default function UsuariosAdmin() {
  const [usuarios, setUsuariosState] = useState<Usuario[]>([]);
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
    setUsuariosState(getUsuarios());
  }, []);

  // Actualizar localStorage cuando cambian los usuarios
  useEffect(() => {
    if (usuarios.length > 0) {
      setUsuarios(usuarios);
    }
  }, [usuarios]);

  const validarFormulario = (): boolean => {
    const nuevosErrores: FormErrors = {};
    
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else {
      const dominiosPermitidos = ['@gmail.com', '@duocuc.cl', '@profesor.duoc.cl'];
      const emailValido = dominiosPermitidos.some(dominio => formData.email.toLowerCase().endsWith(dominio));
      
      if (!emailValido) {
        nuevosErrores.email = 'El email debe terminar en @gmail.com, @duocuc.cl o @profesor.duoc.cl';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        nuevosErrores.email = 'El formato del email no es válido';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    // Confirmar antes de agregar o actualizar
    if (editando) {
      const confirmar = window.confirm('¿Confirma que desea actualizar este usuario?');
      if (!confirmar) return;
    } else {
      const confirmar = window.confirm('¿Confirma que desea agregar este nuevo usuario?');
      if (!confirmar) return;
    }

    setCargando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulación de latencia

      if (editando) {
        const nuevosUsuarios = usuarios.map(u => 
          u.id === formData.id ? { ...formData } : u
        );
        setUsuariosState(nuevosUsuarios);
        setUsuarios(nuevosUsuarios);
        setNotificacion({
          mensaje: 'Usuario actualizado exitosamente',
          tipo: 'success'
        });
        // Mostrar alerta adicional para confirmación visible
        window.alert('Usuario actualizado exitosamente');
      } else {
        const nuevoUsuario = { 
          ...formData, 
          id: Date.now().toString() 
        };
        const nuevosUsuarios = [...usuarios, nuevoUsuario];
        setUsuariosState(nuevosUsuarios);
        setUsuarios(nuevosUsuarios);
        setNotificacion({
          mensaje: 'Usuario agregado exitosamente',
          tipo: 'success'
        });
        // Mostrar alerta adicional para confirmación visible
        window.alert('Usuario agregado exitosamente');
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

  const handleEditar = (usuario: Usuario) => {
    setFormData(usuario);
    setMostrarFormulario(true);
    setEditando(true);
  };

  const handleEliminar = async (usuario: Usuario) => {
    if (usuario.rol === 'admin') {
      setNotificacion({
        mensaje: 'No se puede eliminar un usuario administrador',
        tipo: 'error'
      });
      return;
    }

    if (!window.confirm('¿Está seguro de eliminar este usuario?')) return;

    setCargando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulación de latencia
      
      const nuevosUsuarios = usuarios.filter(u => u.id !== usuario.id);
      setUsuariosState(nuevosUsuarios);
      setUsuarios(nuevosUsuarios);
      setNotificacion({
        mensaje: 'Usuario eliminado exitosamente',
        tipo: 'success'
      });
      // Mostrar alerta adicional para confirmación visible
      window.alert('Usuario eliminado exitosamente');
    } catch (error) {
      setNotificacion({
        mensaje: 'Error al eliminar el usuario',
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={`container-fluid px-4 ${cargando ? 'loading' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Gestión de Usuarios</h2>
        <button 
          className="btn btn-success"
          onClick={() => setMostrarFormulario(true)}
          data-tooltip="Agregar un nuevo usuario al sistema"
        >
          <i className="fas fa-plus me-2"></i>Agregar Usuario
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title mb-4">{editando ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input
                  type="text"
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                {errores.email && <div className="invalid-feedback">{errores.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="rol" className="form-label">Rol *</label>
                <select
                  className="form-select"
                  id="rol"
                  value={formData.rol}
                  onChange={(e) => setFormData({...formData, rol: e.target.value as 'admin' | 'user'})}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
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
                    Usuario Activo
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
                      {editando ? 'Guardar Cambios' : 'Agregar Usuario'}
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
          <h3 className="card-title mb-4">Lista de Usuarios</h3>
          <Tabla<Usuario>
            data={usuarios}
            cols={[
              { key: 'nombre', header: 'Nombre' },
              { key: 'email', header: 'Email' },
              { 
                key: 'rol', 
                header: 'Rol',
                render: (r) => (
                  <span 
                    className={`badge ${r.rol === 'admin' ? 'badge-success' : 'badge-primary'}`}
                    data-tooltip={r.rol === 'admin' ? 'Usuario con privilegios administrativos' : 'Usuario regular'}
                  >
                    {r.rol === 'admin' ? 'Administrador' : 'Usuario'}
                  </span>
                )
              },
              { 
                key: 'activo', 
                header: 'Estado',
                render: (r) => (
                  <span 
                    className={`badge ${r.activo ? 'badge-success' : 'badge-danger'}`}
                    data-tooltip={r.activo ? 'Usuario activo en el sistema' : 'Usuario desactivado'}
                  >
                    {r.activo ? 'Activo' : 'Inactivo'}
                  </span>
                )
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
