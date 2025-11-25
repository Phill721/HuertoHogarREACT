// src/huerto-admin/pages/UsuariosAdmin.tsx
import { useState, useEffect } from 'react';
import { Tabla } from '../components/Tabla';
import { Toast } from '../components/Toast';
import { Loader } from '../components/Loader';
import type { Usuario } from '../types/usuario';
import { getUsuarios, setUsuarios } from '../data/storage';
import usuarioService from '../services/usuarioService';

interface FormData {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  rol: 'admin' | 'user';
  activo: boolean;
}

const initialFormData: FormData = {
  id: '',
  nombre: '',
  email: '',
  password: '',
  passwordConfirm: '',
  rol: 'user',
  activo: true
};

interface FormErrors {
  nombre?: string;
  email?: string;
  password?: string;
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
    const load = async () => {
      setCargando(true);
      try {
        const list = await usuarioService.getAll();
        // mapear id numérico a string para la UI
        const mapped: Usuario[] = list.map((u: any) => ({
          id: String(u.id),
          nombre: u.nombre || u.email || '',
          email: u.email || '',
          rol: (u.rol as 'admin' | 'user') || 'user',
          activo: u.activo == null ? true : !!u.activo,
        }));
        setUsuariosState(mapped);
        // actualizar localStorage como cache
        setUsuarios(mapped);
      } catch (err) {
        console.warn('No se pudo cargar usuarios desde API, usando localStorage', err);
        setUsuariosState(getUsuarios());
      } finally {
        setCargando(false);
      }
    };
    load();
  }, []);

  // Actualizar localStorage cuando cambian los usuarios
  useEffect(() => {
    // siempre mantener cache local
    setUsuarios(usuarios);
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

    // Validación de contraseña: si estamos creando (no editando) requiere contraseña;
    // si estamos editando, la contraseña es opcional, pero si se ingresa debe coincidir con la confirmación
    if (!editando) {
      if (!formData.password || formData.password.length < 6) {
        nuevosErrores.password = 'La contraseña es requerida (mínimo 6 caracteres)';
      } else if (formData.password !== formData.passwordConfirm) {
        nuevosErrores.password = 'Las contraseñas no coinciden';
      }
    } else {
      if (formData.password && formData.password.length > 0) {
        if (formData.password.length < 6) {
          nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
        } else if (formData.password !== formData.passwordConfirm) {
          nuevosErrores.password = 'Las contraseñas no coinciden';
        }
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
      // construir payload para backend
      const payload: any = {
        nombre: formData.nombre,
        email: formData.email,
        rol: formData.rol,
        activo: formData.activo,
      };
      if (formData.password && formData.password.length > 0) payload.password = formData.password;

      if (editando) {
        // id en UI es string; backend espera número
        const idNum = Number(formData.id);
        const updated = await usuarioService.update(idNum, payload);
        // actualizar estado localmente
        const nuevosUsuarios = usuarios.map(u => u.id === String(updated.id) ? { ...u, nombre: updated.nombre || u.nombre, email: updated.email || u.email, rol: (updated.rol as any) || u.rol, activo: updated.activo == null ? u.activo : !!updated.activo } : u);
        setUsuariosState(nuevosUsuarios);
        setNotificacion({ mensaje: 'Usuario actualizado exitosamente', tipo: 'success' });
        window.alert('Usuario actualizado exitosamente');
      } else {
        const created = await usuarioService.create(payload);
        const nuevoUsuario: Usuario = {
          id: String(created.id),
          nombre: created.nombre || created.email || formData.nombre,
          email: created.email || formData.email,
          rol: (created.rol as any) || formData.rol,
          activo: created.activo == null ? true : !!created.activo,
        };
        const nuevosUsuarios = [...usuarios, nuevoUsuario];
        setUsuariosState(nuevosUsuarios);
        setNotificacion({ mensaje: 'Usuario agregado exitosamente', tipo: 'success' });
        window.alert('Usuario agregado exitosamente');
      }
      handleCancelar();
    } catch (error: any) {
      console.error('Error creando/actualizando usuario:', error);
      setNotificacion({ mensaje: error?.message || 'Error al procesar la operación', tipo: 'error' });
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
    setFormData({ ...usuario, password: '', passwordConfirm: '' });
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
      // intentar eliminar en backend
      const idNum = Number(usuario.id);
      await usuarioService.remove(idNum);
      const nuevosUsuarios = usuarios.filter(u => u.id !== usuario.id);
      setUsuariosState(nuevosUsuarios);
      setNotificacion({ mensaje: 'Usuario eliminado exitosamente', tipo: 'success' });
      window.alert('Usuario eliminado exitosamente');
    } catch (err) {
      console.warn('Error eliminando desde API, aplicando fallback a localStorage', err);
      try {
        const nuevosUsuarios = usuarios.filter(u => u.id !== usuario.id);
        setUsuariosState(nuevosUsuarios);
        setUsuarios(nuevosUsuarios);
        setNotificacion({ mensaje: 'Usuario eliminado (fallback)', tipo: 'success' });
        window.alert('Usuario eliminado exitosamente (modo offline)');
      } catch (e) {
        setNotificacion({ mensaje: 'Error al eliminar el usuario', tipo: 'error' });
      }
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
                <label htmlFor="password" className="form-label">Contraseña {editando ? '(opcional)' : '*'}</label>
                <input
                  type="password"
                  className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  {...(!editando ? { required: true } : {})}
                />
                {errores.password && <div className="invalid-feedback">{errores.password}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">Confirma contraseña {editando ? '(si cambias)' : '*'}</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                  {...(!editando ? { required: true } : {})}
                />
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
                    className={`badge admin-badge ${r.rol === 'admin' ? 'admin-badge--primary' : 'admin-badge--primary'}`}
                    data-tooltip={r.rol === 'admin' ? 'Usuario con privilegios administrativos' : 'Usuario regular'}
                    style={{padding: '0.35rem 0.7rem'}}
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
                    className={`badge admin-badge ${r.activo ? 'admin-badge--success' : 'admin-badge--danger'}`}
                    data-tooltip={r.activo ? 'Usuario activo en el sistema' : 'Usuario desactivado'}
                    style={{padding: '0.35rem 0.7rem'}}
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
