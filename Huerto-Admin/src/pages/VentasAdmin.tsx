// src/huerto-admin/pages/VentasAdmin.tsx
import { useState } from 'react';
import { Tabla } from '../components/Tabla';  // Componente de tabla reutilizable
import type { Venta } from '../types/venta';  // Tipo de Venta
import { MOCK_VENTAS } from '../data/mock';  // Datos mock

export default function VentasAdmin() {
  const [ventas] = useState<Venta[]>(MOCK_VENTAS);  // Usamos el mock de ventas
  
  return (
    <div>
      <h2>Ventas Admin</h2>
      <Tabla<Venta>
        data={ventas}
        cols={[
          { key: 'fecha', header: 'Fecha' },
          { key: 'total', header: 'Total', render: (r) => `$${r.total.toFixed(2)}` },
        ]}
      />
      {/* Aquí puedes agregar un botón para ver detalles de ventas */}
    </div>
  );
}
