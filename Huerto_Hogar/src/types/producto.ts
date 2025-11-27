// src/huerto-admin/types/producto.ts
export interface Producto {
  id: string;
  nombre: string;
  categoria: 'frutas' | 'verduras' | 'organicos' | 'lacteos';
  precio: number;
  stock: number;
  descripcion?: string;
  activo: boolean;
  imagen?: string | null;
  imagen2?: string | null;
  imagen3?: string | null;
  imagen4?: string | null;
}
