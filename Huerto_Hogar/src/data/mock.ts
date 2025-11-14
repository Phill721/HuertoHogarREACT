// src/huerto-admin/data/mock.ts
import type { Producto } from '../types/producto';
import type { Usuario } from '../types/usuario';
import type { Venta } from '../types/venta';

export const MOCK_PRODUCTOS: Producto[] = [
  { 
    id: 'p1', 
    nombre: 'Lechuga Hidropónica', 
    categoria: 'verduras',
    precio: 990, 
    stock: 30, 
    activo: true,
    descripcion: 'Lechuga fresca cultivada en sistema hidropónico'
  },
  { 
    id: 'p2', 
    nombre: 'Tomate Orgánico', 
    categoria: 'verduras',
    precio: 1290, 
    stock: 25, 
    activo: true,
    descripcion: 'Tomates orgánicos cultivados sin pesticidas'
  },
  { 
    id: 'p3', 
    nombre: 'Manzana Fuji', 
    categoria: 'frutas',
    precio: 2490, 
    stock: 40, 
    activo: true,
    descripcion: 'Manzanas Fuji dulces y crujientes'
  },
  { 
    id: 'p4', 
    nombre: 'Plátano Orgánico', 
    categoria: 'frutas',
    precio: 1590, 
    stock: 35, 
    activo: true,
    descripcion: 'Plátanos orgánicos cultivados naturalmente'
  },
  { 
    id: 'p5', 
    nombre: 'Yogurt Natural', 
    categoria: 'lacteos',
    precio: 1990, 
    stock: 20, 
    activo: true,
    descripcion: 'Yogurt natural sin azúcar añadida'
  },
  { 
    id: 'p6', 
    nombre: 'Abono Orgánico', 
    categoria: 'organicos',
    precio: 5990, 
    stock: 15, 
    activo: true,
    descripcion: 'Abono 100% orgánico para tus plantas'
  }
];

export const MOCK_USUARIOS: Usuario[] = [
  { 
    id: 'u1', 
    nombre: 'Administrador', 
    email: 'admin@profesor.duoc.cl', 
    rol: 'admin', 
    activo: true 
  },
  { 
    id: 'u2', 
    nombre: 'Juan Pérez', 
    email: 'juan.perez@duocuc.cl', 
    rol: 'user', 
    activo: true 
  },
  { 
    id: 'u3', 
    nombre: 'María López', 
    email: 'maria.lopez@gmail.com', 
    rol: 'user', 
    activo: true 
  }
];

export const MOCK_VENTAS: Venta[] = [
  { 
    id: 'v1', 
    fecha: '2025-10-20', 
    total: 13430,
    detalles: [
      { productoId: 'p1', cantidad: 2, subtotal: 1980, nombre: 'Lechuga Hidropónica' },
      { productoId: 'p3', cantidad: 3, subtotal: 7470, nombre: 'Manzana Fuji' },
      { productoId: 'p5', cantidad: 2, subtotal: 3980, nombre: 'Yogurt Natural' }
    ]
  },
  { 
    id: 'v2', 
    fecha: '2025-10-21', 
    total: 8340,
    detalles: [
      { productoId: 'p2', cantidad: 4, subtotal: 5160, nombre: 'Tomate Orgánico' },
      { productoId: 'p4', cantidad: 2, subtotal: 3180, nombre: 'Plátano Orgánico' }
    ]
  },
  { 
    id: 'v3', 
    fecha: '2025-10-22', 
    total: 15940,
    detalles: [
      { productoId: 'p6', cantidad: 2, subtotal: 11980, nombre: 'Abono Orgánico' },
      { productoId: 'p1', cantidad: 4, subtotal: 3960, nombre: 'Lechuga Hidropónica' }
    ]
  },
  { 
    id: 'v4', 
    fecha: '2025-10-23', 
    total: 8960,
    detalles: [
      { productoId: 'p3', cantidad: 2, subtotal: 4980, nombre: 'Manzana Fuji' },
      { productoId: 'p5', cantidad: 2, subtotal: 3980, nombre: 'Yogurt Natural' }
    ]
  }
];
