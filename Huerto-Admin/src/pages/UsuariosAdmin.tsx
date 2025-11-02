// src/huerto-admin/pages/UsuariosAdmin.tsx
import { useState } from 'react';
import { Tabla } from '../components/Tabla';  // Componente de tabla reutilizable
import type { Usuario } from '../types/usuario';  // Tipo de Usuario
import { MOCK_USUARIOS } from '../data/mock';  // Datos mock

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(MOCK_USUARIOS);  // Usamos el mock de usuarios
  
  return (
    <div>
      <h2>Usuarios Admin</h2>
      <Tabla<Usuario>
        data={usuarios}
        cols={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'email', header: 'Email' },
          { key: 'rol', header: 'Rol' },
          { key: 'activo', header: 'Activo', render: (r) => (r.activo ? 'Sí' : 'No') },
        ]}
        onDelete={(r) => setUsuarios((xs) => xs.filter((x) => x.id !== r.id))}
      />
      {/* Aquí puedes agregar un botón para agregar usuarios */}
    </div>
  );
}
