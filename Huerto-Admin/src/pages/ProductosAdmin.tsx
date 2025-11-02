// src/huerto-admin/pages/ProductosAdmin.tsx
import { useState } from 'react';
import { Tabla } from '../components/Tabla';  // Componente de tabla reutilizable
import type { Producto } from '../types/producto';  // Tipo de Producto
import { MOCK_PRODUCTOS } from '../data/mock';

export default function ProductosAdmin() {
  const [productos, setProductos] = useState<Producto[]>(MOCK_PRODUCTOS);  // Usamos el mock de productos
  
  return (
    <div>
      <h2>Productos Admin</h2>
      <Tabla<Producto>
        data={productos}
        cols={[
          { key: 'nombre', header: 'Nombre' },
          { key: 'precio', header: 'Precio', render: (r) => `$${r.precio.toFixed(2)}` },
          { key: 'stock', header: 'Stock' },
          { key: 'activo', header: 'Activo', render: (r) => (r.activo ? 'Sí' : 'No') },
        ]}
        onDelete={(r) => setProductos((xs) => xs.filter((x) => x.id !== r.id))}
      />
      {/* Aquí puedes agregar un botón para agregar productos */}
    </div>
  );
}
