// src/huerto-admin/data/mock.ts
import type { Producto } from '../types/producto';  // Ruta correcta
import type { Usuario } from '../types/usuario';
import type { Venta } from '../types/venta';

export const MOCK_PRODUCTOS: Producto[] = [
  { id: 'p1', nombre: 'Lechuga', precio: 990, stock: 30, activo: true },
  { id: 'p2', nombre: 'Tomate', precio: 1290, stock: 12, activo: true },
];

export const MOCK_USUARIOS: Usuario[] = [
  { id: 'u1', nombre: 'Admin', email: 'admin@site.com', rol: 'admin', activo: true },
  { id: 'u2', nombre: 'Cliente', email: 'user@site.com', rol: 'user', activo: true },
];

export const MOCK_VENTAS: Venta[] = [
  { id: 'v1', fecha: '2025-10-20', total: 12990 },
];
