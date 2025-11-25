// src/huerto-admin/types/venta.ts
export interface DetalleVenta {
  productoId: string;
  cantidad: number;
  subtotal: number;
  nombre: string;
}

export interface Venta {
  id: string;
  fecha: string;  // Formato ISO, ejemplo: '2025-10-20'
  total: number;
  detalles: DetalleVenta[];
}
