// src/huerto-admin/types/producto.ts
export interface Producto {
  id: string;
  nombre: string;
  categoria: 'frutas' | 'verduras' | 'organicos' | 'lacteos';
  precio: number;
  stock: number;
  descripcion?: string;
  activo: boolean;
}
