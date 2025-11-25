import type { Producto } from '../types/producto';
import type { Usuario } from '../types/usuario';
import type { Venta } from '../types/venta';
import { MOCK_PRODUCTOS, MOCK_USUARIOS, MOCK_VENTAS } from './mock';

const STORAGE_KEYS = {
  PRODUCTOS: 'huerto_productos',
  USUARIOS: 'huerto_usuarios',
  VENTAS: 'huerto_ventas'
} as const;

// Función genérica para obtener datos del localStorage
function getStorageItem<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(stored);
}

// Función genérica para guardar datos en el localStorage
function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Productos
export function getProductos(): Producto[] {
  return getStorageItem(STORAGE_KEYS.PRODUCTOS, MOCK_PRODUCTOS);
}

export function setProductos(productos: Producto[]): void {
  setStorageItem(STORAGE_KEYS.PRODUCTOS, productos);
}

// Usuarios
export function getUsuarios(): Usuario[] {
  return getStorageItem(STORAGE_KEYS.USUARIOS, MOCK_USUARIOS);
}

export function setUsuarios(usuarios: Usuario[]): void {
  setStorageItem(STORAGE_KEYS.USUARIOS, usuarios);
}

// Ventas
export function getVentas(): Venta[] {
  return getStorageItem(STORAGE_KEYS.VENTAS, MOCK_VENTAS);
}

export function setVentas(ventas: Venta[]): void {
  setStorageItem(STORAGE_KEYS.VENTAS, ventas);
}

// Función para inicializar los datos si el localStorage está vacío
export function initializeStorageData(): void {
  getProductos();
  getUsuarios();
  getVentas();
}